import React from 'react';
import { Check, MessageCircle, HelpCircle } from 'lucide-react';
import { PricingCard, ContactInfo } from '../types.ts';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp.ts';

interface PricingSectionProps {
  pricing: PricingCard[];
  contact: ContactInfo;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ pricing, contact }) => {
  return (
    <section id="pricing" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300 inline-block mb-3">
            Clear & Transparent Rates (PKR)
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Indicative Starting Pricing
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Rates are provided as illustrative starting estimates in Pakistani Rupees. Final project costs are agreed upfront based on rubric scope, technical complexity, word count, and submission deadline.
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricing.map((card) => {
            const whatsAppUrl = generateDirectWhatsAppUrl(
              contact.whatsappInternational,
              `Hello Kashaf Mustafa, I am inquiring about your "${card.title}" service starting at PKR ${card.startingPricePKR}. Can I share my assignment brief for a precise quote?`
            );

            return (
              <div
                key={card.id}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                  card.popular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl ring-2 ring-amber-400'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 hover:border-amber-300 hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {card.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
                      Most Requested
                    </span>
                  </div>
                )}

                <div>
                  <h3 className={`text-lg sm:text-xl font-serif font-bold mb-2 ${card.popular ? 'text-white' : 'text-slate-900'}`}>
                    {card.title}
                  </h3>
                  <p className={`text-xs sm:text-sm mb-6 ${card.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                    {card.description}
                  </p>

                  {/* Price display in PKR */}
                  <div className="mb-6 pb-6 border-b border-slate-200/50">
                    <span className={`text-xs block mb-1 ${card.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      Starting From
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold text-amber-500">PKR</span>
                      <span className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight ${card.popular ? 'text-amber-300' : 'text-slate-900'}`}>
                        {card.startingPricePKR > 0 ? card.startingPricePKR.toLocaleString() : 'Tailored'}
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-1 ${card.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      {card.startingPricePKR > 0 ? 'Base starting rate per brief' : 'Quoted on review of full prompt'}
                    </span>
                  </div>

                  {/* Feature checklist */}
                  <div className="space-y-2.5 mb-8">
                    <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${card.popular ? 'text-amber-300' : 'text-slate-400'}`}>
                      What's Included:
                    </span>
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${card.popular ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-100 text-emerald-700'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={card.popular ? 'text-slate-200' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry Button */}
                <div className="pt-2">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all ${
                      card.popular
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-slate-900 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Inquire for Quotation</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing notice box */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <span className="font-bold">Honest Pricing Policy:</span> Quotations are determined fairly according to the academic depth of your assignment, the volume of references required, and your deadline. No arbitrary price jumps or hidden charges once scope is agreed upon.
          </p>
        </div>

      </div>
    </section>
  );
};
