import React from 'react';
import {
  MessageSquareQuote,
  CheckSquare,
  Receipt,
  FileSearch,
  Award,
  ArrowRight
} from 'lucide-react';
import { ProcessStep } from '../types.ts';

interface ProcessSectionProps {
  steps: ProcessStep[];
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ steps }) => {
  const renderStepIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-amber-300" };
    switch (iconName) {
      case 'MessageSquareQuote': return <MessageSquareQuote {...props} />;
      case 'CheckSquare': return <CheckSquare {...props} />;
      case 'Receipt': return <Receipt {...props} />;
      case 'FileSearch': return <FileSearch {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <CheckSquare {...props} />;
    }
  };

  return (
    <section id="process" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block mb-3">
            Workflow & Milestone Stages
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            How We Work Together
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            A transparent five-step process ensuring total rubric alignment, open student feedback, and on-time academic delivery.
          </p>
          <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between bg-slate-800/80 border border-slate-700/80 hover:border-amber-400/60 rounded-2xl p-5 shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Step badge and icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center">
                    {renderStepIcon(step.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400/70 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700">
                    Step {step.number}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-serif font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Step indicator arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-5 h-5 text-amber-400/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Assurance */}
        <div className="mt-12 text-center text-xs text-slate-400 max-w-xl mx-auto">
          Need an urgent turnaround? Mention your strict deadline when submitting requirements for expedited prioritization.
        </div>

      </div>
    </section>
  );
};
