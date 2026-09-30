import React, { useRef, useState } from 'react';
import { BASE_PRICES, formatPrice } from '../data/currencies';
import { INDUSTRY_CHIPS, SHOWCASE_SAMPLES, ShowcaseSample } from '../data/whiskData';
import { ScreenTab } from '../types';
import { LegalModal } from './LegalModal';

// Web3Forms delivers quote requests to hello@whisk.one (Purelymail inbox).
// The access key is public by design: it only identifies the recipient inbox.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '5e6b340f-351d-41f2-a931-13819c7a55bc';

interface OverviewScreenProps {
  activeCurrency: string;
  onNavigate: (tab: ScreenTab) => void;
  onPreviewSample: (sample: ShowcaseSample) => void;
  onQuoteSubmitted: (quoteData: {
    name: string;
    email: string;
    profession: string;
    location: string;
    domain: string;
    details: string;
  }) => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  activeCurrency,
  onNavigate,
  onPreviewSample,
  onQuoteSubmitted,
}) => {
  // FAQ accordion state: 0 is open by default
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [domain, setDomain] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  // Honeypot trap for bots (Web3Forms rejects submissions where this is filled)
  const botcheckRef = useRef<HTMLInputElement>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Domain checking indicator
  const [domainChecking, setDomainChecking] = useState(false);
  const [domainStatus, setDomainStatus] = useState<string | null>(null);

  // Legal docs (privacy / terms) shown in a modal
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);

  const handleDomainChange = (val: string) => {
    setDomain(val);
    if (!val.trim()) {
      setDomainStatus(null);
      return;
    }
    setDomainChecking(true);
    // simulate quick availability check
    setTimeout(() => {
      const clean = val.toLowerCase().replace(/[^a-z0-9-.]/g, '');
      const hasExt = clean.includes('.');
      const finalDomain = hasExt ? clean : `${clean}.com`;
      setDomainStatus(`${finalDomain} appears available to register!`);
      setDomainChecking(false);
    }, 400);
  };

  const handleIndustryClick = (chip: (typeof INDUSTRY_CHIPS)[0]) => {
    setSelectedIndustry(chip.slug);
    if (!profession) {
      setProfession(chip.headline);
    }
    const quoteEl = document.getElementById('quote');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !profession.trim() || isSending) return;

    setIsSending(true);
    setSubmitError(false);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New quote request — ${name.trim()}`,
          from_name: name.trim(),
          reply_to: email.trim(),
          name: name.trim(),
          email: email.trim(),
          profession: profession.trim(),
          location: location.trim(),
          domain: domain.trim(),
          details: details.trim(),
          botcheck: botcheckRef.current?.value ?? '',
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean | string;
        message?: string;
      } | null;
      const ok = res.ok && !!data && (data.success === true || data.success === 'true');
      if (!ok) throw new Error(data?.message || 'Unexpected response from form service');

      onQuoteSubmitted({
        name,
        email,
        profession,
        location,
        domain,
        details,
      });
      setIsSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSending(false);
    }
  };

  const faqItems = [
    {
      q: 'Do I need to know anything about tech?',
      a: 'No. You never touch a dashboard, CMS, or line of code. You answer a few friendly questions, approve what we build, and your site goes live.',
    },
    {
      q: 'What do I need to get started?',
      a: "About 20 minutes of your time, your business details, photos if you have them, and the name or domain you'd like. We check the domain for you.",
    },
    {
      q: 'Who owns the website and the domain?',
      a: "You do. The domain is registered in your name and is transferable anytime — it's yours, full stop.",
    },
    {
      q: 'What if I need changes later?',
      a: '7 days of small tweaks are free after launch. After that, the Care Plan keeps everything maintained with priority small changes — or ask us about one-off edits.',
    },
    {
      q: 'Which countries do you work in?',
      a: 'Anywhere in the world that works in English. The site shows prices in your local currency automatically — or pick your own from the menu.',
    },
    {
      q: 'How fast is 3 days, really?',
      a: 'Three working days from intake to live, with a private preview on Day 1 so nothing surprises you. The 3-day promise is in your agreement.',
    },
  ];

  return (
    <div className="flex flex-col w-full text-[#201a16] pb-24 max-w-2xl mx-auto">
      {/* HERO SECTION */}
      <section className="px-5 pt-4 pb-8 flex flex-col gap-5">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#fed56b]/40">
          <span className="w-2 h-2 rounded-full bg-[#2a6653] animate-pulse" />
          <span className="text-[11px] font-mono uppercase text-[#201a16] tracking-wider font-semibold">
            Done-for-you websites · Live in 3 days
          </span>
        </div>

        {/* H1 Headline */}
        <h1
          className="text-[2.5rem] leading-[2.85rem] text-[#201a16] tracking-tight"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
        >
          Tell us who you are. Three days later, you’re{' '}
          <span className="italic text-[#ab2f00] relative inline-block">
            live
            <svg
              className="absolute -bottom-1 left-0 w-full text-[#ab2f00]"
              fill="none"
              height="8"
              preserveAspectRatio="none"
              viewBox="0 0 100 8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5.5C24 2 68 1.5 98 4.8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
          </span>
          .
        </h1>

        {/* Subheadline */}
        <p className="text-[1.0625rem] leading-[1.75rem] text-[#5a4139]">
          Whisk writes your words, designs your pages, and handles the domain, hosting, and email —
          so all you do is watch your website go live. No tech. No jargon. No guesswork.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href="#quote"
            className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#ab2f00] hover:bg-[#862300] text-white text-[15px] font-semibold flex items-center justify-center shadow-md active:scale-[0.98] transition-all"
          >
            Get a free quote
          </a>
          <a
            href="#how"
            className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#f3e6df] text-[#201a16] text-[15px] font-semibold flex items-center justify-center hover:bg-[#ede0d9] transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* Trust Line with Sage pulse dot */}
        <div className="flex items-center gap-2.5 pt-1 text-[#5a4139]">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2a6653] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2a6653]" />
          </span>
          <p className="text-sm leading-snug">
            For salons, plumbers, cafés, coaches, photographers, tutors — anywhere in the world.
          </p>
        </div>

        {/* Visual Showcase Mosaic */}
        <div className="pt-3 grid grid-cols-2 gap-3">
          {/* Card 1: The Roastery Co. */}
          <button
            onClick={() => onPreviewSample(SHOWCASE_SAMPLES.roastery)}
            className="text-left group relative rounded-2xl overflow-hidden bg-[#f8ebe4] shadow-sm aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-[#ab2f00]"
          >
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              alt="Warm modern desktop workspace of an artisan coffee shop owner with a fresh clean website preview on a tablet screen"
              src={SHOWCASE_SAMPLES.roastery.image}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-[#fff8f5]/90 backdrop-blur-md text-[10px] font-mono font-medium text-[#201a16] flex items-center gap-1 shadow-xs">
              <span>The Roastery Co.</span>
              <span className="material-symbols-outlined text-[12px] opacity-70">open_in_new</span>
            </div>
          </button>

          {/* Card 2: Maison Éclat */}
          <button
            onClick={() => onPreviewSample(SHOWCASE_SAMPLES.maison)}
            className="text-left group relative rounded-2xl overflow-hidden bg-[#f8ebe4] shadow-sm aspect-[4/3] mt-4 focus:outline-none focus:ring-2 focus:ring-[#ab2f00]"
          >
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              alt="Chic boutique beauty salon interior with an open appointment book and sleek phone interface displaying an elegant service menu"
              src={SHOWCASE_SAMPLES.maison.image}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-[#fff8f5]/90 backdrop-blur-md text-[10px] font-mono font-medium text-[#201a16] flex items-center gap-1 shadow-xs">
              <span>Maison Éclat</span>
              <span className="material-symbols-outlined text-[12px] opacity-70">open_in_new</span>
            </div>
          </button>
        </div>
      </section>

      {/* WHO IT'S FOR STRIP */}
      <section className="py-3 bg-[#fef1ea] overflow-x-auto no-scrollbar border-y border-[#e3bfb5]/30">
        <div className="px-5 flex gap-2 whitespace-nowrap">
          {INDUSTRY_CHIPS.map((chip) => {
            const isSelected = selectedIndustry === chip.slug;
            return (
              <button
                key={chip.slug}
                onClick={() => handleIndustryClick(chip)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#ab2f00] text-white shadow-xs'
                    : 'bg-[#f3e6df] text-[#201a16] hover:bg-[#ede0d9]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* S-LINE WHISK DIVIDER */}
      <div className="w-full flex justify-center py-7 text-[#e3bfb5]">
        <svg
          fill="none"
          height="24"
          viewBox="0 0 64 24"
          width="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12C12 22 22 2 32 12C42 22 52 2 62 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
        </svg>
      </div>

      {/* HOW IT WORKS TIMELINE (#how) */}
      <section className="px-5 py-4 flex flex-col gap-6 scroll-mt-20" id="how">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-[#ab2f00] font-semibold uppercase tracking-wider">
            The 3-Day Pipeline
          </span>
          <h2
            className="text-[2rem] leading-[2.35rem] text-[#201a16] tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            From idea to live in 72 hours.
          </h2>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative flex flex-col gap-6 pl-2">
          {/* Continuous Dotted Vertical Track */}
          <div className="absolute left-6 top-4 bottom-8 w-[2px] bg-[#e3bfb5]/60" />

          {/* DAY 00 */}
          <div className="relative flex items-start gap-4">
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#fed56b] text-[#765b00] flex items-center justify-center font-mono text-[11px] font-bold shadow-sm">
              00
            </div>
            <div className="flex-1 bg-[#f8ebe4] p-4 rounded-2xl shadow-sm flex flex-col gap-1.5 border border-[#e3bfb5]/30">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fed56b]/60 font-mono text-[10px] font-bold text-[#765b00]">
                  DAY 00
                </span>
                <span className="text-sm font-semibold text-[#201a16]">We talk</span>
              </div>
              <p className="text-xs text-[#5a4139] leading-relaxed">
                A friendly call or form. You tell us who you are and what you do. We check your domain
                and confirm the price — the whole thing is {formatPrice(BASE_PRICES.build, activeCurrency)}.
              </p>
            </div>
          </div>

          {/* DAY 01 */}
          <div className="relative flex items-start gap-4">
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#fed56b] text-[#765b00] flex items-center justify-center font-mono text-[11px] font-bold shadow-sm">
              01
            </div>
            <div className="flex-1 bg-[#f8ebe4] p-4 rounded-2xl shadow-sm flex flex-col gap-1.5 border border-[#e3bfb5]/30">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fed56b]/60 font-mono text-[10px] font-bold text-[#765b00]">
                  DAY 01
                </span>
                <span className="text-sm font-semibold text-[#201a16]">We build</span>
              </div>
              <p className="text-xs text-[#5a4139] leading-relaxed">
                Your website is written and designed. A private preview lands in your inbox, with a
                quick check: does this sound like you?
              </p>
            </div>
          </div>

          {/* DAY 02 */}
          <div className="relative flex items-start gap-4">
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#fed56b] text-[#765b00] flex items-center justify-center font-mono text-[11px] font-bold shadow-sm">
              02
            </div>
            <div className="flex-1 bg-[#f8ebe4] p-4 rounded-2xl shadow-sm flex flex-col gap-1.5 border border-[#e3bfb5]/30">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fed56b]/60 font-mono text-[10px] font-bold text-[#765b00]">
                  DAY 02
                </span>
                <span className="text-sm font-semibold text-[#201a16]">You refine</span>
              </div>
              <p className="text-xs text-[#5a4139] leading-relaxed">
                Tell us what to tweak. We polish the copy, connect your domain and email, and run the
                final checks.
              </p>
            </div>
          </div>

          {/* DAY 03 */}
          <div className="relative flex items-start gap-4">
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#44806a] text-white flex items-center justify-center font-mono text-[11px] font-bold shadow-sm">
              03
            </div>
            <div className="flex-1 bg-[#f3e6df] p-4 rounded-2xl shadow-sm flex flex-col gap-1.5 border border-[#e3bfb5]/40">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#b1f0d6] text-[#0e503e] font-mono text-[10px] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a6653]" />
                  DAY 03
                </span>
                <span className="text-sm font-semibold text-[#201a16]">You’re live</span>
              </div>
              <p className="text-xs text-[#5a4139] leading-relaxed">
                Your website is public, fast, and found on Google. We hand you the keys — and 7 days
                of free small tweaks are on the house.
              </p>
            </div>
          </div>
        </div>

        {/* Live Simulator Link */}
        <button
          onClick={() => onNavigate('pipeline')}
          className="self-center mt-2 px-5 py-2.5 rounded-full bg-[#f8ebe4] hover:bg-[#f3e6df] text-[#201a16] text-xs font-semibold flex items-center gap-2 border border-[#e3bfb5]/40 transition-colors"
        >
          <span className="material-symbols-outlined text-[#ab2f00] text-[18px]">
            hourglass_top
          </span>
          <span>Explore Live 72-Hour Pipeline Simulator</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </section>

      {/* S-LINE WHISK DIVIDER */}
      <div className="w-full flex justify-center py-7 text-[#e3bfb5]">
        <svg
          fill="none"
          height="24"
          viewBox="0 0 64 24"
          width="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12C12 22 22 2 32 12C42 22 52 2 62 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
        </svg>
      </div>

      {/* WHAT YOU GET (#what) */}
      <section className="px-5 py-4 flex flex-col gap-6 scroll-mt-20" id="what">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-[#ab2f00] font-semibold uppercase tracking-wider">
            Everything Included
          </span>
          <h2
            className="text-[2rem] leading-[2.35rem] text-[#201a16] tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            What you get.
          </h2>
          <p className="text-sm text-[#5a4139]">
            No surprises, no hidden line items. A complete presence ready for business.
          </p>
        </div>

        {/* Editorial Accent Callout */}
        <div className="p-6 rounded-2xl bg-[#f8ebe4] flex flex-col gap-2 text-center items-center justify-center shadow-xs border border-[#e3bfb5]/30">
          <span className="material-symbols-outlined text-[#ab2f00] text-[28px]">
            auto_awesome
          </span>
          <p
            className="text-[1.375rem] leading-snug text-[#201a16] font-normal italic"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            “No tech. No jargon. No guesswork.”
          </p>
        </div>

        {/* 2-Column Checklist Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            'Custom homepage + core pages (About, Services, Contact)',
            'Original copy written in your voice',
            'Clean, mobile-first design that looks intentional',
            'Working contact form + professional email on your domain',
            'Your domain — registered in your name, transferable',
            'Hosting, SSL, and basic SEO included',
            '7 days of free small tweaks after launch',
            'A real person to call — never a support bot',
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#fef1ea] flex items-start gap-3 border border-[#e3bfb5]/30 shadow-2xs"
            >
              <span className="material-symbols-outlined text-[#ab2f00] text-[20px] flex-shrink-0 mt-0.5">
                check_circle
              </span>
              <span className="text-xs text-[#201a16] font-medium leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING BAND (#pricing) - Dark Ink Surface */}
      <section
        className="mt-10 px-5 py-10 bg-[#201A16] text-[#FBF7F1] flex flex-col gap-6 scroll-mt-16 rounded-3xl mx-2 sm:mx-0 shadow-xl"
        id="pricing"
      >
        <div className="flex flex-col gap-2 text-center items-center">
          <span className="px-3 py-1 rounded-full bg-white/10 text-[#ffdf93] text-[11px] font-mono tracking-wider uppercase font-semibold">
            Clear Pricing
          </span>
          <h2
            className="text-[2.125rem] leading-[2.5rem] tracking-tight text-[#FBF7F1]"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            Simple, transparent rates.
          </h2>
          <p className="text-xs text-[#E5DACA]/80 max-w-sm">
            No monthly surprises or sneaky maintenance retainers. You own every pixel.
          </p>
        </div>

        {/* Pricing Cards Stack */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Build */}
          <div className="rounded-[20px] bg-[#FBF7F1] text-[#201A16] p-6 flex flex-col gap-4 shadow-lg border border-[#e3bfb5]/40">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase text-[#5a4139] font-bold">
                  One-Time
                </span>
                <h3
                  className="text-[1.75rem] font-bold text-[#201a16] tracking-tight"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Build
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#f8ebe4] text-[#201a16] font-mono text-[11px] font-bold border border-[#e3bfb5]/40">
                3-DAY TURNAROUND
              </span>
            </div>
            <p className="text-xs text-[#5a4139]">Your live website in 3 days.</p>

            {/* Dynamic Price Slot */}
            <div className="py-1 flex items-baseline gap-2">
              <span className="text-[2.25rem] leading-none font-bold text-[#201a16] tracking-tight font-mono">
                ≈ {formatPrice(BASE_PRICES.build, activeCurrency)} {activeCurrency}
              </span>
            </div>

            <div className="w-full h-[1px] bg-[#e3bfb5]/40 my-1" />

            <ul className="flex flex-col gap-2.5 text-[#201a16] text-xs">
              {[
                'Writing + design',
                'Your domain setup',
                'Hosting + SSL + SEO',
                'Email on your domain',
                '7 days of free tweaks',
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ab2f00] text-[18px]">
                    check
                  </span>
                  <span className="font-medium">{feat}</span>
                </li>
              ))}
            </ul>

            <a
              href="#quote"
              className="mt-2 min-h-[44px] py-3 px-6 rounded-full bg-[#ab2f00] hover:bg-[#862300] text-white text-sm font-semibold text-center shadow-md active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Get a free quote
            </a>
          </div>

          {/* Card 2: Care Plan */}
          <div className="relative rounded-[20px] bg-[#FBF7F1] text-[#201A16] p-6 flex flex-col gap-4 shadow-lg border border-[#e3bfb5]/40">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase text-[#5a4139] font-bold">
                  Annual Support
                </span>
                <h3
                  className="text-[1.75rem] font-bold text-[#201a16] tracking-tight"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Care Plan
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#fed56b] text-[#765b00] font-mono text-[11px] font-bold">
                RECOMMENDED
              </span>
            </div>
            <p className="text-xs text-[#5a4139]">
              We keep it hosted, backed up, updated, and secure.
            </p>

            {/* Dynamic Price Slot */}
            <div className="py-1 flex items-baseline gap-2">
              <span className="text-[2.25rem] leading-none font-bold text-[#201a16] tracking-tight font-mono">
                ≈ {formatPrice(BASE_PRICES.care, activeCurrency)} {activeCurrency}
              </span>
              <span className="text-xs text-[#5a4139]">/ year</span>
            </div>

            <div className="w-full h-[1px] bg-[#e3bfb5]/40 my-1" />

            <ul className="flex flex-col gap-2.5 text-[#201a16] text-xs">
              {[
                'Hosting + backups',
                'Updates + security',
                'Small content changes, on priority',
                'One email to “ask us”',
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ab2f00] text-[18px]">
                    check
                  </span>
                  <span className="font-medium">{feat}</span>
                </li>
              ))}
            </ul>

            <a
              href="#quote"
              className="mt-2 min-h-[44px] py-3 px-6 rounded-full bg-[#201a16] text-[#FBF7F1] text-sm font-semibold text-center hover:bg-black transition-colors flex items-center justify-center"
            >
              Get a free quote
            </a>
          </div>
        </div>

        {/* Notes & Currency Disclosure */}
        <div className="flex flex-col gap-1.5 text-center items-center text-[#E5DACA]/70 text-xs pt-1">
          <p>
            Most clients take both. Prices are in USD — shown in your currency, and you're charged in
            the one you choose.
          </p>
          <p className="text-[11px] text-[#ffdf93]/90 font-mono">
            Prices shown in {activeCurrency} — change it anytime in the menu above.
          </p>
        </div>
      </section>

      {/* FAQ SECTION (#faq) */}
      <section className="px-5 py-10 flex flex-col gap-6 scroll-mt-20" id="faq">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-[#ab2f00] font-semibold uppercase tracking-wider">
            Common Questions
          </span>
          <h2
            className="text-[2rem] leading-[2.35rem] text-[#201a16] tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            Everything you might wonder.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-2.5">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#f8ebe4] overflow-hidden transition-all shadow-2xs border border-[#e3bfb5]/30"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left gap-4 hover:bg-[#f3e6df]/50 transition-colors"
                >
                  <span className="text-[1.05rem] font-semibold text-[#201a16] leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#5a4139] text-[20px] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-[#5a4139] text-xs leading-relaxed animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* GET A FREE QUOTE (#quote) */}
      <section
        className="px-5 py-10 bg-[#f3e6df] rounded-t-3xl flex flex-col gap-6 scroll-mt-16 border-t border-[#e3bfb5]/40"
        id="quote"
      >
        <div className="flex flex-col gap-1 text-center items-center">
          <span className="text-xs font-mono text-[#ab2f00] font-semibold uppercase tracking-wider">
            Fast Intake
          </span>
          <h2
            className="text-[2.25rem] leading-[2.6rem] text-[#201a16] tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            Get a{' '}
            <span className="relative inline-block text-[#ab2f00]">
              free
              <svg
                className="absolute -bottom-1 left-0 w-full text-[#ab2f00]"
                fill="none"
                height="7"
                preserveAspectRatio="none"
                viewBox="0 0 80 7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5C18 1.8 55 1.5 78 4.2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
            </span>{' '}
            quote
          </h2>
          <p className="text-xs text-[#5a4139] max-w-sm">
            Tell us a little about your business. A real person replies within 24 hours with a plan
            and the exact price.
          </p>
        </div>

        {/* Intake Form */}
        <div className="bg-[#f8ebe4] p-6 rounded-[20px] shadow-sm flex flex-col gap-4 border border-[#e3bfb5]/40">
          {!isSubmitted ? (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              {/* Honeypot: invisible to humans, auto-filled by bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="form-botcheck">Leave this field empty</label>
                <input
                  id="form-botcheck"
                  ref={botcheckRef}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#201a16]" htmlFor="form-name">
                  Name*
                </label>
                <input
                  id="form-name"
                  type="text"
                  required
                  placeholder="Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-[#fff8f5] text-[#201a16] placeholder:text-[#5a4139]/60 focus:outline-none focus:ring-2 focus:ring-[#ab2f00] shadow-xs text-sm border border-[#e3bfb5]/40"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#201a16]" htmlFor="form-email">
                  Email*
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-[#fff8f5] text-[#201a16] placeholder:text-[#5a4139]/60 focus:outline-none focus:ring-2 focus:ring-[#ab2f00] shadow-xs text-sm border border-[#e3bfb5]/40"
                />
              </div>

              {/* What do you do */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#201a16]" htmlFor="form-profession">
                  What do you do?*
                </label>
                <input
                  id="form-profession"
                  type="text"
                  required
                  placeholder="Independent Pilates instructor & studio owner"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-[#fff8f5] text-[#201a16] placeholder:text-[#5a4139]/60 focus:outline-none focus:ring-2 focus:ring-[#ab2f00] shadow-xs text-sm border border-[#e3bfb5]/40"
                />
              </div>

              {/* City & Country */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#201a16]" htmlFor="form-location">
                  City & country
                </label>
                <input
                  id="form-location"
                  type="text"
                  placeholder="Austin, TX, United States"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-[#fff8f5] text-[#201a16] placeholder:text-[#5a4139]/60 focus:outline-none focus:ring-2 focus:ring-[#ab2f00] shadow-xs text-sm border border-[#e3bfb5]/40"
                />
              </div>

              {/* Domain you'd like */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#201a16]" htmlFor="form-domain">
                    Domain you'd like (optional)
                  </label>
                  {domainChecking && (
                    <span className="text-[10px] font-mono text-[#5a4139] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ab2f00] animate-ping" />
                      Checking...
                    </span>
                  )}
                </div>
                <input
                  id="form-domain"
                  type="text"
                  placeholder="sarahpilates.com"
                  value={domain}
                  onChange={(e) => handleDomainChange(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-[#fff8f5] text-[#201a16] placeholder:text-[#5a4139]/60 focus:outline-none focus:ring-2 focus:ring-[#ab2f00] shadow-xs text-sm border border-[#e3bfb5]/40"
                />
                {domainStatus && (
                  <p className="text-[11px] font-mono text-[#0e503e] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    {domainStatus}
                  </p>
                )}
              </div>

              {/* Textarea: Anything else */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#201a16]" htmlFor="form-details">
                  Anything else (optional)
                </label>
                <textarea
                  id="form-details"
                  rows={3}
                  placeholder="Tell us if you already have photos, colors, or existing sites you love..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="p-4 rounded-xl bg-[#fff8f5] text-[#201a16] placeholder:text-[#5a4139]/60 focus:outline-none focus:ring-2 focus:ring-[#ab2f00] shadow-xs text-sm resize-none border border-[#e3bfb5]/40"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="mt-1 min-h-[48px] px-8 py-3.5 rounded-full bg-[#ab2f00] hover:bg-[#862300] disabled:hover:bg-[#ab2f00] text-white text-[15px] font-semibold shadow-md active:scale-[0.98] disabled:active:scale-100 disabled:opacity-70 disabled:cursor-wait transition-all flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send my request</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>

              {submitError && (
                <p className="text-xs text-[#7c2d12] bg-[#fde8e0] border border-[#f3c1b1] rounded-lg px-3 py-2.5">
                  Something went wrong sending your request — please try again, or email us
                  directly at{' '}
                  <a
                    href="mailto:hello@whisk.one"
                    className="font-semibold underline underline-offset-2"
                  >
                    hello@whisk.one
                  </a>
                  .
                </p>
              )}
            </form>
          ) : (
            /* Feedback Confirmation Container */
            <div className="py-8 px-4 flex flex-col items-center text-center gap-3 bg-[#fff8f5] rounded-xl border border-[#b1f0d6]">
              <div className="w-12 h-12 rounded-full bg-[#b1f0d6] text-[#0e503e] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">task_alt</span>
              </div>
              <h3 className="text-lg text-[#201a16] font-semibold font-['Fraunces']">
                Request Received!
              </h3>
              <p className="text-xs text-[#5a4139] max-w-xs leading-relaxed">
                Thanks {name || 'there'} — a real person will reply within 24 hours with your plan
                and confirmation.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => onNavigate('pipeline')}
                  className="px-5 py-2.5 rounded-full bg-[#ab2f00] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                  Track in 72h Pipeline
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2.5 rounded-full bg-[#f8ebe4] text-xs font-semibold text-[#5a4139]"
                >
                  Submit another inquiry
                </button>
              </div>
            </div>
          )}

          {/* Human Contact Direct Link */}
          <div className="pt-2 border-t border-[#e3bfb5]/30 flex items-center justify-center text-center">
            <p className="text-xs text-[#5a4139]">
              Prefer to talk?{' '}
              <a
                href="mailto:hello@whisk.one"
                className="font-semibold text-[#ab2f00] underline underline-offset-4"
              >
                hello@whisk.one
              </a>{' '}
              — we answer within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#201A16] text-[#FBF7F1] px-5 pt-10 pb-16 flex flex-col gap-6 mt-6 rounded-3xl mx-2 sm:mx-0">
        <div className="flex flex-col gap-2">
          <div className="relative inline-block w-fit">
            <span
              className="text-[1.75rem] leading-none font-bold tracking-tight text-[#FBF7F1]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Whisk
            </span>
            <svg
              className="absolute -bottom-1.5 right-0 text-[#ab2f00]"
              fill="none"
              height="7"
              viewBox="0 0 28 6"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5C6.5 1.5 19 0.5 27 3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <p className="text-xs text-[#E5DACA]/90 mt-1">Done-for-you websites, live in 3 days.</p>
        </div>

        <div className="flex flex-col gap-1 text-[#E5DACA]/70 text-xs">
          <p>Whisk is operated by Vyker Services FZ LLC.</p>
          <p className="text-[11px] leading-tight">
            All prices dynamically displayed in your selected local currency based on mid-market
            benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setLegalDoc('privacy')}
            className="text-[#FBF7F1] underline underline-offset-4 hover:text-[#fed56b]"
            type="button"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setLegalDoc('terms')}
            className="text-[#FBF7F1] underline underline-offset-4 hover:text-[#fed56b]"
            type="button"
          >
            Terms of Service
          </button>
        </div>

        <div className="pt-2">
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#fed56b] tracking-wider uppercase">
            Built by our own 3-day pipeline.
          </span>
        </div>
      </footer>

      {/* Legal Docs Modal */}
      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>
  );
};
