import React from 'react';

interface LegalModalProps {
  doc: 'privacy' | 'terms' | null;
  onClose: () => void;
}

const CONTENT: Record<'privacy' | 'terms', { title: string; note: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    note: 'The short version, in plain language. Questions? hello@whisk.one',
    sections: [
      {
        h: 'What we collect',
        p: 'Only what you share with us: your name, email, business details, and the domain you have in mind — through the quote form or in conversation. We use it to prepare your quote and build your site. Nothing else.',
      },
      {
        h: 'Currency detection',
        p: 'On your first visit we use a lightweight third-party lookup to detect your approximate country so prices can be shown in your local currency. It is country-level only, sets no tracking cookies, and you can change your currency at any time from the menu.',
      },
      {
        h: 'What we never do',
        p: 'We never sell your personal information or your domain records. Your domain is registered in your name and remains yours, full stop.',
      },
      {
        h: 'Ownership & AI',
        p: 'You own 100% of the website and content built for you. Site copy is drafted with AI and reviewed by a human before anything goes live. Whisk keeps ownership of its own templates, code, and brand.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    note: 'The short version. Your full Client Services Agreement is provided at intake.',
    sections: [
      {
        h: 'The service',
        p: 'One flat product: one website, all-in, delivered in 3 working days. The 3-day guarantee starts after intake confirmation and domain check approval, with a private preview on Day 1.',
      },
      {
        h: 'After launch',
        p: '7 days of free small tweaks are included after launch. After that, the annual Care Plan keeps your site hosted, backed up, updated, and secure — or we handle one-off changes on request.',
      },
      {
        h: 'Ownership',
        p: 'You own your website and your domain. The domain is registered in your name and is transferable to any registrar at any time.',
      },
      {
        h: 'Payment',
        p: 'One flat price, no hidden line items. The Care Plan is billed annually. Prices are quoted in USD and shown converted to your selected currency.',
      },
      {
        h: 'Liability',
        p: 'To the maximum extent permitted by law, Whisk’s total liability is limited to the amount you paid for the service. Whisk is operated by Vyker Services FZ LLC.',
      },
    ],
  },
};

export const LegalModal: React.FC<LegalModalProps> = ({doc, onClose}) => {
  if (!doc) return null;
  const content = CONTENT[doc];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#fff8f5] p-6 rounded-2xl shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto border border-[#e3bfb5]/40"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
      >
        <div className="flex items-start justify-between pb-2 border-b border-[#e3bfb5]/30">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-[#201a16] font-['Fraunces']">{content.title}</span>
            <span className="text-xs text-[#5a4139] font-mono mt-0.5">{content.note}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f8ebe4] hover:bg-[#f3e6df] flex items-center justify-center text-[#201a16] transition-colors flex-shrink-0"
            aria-label="Close"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {content.sections.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#ab2f00]">{s.h}</span>
              <p className="text-xs text-[#5a4139] leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-center text-[#5a4139]/70 font-mono pt-2 border-t border-[#e3bfb5]/20">
          Whisk · whisk.one · hello@whisk.one
        </p>
      </div>
    </div>
  );
};
