import React from 'react';
import { MessageCircle, FileText, ArrowRight, Shield, CheckCircle, BookOpen } from 'lucide-react';
import { HeroData, ContactInfo } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp.ts';

interface HeroProps {
  hero: HeroData;
  contact: ContactInfo;
}

export const Hero: React.FC<HeroProps> = ({ hero, contact }) => {
  const whatsAppUrl = generateDirectWhatsAppUrl(
    contact.whatsappInternational,
    "Hello Kashaf Mustafa, I visited your academic writing website and would like to discuss assignment assistance."
  );

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Left / Top) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Owner Pill with Circular Cat Avatar */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-800/80 border border-amber-400/30 backdrop-blur-md mb-6 shadow-sm">
              <div className="relative">
                <SafeImage
                  src={hero.profileImage}
                  alt={`${contact.ownerName} Profile`}
                  fallbackType="cat"
                  containerClassName="w-8 h-8 rounded-full border border-amber-300 ring-1 ring-amber-400/40 shadow-xs shrink-0"
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <span className="text-xs font-medium text-amber-200">
                {contact.ownerName} &bull; <span className="text-slate-300">{hero.badge || "Academic Writing & Editorial Support"}</span>
              </span>
            </div>

            {/* Exact Headline Required */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2] mb-5">
              {hero.headline}
            </h1>

            {/* Exact Subtitle Required */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-light">
              {hero.subtitle}
            </p>

            {/* Three Required Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10">
              {/* Button 1: Contact on WhatsApp */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/40 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Contact on WhatsApp</span>
              </a>

              {/* Button 2: Explore Portfolio */}
              <a
                href="#portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:bg-slate-800 text-white border border-slate-700 hover:border-amber-400/40 font-medium text-sm sm:text-base transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>Explore Portfolio</span>
              </a>

              {/* Button 3: View Services */}
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl text-amber-200 hover:text-white hover:bg-slate-800/50 font-medium text-sm sm:text-base transition-colors"
              >
                <span>View Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Factual Value Pillars (No fake stats or fake client counts) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 w-full text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Strict Student Confidentiality</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Harvard, APA & IEEE Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct WhatsApp Project Support</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card (Right / Bottom) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative border with subtle gold ring */}
              <div className="relative rounded-2xl bg-gradient-to-b from-amber-400/20 via-slate-800 to-slate-900 p-1.5 shadow-2xl">
                <div className="overflow-hidden rounded-xl bg-slate-900 border border-slate-800">
                  
                  {/* Hero Image */}
                  <SafeImage
                    src={hero.heroImage}
                    alt="University Academic Writing & Research"
                    containerClassName="w-full h-64 sm:h-72 object-cover"
                    className="w-full h-full object-cover filter brightness-95"
                  />

                  {/* Profile & Service Badge Box */}
                  <div className="p-5 bg-slate-900/95 border-t border-slate-800">
                    <div className="flex items-center gap-4">
                      {/* Owner Profile Picture (High quality cat portrait) */}
                      <div className="relative shrink-0">
                        <SafeImage
                          src={hero.profileImage}
                          alt="Kashaf Mustafa Cat Avatar"
                          fallbackType="cat"
                          containerClassName="w-16 h-16 rounded-full border-2 border-amber-400 shadow-md ring-2 ring-slate-950"
                          className="w-full h-full object-cover rounded-full"
                        />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" title="Available for projects" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-semibold text-white truncate">
                            {contact.ownerName}
                          </h2>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-medium border border-amber-400/20">
                            Owner
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {contact.brandName}
                        </p>
                        <p className="text-xs text-amber-200/90 font-mono mt-1">
                          WhatsApp: {contact.whatsappDisplay}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>Assistance for:</span>
                      <span className="text-slate-200 font-medium">Undergraduate & Master's Students</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating floating mini card */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 items-center gap-3 p-3.5 rounded-xl bg-slate-900/95 border border-amber-400/30 shadow-xl backdrop-blur-md">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-300">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">14 Academic Services</div>
                  <div className="text-[11px] text-slate-400">Essays, Reports, Referencing & Decks</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
