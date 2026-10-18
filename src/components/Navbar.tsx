import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { ContactInfo } from '../types.ts';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp.ts';

interface NavbarProps {
  contact: ContactInfo;
  onOpenAdminLogin: () => void;
  isAdminAuthenticated: boolean;
  onOpenAdminDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  contact,
  onOpenAdminLogin,
  isAdminAuthenticated,
  onOpenAdminDashboard,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const whatsAppUrl = generateDirectWhatsAppUrl(
    contact.whatsappInternational,
    "Hello Kashaf Mustafa, I visited your academic writing portfolio website and would like to inquire about your services."
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-amber-700 transition-colors py-1 px-1 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & WhatsApp Direct CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {isAdminAuthenticated ? (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Admin Panel
              </button>
            ) : null}

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden md:inline">WhatsApp</span>
              <span>{contact.whatsappDisplay}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex sm:hidden items-center justify-center p-2 rounded-full bg-emerald-600 text-white shadow-xs"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-amber-50 hover:text-amber-800 active:bg-amber-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Chat on WhatsApp ({contact.whatsappDisplay})
            </a>

            {isAdminAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-amber-300 font-medium text-sm"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Go to Owner Admin Panel
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full py-2 px-4 text-xs text-slate-500 hover:text-slate-800 text-center font-medium"
              >
                Owner Portal
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
