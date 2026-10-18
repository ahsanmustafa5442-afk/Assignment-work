import { SiteData } from '../types.ts';
import { DEFAULT_SITE_DATA } from '../data/defaultData.ts';

const TOKEN_KEY = 'km_admin_auth_token';
const ADMIN_EMAIL_KEY = 'km_admin_email';

export function getStoredAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredAdminToken(token: string, email: string, persist = true) {
  try {
    if (persist) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(ADMIN_EMAIL_KEY, email);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(ADMIN_EMAIL_KEY, email);
    }
  } catch (e) {
    console.error('Storage error', e);
  }
}

export function clearStoredAdminToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_EMAIL_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_EMAIL_KEY);
  } catch (e) {
    console.error('Storage error', e);
  }
}

// Fetch public website content
export async function fetchPublicContent(): Promise<SiteData> {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) {
      throw new Error(`Failed to load content (${res.status})`);
    }
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return DEFAULT_SITE_DATA;
  } catch (err) {
    console.warn('API content fetch failed, using fallback defaults:', err);
    return DEFAULT_SITE_DATA;
  }
}

// Verify current session
export async function verifyAdminSession(): Promise<boolean> {
  const token = getStoredAdminToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/admin/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) return false;
    const json = await res.json();
    return !!json.authenticated;
  } catch {
    return false;
  }
}

// Admin login
export async function adminLogin(password: string, email = 'KashafMustafa130@gmail.com'): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      return { success: false, error: json.error || 'Login failed. Please verify credentials.' };
    }
    setStoredAdminToken(json.token, json.email || email, true);
    return { success: true, token: json.token };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error while attempting login' };
  }
}

// Admin logout
export async function adminLogout(): Promise<void> {
  const token = getStoredAdminToken();
  if (token) {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (e) {
      console.warn('Logout notification failed', e);
    }
  }
  clearStoredAdminToken();
}

// Admin fetch full content (including drafts)
export async function fetchAdminContent(): Promise<SiteData> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch('/api/admin/content', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    if (res.status === 401) {
      clearStoredAdminToken();
      throw new Error('Your session has expired. Please log in again.');
    }
    throw new Error(`Failed to fetch admin content (${res.status})`);
  }

  const json = await res.json();
  return json.data;
}

// Admin save content
export async function saveAdminContent(data: SiteData): Promise<SiteData> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch('/api/admin/content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ data })
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    if (res.status === 401) {
      clearStoredAdminToken();
      throw new Error('Your session has expired. Please log in again.');
    }
    throw new Error(json.error || 'Failed to save website content');
  }

  return json.data;
}

// Admin upload image
export async function uploadImage(dataUrl: string, filename?: string): Promise<string> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ dataUrl, filename })
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Failed to upload image');
  }

  return json.url;
}

// Admin change password
export async function changeAdminPassword(currentPassword: string, newPassword: string): Promise<void> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch('/api/admin/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Failed to change password');
  }
}

// Restore from backup
export async function restoreBackup(backupData: any): Promise<SiteData> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch('/api/admin/restore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ backupData })
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Failed to restore backup');
  }

  return json.data;
}
