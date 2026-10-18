import React, { useState, useEffect } from 'react';
import { SiteData } from './types.ts';
import { DEFAULT_SITE_DATA } from './data/defaultData.ts';
import { fetchPublicContent, verifyAdminSession, fetchAdminContent, adminLogout } from './utils/api.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { PortfolioSection } from './components/PortfolioSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { InquiryForm } from './components/InquiryForm.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { AdminLoginModal } from './components/admin/AdminLoginModal.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_SITE_DATA);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial load: Fetch site content and verify existing session
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const [content, isAuthed] = await Promise.all([
          fetchPublicContent(),
          verifyAdminSession(),
        ]);

        if (mounted) {
          setSiteData(content);
          setIsAdminAuthenticated(isAuthed);

          // If already authenticated, fetch full admin content (includes drafts)
          if (isAuthed) {
            try {
              const fullContent = await fetchAdminContent();
              setSiteData(fullContent);
            } catch (err) {
              console.warn('Could not load full admin content, using public content:', err);
            }
          }
        }
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLoginSuccess = async () => {
    setIsAdminAuthenticated(true);
    setIsLoginModalOpen(false);
    try {
      const fullContent = await fetchAdminContent();
      setSiteData(fullContent);
    } catch (e) {
      console.error('Error fetching admin content after login', e);
    }
    setIsAdminDashboardOpen(true);
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsAdminAuthenticated(false);
    setIsAdminDashboardOpen(false);
    // Reload public content
    const publicContent = await fetchPublicContent();
    setSiteData(publicContent);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Navigation */}
      <Navbar
        contact={siteData.contact}
        onOpenAdminLogin={() => setIsLoginModalOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero hero={siteData.hero} contact={siteData.contact} />

        {/* 2. Services Section (14 Services) */}
        <ServicesSection services={siteData.services} contact={siteData.contact} />

        {/* 3. Portfolio Projects Section (8 Demonstration Projects) */}
        <PortfolioSection projects={siteData.projects} contact={siteData.contact} />

        {/* 4. Assignment Image Gallery (12+ Academic Images) */}
        <GallerySection gallery={siteData.gallery} />

        {/* 5. Process Section (5 Steps) */}
        <ProcessSection steps={siteData.processSteps} />

        {/* 6. Pricing Section (PKR Rates) */}
        <PricingSection pricing={siteData.pricing} contact={siteData.contact} />

        {/* 7. About the Owner (Kashaf Mustafa + Cat Avatar) */}
        <AboutSection
          about={siteData.about}
          profileImage={siteData.hero.profileImage}
          contact={siteData.contact}
        />

        {/* 8. Project Inquiry Form with URL-Encoded WhatsApp forwarding */}
        <InquiryForm contact={siteData.contact} services={siteData.services} />

        {/* 9. Frequently Asked Questions */}
        <FaqSection faqs={siteData.faqs} />

        {/* 10. Direct Contact Section */}
        <ContactSection contact={siteData.contact} />
      </main>

      {/* Footer with Discreet Admin Login Link & Ethics Notice */}
      <Footer
        contact={siteData.contact}
        onOpenAdminLogin={() => setIsLoginModalOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp
        whatsappInternational={siteData.contact.whatsappInternational}
        whatsappDisplay={siteData.contact.whatsappDisplay}
      />

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Secure Owner Admin Dashboard */}
      {isAdminAuthenticated && isAdminDashboardOpen && (
        <AdminDashboard
          data={siteData}
          onUpdateData={(updated) => setSiteData(updated)}
          onClose={() => setIsAdminDashboardOpen(false)}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}
