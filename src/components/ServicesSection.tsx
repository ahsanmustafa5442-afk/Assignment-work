import React, { useState } from 'react';
import {
  GraduationCap,
  FileText,
  Briefcase,
  TrendingUp,
  Cpu,
  Leaf,
  CheckCircle2,
  PenTool,
  BookOpen,
  Bookmark,
  Presentation,
  FileCheck,
  ListTodo,
  Search,
  MessageCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { ServiceItem, ContactInfo } from '../types.ts';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp.ts';

interface ServicesSectionProps {
  services: ServiceItem[];
  contact: ContactInfo;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, contact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories extracted from services
  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  // Icon mapping helper
  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-amber-600" };
    switch (name) {
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      case 'CheckCircle2': return <CheckCircle2 {...props} />;
      case 'PenTool': return <PenTool {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Bookmark': return <Bookmark {...props} />;
      case 'Presentation': return <Presentation {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'ListTodo': return <ListTodo {...props} />;
      case 'Search': return <Search {...props} />;
      default: return <HelpCircle {...props} />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300 inline-block mb-3">
            Academic Scope & Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Comprehensive Academic Services
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Ethical academic support, proofreading, citation alignment, and technical formatting designed to help university students elevate their own coursework.
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Pills for quick filtering */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid (All 14 services rendered as elegant cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const serviceWhatsAppUrl = generateDirectWhatsAppUrl(
              contact.whatsappInternational,
              `Hello Kashaf Mustafa, I am interested in inquiring about your "${service.title}" service. Please let me know what details you need to provide a quotation.`
            );

            return (
              <div
                key={service.id}
                className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  {/* Card Top: Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 group-hover:bg-amber-100/80 transition-colors">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Deliverables / Scope */}
                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                      Included Scope & Deliverables
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom: Price and Inquire Button */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  {service.examplePrice && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Estimated Starting:</span>
                      <span className="font-semibold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
                        {service.examplePrice}
                      </span>
                    </div>
                  )}

                  <a
                    href={serviceWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-medium text-xs shadow-xs transition-colors group/btn"
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:text-white transition-colors fill-current" />
                    <span>Inquire on WhatsApp</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Academic disclaimer box */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500">
          <p>
            * Prices are indicative starting estimates in PKR. Final quotations depend on exact rubric requirements, length, and delivery urgency. All services adhere to university academic tutoring guidelines.
          </p>
        </div>

      </div>
    </section>
  );
};
