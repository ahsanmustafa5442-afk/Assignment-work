import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateDirectWhatsAppUrl } from '../utils/whatsapp.ts';

interface FloatingWhatsAppProps {
  whatsappInternational: string;
  whatsappDisplay: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  whatsappInternational,
  whatsappDisplay,
}) => {
  const whatsAppUrl = generateDirectWhatsAppUrl(
    whatsappInternational,
    "Hello Kashaf Mustafa, I visited your website and would like to ask a quick question about assignment support."
  );

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover/focus */}
      <div className="hidden md:block mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-xl shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span>Chat with Kashaf Mustafa</span>
        <span className="block text-[10px] text-emerald-400 font-mono">{whatsappDisplay}</span>
      </div>

      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct chat with Kashaf Mustafa on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 ring-4 ring-emerald-600/30"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
};
