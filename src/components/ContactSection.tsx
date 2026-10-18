import React from 'react';
import { MessageCircle, Mail, Clock, MapPin, ArrowRight } from 'lucide-react';
import { ContactInfo } from '../types.ts';
import { generateDirectWhatsAppUrl, generateEmailUrl } from '../utils/whatsapp.ts';

interface ContactSectionProps {
  contact: ContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const whatsAppUrl = generateDirectWhatsAppUrl(
    contact.whatsappInternational,
    "Hello Kashaf Mustafa, I visited your website and would like to inquire about academic support."
  );

  const emailUrl = generateEmailUrl(
    contact.email,
    "Academic Assignment Inquiry",
    `Hello Kashaf Mustafa,\n\nI am contacting you regarding academic support for my university coursework.\n\nProject details:\n`
  );

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300 inline-block mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Direct Student Contact
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Reach out directly to Kashaf Mustafa on WhatsApp or email for prompt assistance, questions about rubrics, or immediate quotations.
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: WhatsApp */}
          <div className="flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Fastest Response
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1 mb-2">
                WhatsApp Chat
              </h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Connect directly on WhatsApp for real-time discussion, voice notes, prompt reviews, and quick quotes.
              </p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300 font-bold text-sm mb-6">
                {contact.whatsappDisplay}
              </div>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 hover:border-amber-300 transition-all shadow-2xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Formal Correspondence
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1 mb-2">
                Email Inquiries
              </h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Send assignment briefs, syllabi, rubrics, and formal documentation directly via email.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-slate-800 text-xs truncate mb-6">
                {contact.email}
              </div>
            </div>

            <a
              href={emailUrl}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Open Email App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Hours & Availability */}
          <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 hover:border-amber-300 transition-all shadow-2xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Operating Schedule
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1 mb-2">
                Availability
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Standard support hours for project inquiries, milestone checks, and deliveries:
              </p>
              <div className="space-y-2 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Hours:</span>
                  <span className="font-semibold">{contact.serviceHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Region:</span>
                  <span className="font-semibold">Pakistan Standard Time</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 p-3 rounded-xl">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{contact.location}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
