import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showSubtitle = true }) => {
  const badgeSize = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-13 h-13 text-lg',
  }[size];

  const titleSize = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-xl font-bold',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* KM Monogram Crest */}
      <div className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-amber-400/60 shadow-sm text-amber-300 font-serif font-bold tracking-wider shrink-0 ${badgeSize}`}>
        <span className="drop-shadow-sm">KM</span>
        <div className="absolute -inset-0.5 rounded-full border border-amber-300/20 pointer-events-none" />
      </div>

      <div className="flex flex-col leading-tight">
        <span className={`text-slate-900 font-serif tracking-tight ${titleSize}`}>
          Kashaf Mustafa
        </span>
        {showSubtitle && (
          <span className="text-[11px] font-medium tracking-wide uppercase text-amber-700">
            Academic Writing
          </span>
        )}
      </div>
    </div>
  );
};
