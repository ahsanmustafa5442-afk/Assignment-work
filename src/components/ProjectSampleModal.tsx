import React, { useEffect } from 'react';
import { X, CheckCircle, MessageCircle, FileText, Bookmark, Quote, Info } from 'lucide-react';
import { PortfolioProject, ContactInfo } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp.ts';

interface ProjectSampleModalProps {
  project: PortfolioProject | null;
  contact: ContactInfo;
  onClose: () => void;
}

export const ProjectSampleModal: React.FC<ProjectSampleModalProps> = ({
  project,
  contact,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const whatsAppInquiryUrl = generateDirectWhatsAppUrl(
    contact.whatsappInternational,
    `Hello Kashaf Mustafa, I reviewed the demonstration sample "${project.title}" on your portfolio. I have a similar university assignment in ${project.category} and would like to discuss assistance.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
              DEMONSTRATION SAMPLE
            </span>
            <span className="text-xs text-slate-300 font-medium">
              &bull; {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Close sample modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-left">
          
          {/* Honest Demo Disclaimer Banner */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Educational Demonstration Sample:</span> This sample has been prepared specifically to showcase structural outline capabilities, scholarly diction, citation standards, and professional document formatting. It does not represent commissioned client coursework.
            </div>
          </div>

          {/* Title & Cover */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5 font-medium">Citation Style:</span>
              <span className="font-semibold text-slate-900">{project.citationStyle || 'Harvard Standard'}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5 font-medium">Sample Word Scope:</span>
              <span className="font-semibold text-slate-900">{project.wordCountSample || '3,000 words'}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-500 block mb-0.5 font-medium">Academic Level:</span>
              <span className="font-semibold text-slate-900">University Undergraduate / Masters</span>
            </div>
          </div>

          {/* Project Objective */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span>Project Objective</span>
            </h3>
            <p className="text-sm text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200">
              {project.objective}
            </p>
          </div>

          {/* Sample Headings & Document Structure */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Demonstration Outline & Section Headings</span>
            </h3>
            <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 font-mono">
              {project.sampleHeadings.map((heading, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{heading}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Realistic Excerpt */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Quote className="w-4 h-4 text-amber-600" />
              <span>Realistic Sample Excerpt (Scholarly Language & Academic Voice)</span>
            </h3>
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif italic relative">
              "{project.sampleExcerpt}"
            </div>
          </div>

          {/* Formatting & Typesetting Highlights */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Demonstrated Formatting & Standard Compliance</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {project.formattingHighlights.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Need similar structural or editorial assistance for your coursework?
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/3 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <a
              href={whatsAppInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
