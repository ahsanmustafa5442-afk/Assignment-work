import React from 'react';
import { MessageCircle, Mail, ShieldAlert, Lock, ArrowUp } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { ContactInfo } from '../types.ts';
import { generateDirectWhatsAppUrl, generateEmailUrl } from '../utils/whatsapp.ts';

interface FooterProps {
  contact: ContactInfo;
  onOpenAdminLogin: () => void;
  isAdminAuthenticated: boolean;
  onOpenAdminDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contact,
  onOpenAdminLogin,
  isAdminAuthenticated,
  onOpenAdminDashboard,
}) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppUrl = generateDirectWhatsAppUrl(contact.whatsappInternational);
  const emailUrl = generateEmailUrl(contact.email);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Introduction (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 inline-block">
              <Logo size="md" className="[&_span.text-slate-900]:text-white" />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Professional, ethical academic support for university and college students. Providing expert assistance in proofreading, structured outlines, Harvard and APA citation formatting, and presentation design.
            </p>

            <div className="pt-2 flex flex-col space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Owner:</span>
                <span className="text-slate-200 font-semibold">{contact.ownerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">WhatsApp:</span>
                <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono">
                  {contact.whatsappDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Email:</span>
                <a href={emailUrl} className="text-amber-300 hover:underline">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Academic Services (14)</a></li>
              <li><a href="#portfolio" className="hover:text-amber-300 transition-colors">Portfolio Demonstrations</a></li>
              <li><a href="#gallery" className="hover:text-amber-300 transition-colors">Study & Assignment Gallery</a></li>
              <li><a href="#process" className="hover:text-amber-300 transition-colors">5-Step Process</a></li>
              <li><a href="#pricing" className="hover:text-amber-300 transition-colors">Pricing Rates (PKR)</a></li>
              <li><a href="#about" className="hover:text-amber-300 transition-colors">About Kashaf Mustafa</a></li>
              <li><a href="#faq" className="hover:text-amber-300 transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition-colors">Contact Information</a></li>
            </ul>
          </div>

          {/* Academic Integrity & Ethics Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Academic Integrity Statement</span>
            </h4>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              Services provided by Kashaf Mustafa Academic Writing strictly emphasize academic mentoring, proofreading, document typesetting, and citation compliance. We do not support submitting external work dishonestly as your own; all materials are structured to help students understand, refine, and improve their personal scholarly output.
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Privacy Protected: Client details and assignment materials remain strictly confidential.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Back to Top, and Discreet Owner Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} {contact.brandName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            {/* Discreet Admin Login link in footer as explicitly requested */}
            {isAdminAuthenticated ? (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Dashboard (Logged In)</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
                title="Owner-only administrative access"
              >
                <Lock className="w-3 h-3 text-slate-600" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
