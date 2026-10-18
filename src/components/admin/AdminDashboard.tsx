import React, { useState } from 'react';
import {
  X,
  Save,
  LogOut,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  DollarSign,
  HelpCircle,
  Shield,
  Download,
  RotateCcw,
  Eye,
  KeyRound,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SiteData, ServiceItem, PortfolioProject, GalleryItem, PricingCard, FaqItem } from '../../types.ts';
import { saveAdminContent, adminLogout, changeAdminPassword, restoreBackup } from '../../utils/api.ts';
import { ImageUploadField } from './ImageUploadField.tsx';

interface AdminDashboardProps {
  data: SiteData;
  onUpdateData: (updated: SiteData) => void;
  onClose: () => void;
  onLogout: () => void;
}

type TabType = 'profile' | 'services' | 'portfolio' | 'gallery' | 'pricing' | 'faqs' | 'contact' | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  onUpdateData,
  onClose,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [formData, setFormData] = useState<SiteData>(JSON.parse(JSON.stringify(data)));
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Security password modal state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Delete confirmation
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string; name: string } | null>(null);

  // Auto-dismiss status message
  const triggerStatus = (type: 'success' | 'error', message: string) => {
    setSaveStatus({ type, message });
    setTimeout(() => setSaveStatus(null), 5000);
  };

  // Save changes to backend
  const handleSaveAndPublish = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const savedData = await saveAdminContent(formData);
      onUpdateData(savedData);
      triggerStatus('success', 'Changes published live! Visible on all devices.');
    } catch (err: any) {
      triggerStatus('error', err.message || 'Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  // Change password handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordStatus(null);
    try {
      await changeAdminPassword(currentPassword, newPassword);
      setPasswordStatus('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password');
    }
  };

  // Backup download handler
  const handleDownloadBackup = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kashaf-mustafa-portfolio-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerStatus('success', 'Backup JSON file exported successfully.');
  };

  // Restore backup handler
  const handleRestoreBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const backupJson = JSON.parse(event.target?.result as string);
        if (!backupJson.contact || !backupJson.services) {
          throw new Error('Invalid portfolio backup file structure.');
        }
        const restored = await restoreBackup(backupJson);
        setFormData(restored);
        onUpdateData(restored);
        triggerStatus('success', 'Website restored successfully from backup JSON!');
      } catch (err: any) {
        triggerStatus('error', err.message || 'Failed to restore backup');
      }
    };
    reader.readAsText(file);
  };

  // Tab Item Helpers
  const addService = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'New Academic Service',
      category: 'Assignment Help',
      description: 'Provide a thorough description of the service assistance offered.',
      deliverables: ['Prompt and rubric analysis', 'Clear structure and syntax review', 'Academic citation alignment'],
      examplePrice: 'Starting from PKR 2,000',
      iconName: 'FileText',
      published: true,
    };
    setFormData({ ...formData, services: [newService, ...formData.services] });
    triggerStatus('success', 'New service added. Remember to click "Save & Publish".');
  };

  const addProject = () => {
    const newProject: PortfolioProject = {
      id: `proj-${Date.now()}`,
      title: 'New Demonstration Assignment Sample',
      category: 'Academic Essay',
      coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80',
      objective: 'Demonstrate analytical reasoning and structured literature synthesis.',
      shortDescription: 'Overview of the demonstration project and core methodology.',
      sampleHeadings: ['1. Introduction & Context', '2. Analytical Framework', '3. Findings & Evidence Synthesis', '4. Recommendations & Conclusion'],
      sampleExcerpt: 'Insert a realistic scholarly excerpt illustrating formal academic register, citations, and critical commentary.',
      formattingHighlights: ['12pt formal academic font standard', 'Verified Harvard or APA citations', 'Annotated appendices'],
      citationStyle: 'Harvard Standard',
      wordCountSample: '2,500 words (Demonstration)',
      published: true,
    };
    setFormData({ ...formData, projects: [newProject, ...formData.projects] });
    triggerStatus('success', 'New demonstration project added. Remember to click "Save & Publish".');
  };

  const addGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: 'Academic Study & Assignment Image',
      category: 'Assignments',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
      description: 'University assignment documentation and study reference materials.',
      published: true,
    };
    setFormData({ ...formData, gallery: [newItem, ...formData.gallery] });
    triggerStatus('success', 'New gallery image added. Remember to click "Save & Publish".');
  };

  const addFaq = () => {
    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      question: 'New Frequently Asked Question',
      answer: 'Provide clear, factual guidance for student inquiries.',
      published: true,
    };
    setFormData({ ...formData, faqs: [...formData.faqs, newFaq] });
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;

    if (type === 'service') {
      setFormData({ ...formData, services: formData.services.filter(s => s.id !== id) });
    } else if (type === 'project') {
      setFormData({ ...formData, projects: formData.projects.filter(p => p.id !== id) });
    } else if (type === 'gallery') {
      setFormData({ ...formData, gallery: formData.gallery.filter(g => g.id !== id) });
    } else if (type === 'faq') {
      setFormData({ ...formData, faqs: formData.faqs.filter(f => f.id !== id) });
    }

    setItemToDelete(null);
    triggerStatus('success', 'Item removed. Click "Save & Publish" to sync changes.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col overflow-hidden text-slate-100">
      
      {/* Top Navigation & Status Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 font-serif font-bold">
            KM
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-serif font-bold text-white flex items-center gap-2">
              <span>Owner Admin Panel</span>
              <span className="hidden sm:inline-block text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                Kashaf Mustafa
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Edit services, samples, cat profile picture, rates, and publish live
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Save & Publish Button */}
          <button
            onClick={handleSaveAndPublish}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing...' : 'Save & Publish'}</span>
          </button>

          {/* Close dashboard view */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Preview Public Website"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Secure Logout */}
          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition-colors"
            title="Secure Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Status Notification Toast */}
      {saveStatus && (
        <div className={`px-4 py-2.5 text-xs font-semibold flex items-center justify-between ${
          saveStatus.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}>
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            {saveStatus.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{saveStatus.message}</span>
          </div>
          <button onClick={() => setSaveStatus(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Workspace Body with Horizontal / Side Tabs */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Navigation Tabs (Scrollable on Android phones) */}
        <aside className="w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-2 sm:p-4 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col gap-1.5 scrollbar-none">
          {[
            { id: 'profile', label: 'Hero & Profile', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'services', label: `Services (${formData.services.length})`, icon: <FileText className="w-4 h-4" /> },
            { id: 'portfolio', label: `Portfolio (${formData.projects.length})`, icon: <CheckCircle className="w-4 h-4" /> },
            { id: 'gallery', label: `Gallery (${formData.gallery.length})`, icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'pricing', label: 'Pricing (PKR)', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'faqs', label: `FAQs (${formData.faqs.length})`, icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'contact', label: 'WhatsApp & Contact', icon: <Shield className="w-4 h-4" /> },
            { id: 'security', label: 'Security & Backup', icon: <KeyRound className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors text-left ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Tab Content Panel (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950 text-left">
          <div className="max-w-4xl mx-auto space-y-8 pb-16">

            {/* TAB 1: HERO & PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-white mb-1">
                    Hero Section & Owner Profile
                  </h2>
                  <p className="text-xs text-slate-400">
                    Update your headline, cat avatar picture from your phone gallery, and professional about description.
                  </p>
                </div>

                {/* Profile Picture Uploader */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Owner Profile Picture (Cat Avatar Default)
                  </h3>
                  <ImageUploadField
                    label="Cat Profile Portrait"
                    currentValue={formData.hero.profileImage}
                    onChange={(newUrl) => {
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, profileImage: newUrl }
                      });
                      triggerStatus('success', 'Profile photo updated in memory. Click Save & Publish to apply.');
                    }}
                    isAvatar={true}
                  />
                </div>

                {/* Hero Fields */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Hero Headline & Subtitle
                  </h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Headline</label>
                    <input
                      type="text"
                      value={formData.hero.headline}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, headline: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle</label>
                    <textarea
                      rows={3}
                      value={formData.hero.subtitle}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, subtitle: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* About Details */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    About Section Content
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Owner Name</label>
                      <input
                        type="text"
                        value={formData.about.ownerName}
                        onChange={(e) => setFormData({ ...formData, about: { ...formData.about, ownerName: e.target.value } })}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={formData.about.title}
                        onChange={(e) => setFormData({ ...formData, about: { ...formData.about, title: e.target.value } })}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Short Introduction</label>
                    <textarea
                      rows={2}
                      value={formData.about.intro}
                      onChange={(e) => setFormData({ ...formData, about: { ...formData.about, intro: e.target.value } })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Comprehensive Description</label>
                    <textarea
                      rows={5}
                      value={formData.about.description}
                      onChange={(e) => setFormData({ ...formData, about: { ...formData.about, description: e.target.value } })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Optional Education Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Education & Degree Info <span className="text-slate-500 font-normal lowercase">(optional — leave blank until you wish to display)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.about.education}
                      onChange={(e) => setFormData({ ...formData, about: { ...formData.about, education: e.target.value } })}
                      placeholder="e.g. BS / Master's degree in Progress"
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-white mb-1">
                      Academic Services Management
                    </h2>
                    <p className="text-xs text-slate-400">
                      Configure your 14 services, deliverables, starting prices, and publication status.
                    </p>
                  </div>
                  <button
                    onClick={addService}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.services.map((srv, index) => (
                    <div
                      key={srv.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-500">#{index + 1}</span>
                          <span className="font-semibold text-white text-sm">{srv.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                            <input
                              type="checkbox"
                              checked={srv.published}
                              onChange={(e) => {
                                const updated = [...formData.services];
                                updated[index].published = e.target.checked;
                                setFormData({ ...formData, services: updated });
                              }}
                              className="rounded accent-emerald-500"
                            />
                            <span>{srv.published ? 'Published' : 'Draft'}</span>
                          </label>
                          <button
                            onClick={() => setItemToDelete({ type: 'service', id: srv.id, name: srv.title })}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Service Title</label>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[index].title = e.target.value;
                              setFormData({ ...formData, services: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                          <input
                            type="text"
                            value={srv.category}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[index].category = e.target.value;
                              setFormData({ ...formData, services: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={srv.description}
                          onChange={(e) => {
                            const updated = [...formData.services];
                            updated[index].description = e.target.value;
                            setFormData({ ...formData, services: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Indicative Starting Price (PKR)</label>
                        <input
                          type="text"
                          value={srv.examplePrice}
                          onChange={(e) => {
                            const updated = [...formData.services];
                            updated[index].examplePrice = e.target.value;
                            setFormData({ ...formData, services: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-white mb-1">
                      Demonstration Assignment Samples
                    </h2>
                    <p className="text-xs text-slate-400">
                      Manage sample excerpts, outlines, citation types, and formatting highlights.
                    </p>
                  </div>
                  <button
                    onClick={addProject}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.projects.map((proj, index) => (
                    <div
                      key={proj.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-amber-400">Sample #{index + 1}</span>
                          <span className="font-semibold text-white text-sm">{proj.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                            <input
                              type="checkbox"
                              checked={proj.published}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].published = e.target.checked;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="rounded accent-emerald-500"
                            />
                            <span>{proj.published ? 'Published' : 'Draft'}</span>
                          </label>
                          <button
                            onClick={() => setItemToDelete({ type: 'project', id: proj.id, name: proj.title })}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].title = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].category = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Project Objective</label>
                        <input
                          type="text"
                          value={proj.objective}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].objective = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Realistic Sample Excerpt</label>
                        <textarea
                          rows={3}
                          value={proj.sampleExcerpt}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].sampleExcerpt = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-serif"
                        />
                      </div>

                      <ImageUploadField
                        label="Sample Cover Photo"
                        currentValue={proj.coverImage}
                        onChange={(newUrl) => {
                          const updated = [...formData.projects];
                          updated[index].coverImage = newUrl;
                          setFormData({ ...formData, projects: updated });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-white mb-1">
                      Assignment Image Gallery
                    </h2>
                    <p className="text-xs text-slate-400">
                      Upload photos directly from your phone gallery or desktop.
                    </p>
                  </div>
                  <button
                    onClick={addGalleryItem}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Image</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.gallery.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">#{index + 1}</span>
                        <div className="flex items-center gap-2">
                          <label className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                            <input
                              type="checkbox"
                              checked={item.published}
                              onChange={(e) => {
                                const updated = [...formData.gallery];
                                updated[index].published = e.target.checked;
                                setFormData({ ...formData, gallery: updated });
                              }}
                              className="rounded accent-emerald-500"
                            />
                            <span>{item.published ? 'Published' : 'Hidden'}</span>
                          </label>
                          <button
                            onClick={() => setItemToDelete({ type: 'gallery', id: item.id, name: item.title })}
                            className="p-1 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <ImageUploadField
                        label="Gallery Image"
                        currentValue={item.imageUrl}
                        onChange={(newUrl) => {
                          const updated = [...formData.gallery];
                          updated[index].imageUrl = newUrl;
                          setFormData({ ...formData, gallery: updated });
                        }}
                      />

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...formData.gallery];
                            updated[index].title = e.target.value;
                            setFormData({ ...formData, gallery: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                        <input
                          type="text"
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...formData.gallery];
                            updated[index].category = e.target.value;
                            setFormData({ ...formData, gallery: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: PRICING */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-white mb-1">
                    Pricing Rates (PKR)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Update base starting prices and package descriptions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.pricing.map((card, index) => (
                    <div
                      key={card.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-semibold text-white text-sm">{card.title}</span>
                        <label className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                          <input
                            type="checkbox"
                            checked={card.popular}
                            onChange={(e) => {
                              const updated = [...formData.pricing];
                              updated[index].popular = e.target.checked;
                              setFormData({ ...formData, pricing: updated });
                            }}
                            className="rounded accent-amber-500"
                          />
                          <span>Highlight as Popular</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Card Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const updated = [...formData.pricing];
                            updated[index].title = e.target.value;
                            setFormData({ ...formData, pricing: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Starting Price in PKR (0 for tailored quote)</label>
                        <input
                          type="number"
                          value={card.startingPricePKR}
                          onChange={(e) => {
                            const updated = [...formData.pricing];
                            updated[index].startingPricePKR = parseInt(e.target.value, 10) || 0;
                            setFormData({ ...formData, pricing: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) => {
                            const updated = [...formData.pricing];
                            updated[index].description = e.target.value;
                            setFormData({ ...formData, pricing: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: FAQS */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-white mb-1">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-xs text-slate-400">
                      Edit student FAQ responses, draft policies, and clarity notes.
                    </p>
                  </div>
                  <button
                    onClick={addFaq}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.faqs.map((faq, index) => (
                    <div
                      key={faq.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">Q#{index + 1}</span>
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-1.5 text-xs text-amber-300">
                            <input
                              type="checkbox"
                              checked={faq.needsReview}
                              onChange={(e) => {
                                const updated = [...formData.faqs];
                                updated[index].needsReview = e.target.checked;
                                setFormData({ ...formData, faqs: updated });
                              }}
                              className="rounded accent-amber-500"
                            />
                            <span>Needs Owner Review</span>
                          </label>
                          <button
                            onClick={() => setItemToDelete({ type: 'faq', id: faq.id, name: faq.question })}
                            className="p-1 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Question</label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...formData.faqs];
                            updated[index].question = e.target.value;
                            setFormData({ ...formData, faqs: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Answer</label>
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...formData.faqs];
                            updated[index].answer = e.target.value;
                            setFormData({ ...formData, faqs: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: CONTACT CONFIGURATION */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-white mb-1">
                    Centralized Contact Settings
                  </h2>
                  <p className="text-xs text-slate-400">
                    Changes here update all buttons, headers, inquiry form, and WhatsApp links across the entire website automatically.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp Display Number
                      </label>
                      <input
                        type="text"
                        value={formData.contact.whatsappDisplay}
                        onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, whatsappDisplay: e.target.value } })}
                        placeholder="03445337130"
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp International Number (For wa.me links)
                      </label>
                      <input
                        type="text"
                        value={formData.contact.whatsappInternational}
                        onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, whatsappInternational: e.target.value } })}
                        placeholder="923445337130"
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Official Inquiries Email
                    </label>
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                      placeholder="KashafMustafa130@gmail.com"
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Support Schedule / Hours
                      </label>
                      <input
                        type="text"
                        value={formData.contact.serviceHours}
                        onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, serviceHours: e.target.value } })}
                        placeholder="Monday – Saturday, 9:00 AM – 10:00 PM (PKT)"
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Location / Geographic Notice
                      </label>
                      <input
                        type="text"
                        value={formData.contact.location}
                        onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, location: e.target.value } })}
                        placeholder="Pakistan (Serving University & College Students Worldwide)"
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: SECURITY & BACKUP */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-white mb-1">
                    Security, Password & Website Backup
                  </h2>
                  <p className="text-xs text-slate-400">
                    Change your administrative password and export/restore backup snapshots of your full portfolio.
                  </p>
                </div>

                {/* Change Password Box */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    <span>Change Admin Password</span>
                  </h3>

                  <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">New Password (Min 8 chars)</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                      />
                    </div>

                    {passwordError && (
                      <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{passwordError}</span>
                      </p>
                    )}

                    {passwordStatus && (
                      <p className="text-xs text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{passwordStatus}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Backup & Restore Box */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Portfolio Backup & Disaster Recovery</span>
                  </h3>

                  <p className="text-xs text-slate-400">
                    Export your complete site data (hero, services, portfolio samples, gallery items, prices, FAQs) to a secure JSON file, or restore from a previous backup.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadBackup}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors shadow-sm"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>Export Backup JSON</span>
                    </button>

                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors shadow-sm cursor-pointer">
                      <RotateCcw className="w-4 h-4 text-emerald-400" />
                      <span>Restore from Backup File</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleRestoreBackupFile}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950/60 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Confirm Removal</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove <strong className="text-white">"{itemToDelete.name}"</strong>? This item will be deleted upon saving.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
