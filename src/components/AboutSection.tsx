import React from 'react';
import { ShieldCheck, CheckCircle2, MessageCircle, Mail } from 'lucide-react';
import { AboutData, ContactInfo } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';
import { generateDirectWhatsAppUrl, generateEmailUrl } from '../utils/whatsapp.ts';

interface AboutSectionProps {
  about: AboutData;
  profileImage: string;
  contact: ContactInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  profileImage,
  contact,
}) => {
  const whatsAppUrl = generateDirectWhatsAppUrl(
    contact.whatsappInternational,
    "Hello Kashaf Mustafa, I read about your academic support services and would like to discuss my assignment."
  );

  const emailUrl = generateEmailUrl(
    contact.email,
    "Inquiry: Academic Support Services",
    `Hello Kashaf Mustafa,\n\nI reviewed your portfolio and would like to inquire about academic support for my coursework.\n\nSubject:\nUniversity:\nRequirements:\n`
  );

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
            Independent Academic Specialist
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            {about.title}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Owner Profile & Identity Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-slate-800 text-center">
              
              {/* Circular Owner Cat Profile Picture */}
              <div className="relative mx-auto w-36 h-36 mb-6">
                <SafeImage
                  src={profileImage}
                  alt={`${about.ownerName} - Academic Support Specialist`}
                  fallbackType="cat"
                  containerClassName="w-36 h-36 rounded-full border-4 border-amber-400/80 shadow-2xl ring-4 ring-slate-800/80 mx-auto"
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-slate-950 rounded-full" title="Active on WhatsApp" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                {about.ownerName}
              </h3>
              <p className="text-xs sm:text-sm text-amber-300 font-medium tracking-wide uppercase mb-4">
                Academic Writing & Editorial Services
              </p>

              {/* Verified Contact Details Box */}
              <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 mb-6 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Direct WhatsApp:</span>
                  <span className="font-mono text-emerald-300 font-semibold">{contact.whatsappDisplay}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-slate-200 truncate max-w-[160px] text-right">{contact.email}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Operating Hours:</span>
                  <span className="text-slate-300 text-right">{contact.serviceHours}</span>
                </div>
              </div>

              {/* Education Field (Only renders if owner has provided real info) */}
              {about.education && about.education.trim().length > 0 && (
                <div className="mb-6 p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 text-left">
                  <span className="font-semibold block text-white mb-0.5">Education / Academic Background:</span>
                  <p>{about.education}</p>
                </div>
              )}

              {/* Direct Touch Buttons */}
              <div className="grid grid-cols-2 gap-2 w-full">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={emailUrl}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative & Skills */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Lead Introduction */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
                Independent, Student-Centric Support
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {about.intro}
              </p>
            </div>

            {/* Detailed Service Philosophy */}
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              {about.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Competencies & Areas of Support */}
            <div className="pt-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Specialized Competencies & Areas of Support</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {about.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-300 shadow-2xs transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Ethics Guarantee */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs leading-relaxed border-l-4 border-amber-500">
              <span className="font-bold text-white block mb-1">Academic Integrity & Ethical Commitment:</span>
              <p>{about.ethicsStatement}</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
