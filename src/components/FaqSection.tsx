import React, { useState } from 'react';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';
import { FaqItem } from '../types.ts';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300 inline-block mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Clear information on service scope, quotations, Harvard/APA citation assistance, delivery expectations, and student privacy.
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-amber-400 group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span className="text-base sm:text-lg font-serif font-semibold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1 rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-amber-100 text-amber-800' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-in slide-in-from-top-1 duration-200">
                    <p className="pt-4">{faq.answer}</p>
                    {faq.needsReview && (
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Owner notice: Draft policy currently under review by Kashaf Mustafa.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
