import React, { useState } from 'react';
import { MessageCircle, ShieldCheck, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { ContactInfo, ServiceItem } from '../types.ts';
import { generateWhatsAppInquiryUrl, InquiryPayload } from '../utils/whatsapp.ts';

interface InquiryFormProps {
  contact: ContactInfo;
  services: ServiceItem[];
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ contact, services }) => {
  const [formData, setFormData] = useState<InquiryPayload>({
    clientName: '',
    email: '',
    service: services[0]?.title || 'University Assignment Support',
    topic: '',
    wordCount: '',
    deadline: '',
    budgetPKR: '',
    instructions: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryPayload, string>>>({});
  const [isPrepared, setIsPrepared] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryPayload, string>> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Please provide your name';
    }

    if (!formData.topic.trim()) {
      newErrors.topic = 'Please provide your assignment topic or subject';
    }

    if (!formData.deadline.trim()) {
      newErrors.deadline = 'Please provide your expected submission deadline';
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Please provide project instructions or prompt notes';
    } else if (formData.instructions.trim().length < 15) {
      newErrors.instructions = 'Please provide at least 15 characters of project instructions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrepareMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setIsPrepared(false);
      return;
    }

    const url = generateWhatsAppInquiryUrl(contact.whatsappInternational, formData);
    setGeneratedUrl(url);
    setIsPrepared(true);

    // Automatically trigger on mobile tap
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="inquiry" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block mb-3">
            Start An Assignment Inquiry
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Project Inquiry & Quote Generator
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light">
            Fill out your assignment specifications below to format an instant, detailed WhatsApp inquiry message directly for Kashaf Mustafa.
          </p>
          <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Card Form Container */}
        <div className="bg-slate-950/80 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <form onSubmit={handlePrepareMessage} className="space-y-6">
            
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Client Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Sarah Ahmed"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                    errors.clientName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-amber-400'
                  } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all`}
                />
                {errors.clientName && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.clientName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address <span className="text-slate-500 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah@university.edu"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Service & Topic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Service Required <span className="text-amber-400">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Other / Custom Inquiry">Other / Custom Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Assignment Topic / Subject <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g. Strategic Management Case Study"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                    errors.topic ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-amber-400'
                  } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all`}
                />
                {errors.topic && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.topic}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Word Count, Deadline, Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Approx. Word Count <span className="text-slate-500 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.wordCount}
                  onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                  placeholder="e.g. 2,500 words"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Required Deadline <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  placeholder="e.g. Nov 5, 2026 or Urgent (48 hrs)"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                    errors.deadline ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-amber-400'
                  } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all`}
                />
                {errors.deadline && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.deadline}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Target Budget <span className="text-slate-500 font-normal lowercase">(PKR, optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.budgetPKR}
                  onChange={(e) => setFormData({ ...formData, budgetPKR: e.target.value })}
                  placeholder="e.g. 3,500"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Row 4: Detailed Instructions */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Project Instructions & Details <span className="text-amber-400">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Include key details such as university requirements, referencing style (e.g. Harvard or APA 7th), specific questions or rubrics, and any existing work you have done."
                className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                  errors.instructions ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-amber-400'
                } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all`}
              />
              {errors.instructions && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.instructions}</span>
                </p>
              )}
            </div>

            {/* Privacy notice - adheres to prompt: "Do not falsely claim the message was delivered. Do not upload assignment files without consent." */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-300">Privacy Notice:</strong> Clicking the button below prepares your requirements into an official message and opens WhatsApp. Your details are transmitted directly to Kashaf Mustafa on WhatsApp (+92 344 5337130) without storing files on public databases.
              </span>
            </div>

            {/* Submit / WhatsApp CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/50 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Continue on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {isPrepared && (
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm border border-amber-400/30 transition-colors"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Reopen WhatsApp Link</span>
                </a>
              )}
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
