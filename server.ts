import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { DEFAULT_SITE_DATA } from './src/data/defaultData.ts';
import { SiteData } from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Data paths
const DATA_DIR = path.resolve(__dirname, 'data');
const BACKUPS_DIR = path.resolve(DATA_DIR, 'backups');
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');
const SITE_DATA_FILE = path.resolve(DATA_DIR, 'site-data.json');
const ADMIN_AUTH_FILE = path.resolve(DATA_DIR, 'admin-auth.json');

// Ensure directories exist
for (const dir of [DATA_DIR, BACKUPS_DIR, UPLOADS_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// Password & Token Utilities (Native Node.js crypto, zero-dependency & secure)
// ---------------------------------------------------------------------------
function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const chosenSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, chosenSalt, 64);
  return { hash: derivedKey.toString('hex'), salt: chosenSalt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(derivedKey.toString('hex'), 'hex');
    const hashBuffer = Buffer.from(hash, 'hex');
    return crypto.timingSafeEqual(keyBuffer, hashBuffer);
  } catch {
    return false;
  }
}

interface AuthStorage {
  adminEmail: string;
  passwordHash: string;
  salt: string;
  sessions: { [token: string]: { createdAt: string; expiresAt: string } };
}

const DEFAULT_ADMIN_EMAIL = 'KashafMustafa130@gmail.com';
const INITIAL_DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'KashafMustafa@2025';

function initializeAuth(): AuthStorage {
  if (fs.existsSync(ADMIN_AUTH_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(ADMIN_AUTH_FILE, 'utf-8'));
    } catch (e) {
      console.error('Failed to read admin-auth.json, reinitializing', e);
    }
  }

  const { hash, salt } = hashPassword(INITIAL_DEFAULT_PASSWORD);
  const authData: AuthStorage = {
    adminEmail: DEFAULT_ADMIN_EMAIL,
    passwordHash: hash,
    salt: salt,
    sessions: {},
  };
  fs.writeFileSync(ADMIN_AUTH_FILE, JSON.stringify(authData, null, 2), 'utf-8');
  return authData;
}

let authStore: AuthStorage = initializeAuth();

function saveAuthStore() {
  fs.writeFileSync(ADMIN_AUTH_FILE, JSON.stringify(authStore, null, 2), 'utf-8');
}

// ---------------------------------------------------------------------------
// Site Data Storage with Atomic Writes and Backup Retention
// ---------------------------------------------------------------------------
function initializeSiteData(): SiteData {
  if (fs.existsSync(SITE_DATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(SITE_DATA_FILE, 'utf-8'));
    } catch (e) {
      console.error('Failed to parse site-data.json, falling back to default', e);
    }
  }
  fs.writeFileSync(SITE_DATA_FILE, JSON.stringify(DEFAULT_SITE_DATA, null, 2), 'utf-8');
  return DEFAULT_SITE_DATA;
}

let siteData: SiteData = initializeSiteData();

function saveSiteData(newData: SiteData) {
  siteData = { ...newData, lastUpdated: new Date().toISOString() };
  const tempPath = `${SITE_DATA_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, JSON.stringify(siteData, null, 2), 'utf-8');
  fs.renameSync(tempPath, SITE_DATA_FILE);

  // Keep an automatic timestamped backup (max 10 recent backups)
  try {
    const backupFile = path.resolve(BACKUPS_DIR, `backup-${Date.now()}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(siteData, null, 2), 'utf-8');
    const existing = fs.readdirSync(BACKUPS_DIR).filter(f => f.startsWith('backup-') && f.endsWith('.json')).sort();
    if (existing.length > 10) {
      for (const oldFile of existing.slice(0, existing.length - 10)) {
        fs.unlinkSync(path.resolve(BACKUPS_DIR, oldFile));
      }
    }
  } catch (err) {
    console.error('Failed to write backup snapshot:', err);
  }
}

// ---------------------------------------------------------------------------
// Middleware: Authentication Guard for Owner Admin Routes
// ---------------------------------------------------------------------------
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token' });
    return;
  }
  const token = authHeader.substring(7).trim();
  const session = authStore.sessions[token];
  if (!session) {
    res.status(401).json({ error: 'Unauthorized: Session not found or expired' });
    return;
  }
  if (new Date(session.expiresAt) < new Date()) {
    delete authStore.sessions[token];
    saveAuthStore();
    res.status(401).json({ error: 'Unauthorized: Session has expired. Please log in again.' });
    return;
  }
  next();
}

// Enable large JSON payload support for high-res image uploads from mobile
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads directory
app.use('/uploads', express.static(UPLOADS_DIR));

// ---------------------------------------------------------------------------
// Public Content API (Returns only published items, safe for visitors)
// ---------------------------------------------------------------------------
app.get('/api/content', (_req: Request, res: Response) => {
  const publicData: SiteData = {
    contact: siteData.contact,
    hero: siteData.hero,
    about: siteData.about,
    services: siteData.services.filter(s => s.published),
    gallery: siteData.gallery.filter(g => g.published),
    projects: siteData.projects.filter(p => p.published),
    pricing: siteData.pricing.filter(pr => pr.published),
    processSteps: siteData.processSteps,
    faqs: siteData.faqs.filter(f => f.published),
    lastUpdated: siteData.lastUpdated,
  };
  res.json({ success: true, data: publicData });
});

// Check auth status
app.get('/api/admin/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.json({ authenticated: false });
    return;
  }
  const token = authHeader.substring(7).trim();
  const session = authStore.sessions[token];
  if (!session || new Date(session.expiresAt) < new Date()) {
    res.json({ authenticated: false });
    return;
  }
  res.json({ authenticated: true, email: authStore.adminEmail });
});

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const normalizedInputEmail = String(email).trim().toLowerCase();
  const normalizedStoredEmail = authStore.adminEmail.trim().toLowerCase();

  if (normalizedInputEmail !== normalizedStoredEmail) {
    res.status(401).json({ error: 'Invalid administrator credentials' });
    return;
  }

  const isValid = verifyPassword(String(password), authStore.passwordHash, authStore.salt);
  if (!isValid) {
    res.status(401).json({ error: 'Invalid administrator credentials' });
    return;
  }

  // Generate 7-day session token
  const token = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  authStore.sessions[token] = {
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
  saveAuthStore();

  res.json({
    success: true,
    token,
    expiresAt: expiresAt.toISOString(),
    email: authStore.adminEmail,
  });
});

// Admin Logout
app.post('/api/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    delete authStore.sessions[token];
    saveAuthStore();
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Admin Change Password
app.post('/api/admin/change-password', requireAdminAuth, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Current password and new password are required' });
    return;
  }

  if (String(newPassword).length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long' });
    return;
  }

  const isValid = verifyPassword(String(currentPassword), authStore.passwordHash, authStore.salt);
  if (!isValid) {
    res.status(401).json({ error: 'Current password does not match' });
    return;
  }

  const { hash, salt } = hashPassword(String(newPassword));
  authStore.passwordHash = hash;
  authStore.salt = salt;
  saveAuthStore();

  res.json({ success: true, message: 'Password updated successfully' });
});

// Admin Get Full Content (Including unpublished/drafts)
app.get('/api/admin/content', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ success: true, data: siteData });
});

// Admin Save Full Content
app.put('/api/admin/content', requireAdminAuth, (req: Request, res: Response) => {
  const incomingData = req.body?.data;
  if (!incomingData || typeof incomingData !== 'object') {
    res.status(400).json({ error: 'Invalid site data payload' });
    return;
  }

  try {
    saveSiteData(incomingData as SiteData);
    res.json({ success: true, message: 'Website content saved and published successfully', data: siteData });
  } catch (err: any) {
    console.error('Error saving site data:', err);
    res.status(500).json({ error: 'Failed to persist site data: ' + err.message });
  }
});

// Admin Upload Image (Base64 data URL from phone gallery/camera or file picker)
app.post('/api/admin/upload', requireAdminAuth, (req: Request, res: Response) => {
  const { dataUrl, filename } = req.body || {};
  if (!dataUrl || typeof dataUrl !== 'string') {
    res.status(400).json({ error: 'Missing image data' });
    return;
  }

  // Validate data URL format
  const matches = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (!matches) {
    res.status(400).json({ error: 'Invalid image format. Must be a valid JPEG, PNG, or WebP image.' });
    return;
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  let extension = 'png';
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = 'jpg';
  else if (mimeType.includes('webp')) extension = 'webp';
  else if (mimeType.includes('gif')) extension = 'gif';

  const buffer = Buffer.from(base64Data, 'base64');
  // Maximum 12MB limit per image
  if (buffer.length > 12 * 1024 * 1024) {
    res.status(400).json({ error: 'Image size exceeds maximum limit of 12MB' });
    return;
  }

  const safeName = (filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_') : 'upload');
  const uniqueName = `km-${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${safeName}.${extension}`;
  const filePath = path.resolve(UPLOADS_DIR, uniqueName);

  fs.writeFileSync(filePath, buffer);
  const publicUrl = `/uploads/${uniqueName}`;

  res.json({ success: true, url: publicUrl, filename: uniqueName });
});

// Admin Backup Export
app.get('/api/admin/backup', requireAdminAuth, (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="kashaf-mustafa-backup-${Date.now()}.json"`);
  res.send(JSON.stringify(siteData, null, 2));
});

// Admin Backup Restore
app.post('/api/admin/restore', requireAdminAuth, (req: Request, res: Response) => {
  const incomingData = req.body?.backupData;
  if (!incomingData || !incomingData.contact || !incomingData.services) {
    res.status(400).json({ error: 'Invalid backup format. Missing core portfolio fields.' });
    return;
  }

  try {
    saveSiteData(incomingData as SiteData);
    res.json({ success: true, message: 'Website content restored successfully from backup', data: siteData });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to restore backup: ' + err.message });
  }
});

// ---------------------------------------------------------------------------
// Vite Dev Server or Production Static Serving
// ---------------------------------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Development mode with Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Kashaf Mustafa Academic Writing] Server running at http://0.0.0.0:${PORT}`);
    console.log(`[Admin Account] Email: ${authStore.adminEmail}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
