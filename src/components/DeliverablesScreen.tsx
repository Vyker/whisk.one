import React, { useState } from 'react';

export const DeliverablesScreen: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDownloadVault = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Generate clean client bundle text file
      const bundleContent = `================================================
WHISK — DONE-FOR-YOU WEBSITES · 3-DAY PIPELINE
OFFICIAL CLIENT DELIVERABLES & HANDOVER VAULT
================================================

PROJECT: Sarah Jenkins Pilates
DOMAIN: https://sarahpilates.com
STATUS: Live & Verified
LAUNCH DATE: 2026-09-29
REGISTERED REGISTRAR: Spaceship (Registrar of Record - Transferrable)
EPP AUTH CODE: WHISK-EPP-98421-SARAH (sample - your real code is delivered at launch)

------------------------------------------------
1. BRAND ASSETS & DESIGN TOKENS
------------------------------------------------
Display Font: 'Fraunces' (Google Fonts, Open Font License)
Body Font: 'Inter' (Google Fonts, Open Font License)
Data/Mono Font: 'IBM Plex Mono'

Color Palette:
- Terracotta Ember: #AB2F00
- Warm Butter Gold: #FED56B
- Deep Sage Green: #2A6653
- Cream Linen Background: #FFF8F5
- Deep Ink Black: #201A16

------------------------------------------------
2. PROFESSIONAL EMAIL CREDENTIALS
------------------------------------------------
Email: hello@sarahpilates.com
Webmail: https://webmail.whisk.one
IMAP Server: mail.sarahpilates.com (Port 993, SSL/TLS)
SMTP Server: mail.sarahpilates.com (Port 465, SSL/TLS)

------------------------------------------------
3. SEO & SEARCH CONSOLE STATUS
------------------------------------------------
Sitemap: https://sarahpilates.com/sitemap.xml
Robots: https://sarahpilates.com/robots.txt
Google Search Console: Verified via DNS TXT Record

------------------------------------------------
4. 7-DAY POST-LAUNCH WARRANTY
------------------------------------------------
Free unlimited minor tweaks valid through: October 06, 2026.
Email: hello@whisk.one
Emergency Support: +1 (800) 555-WHISK
================================================`;

      const blob = new Blob([bundleContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'whisk-deliverables-sarahpilates.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full text-[#201a16] pb-24 max-w-2xl mx-auto px-5 pt-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#fed56b]/40">
          <span className="w-2 h-2 rounded-full bg-[#ab2f00]" />
          <span className="text-[11px] font-mono uppercase text-[#201a16] tracking-wider font-semibold">
            Handover & Asset Vault
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1
              className="text-[2.25rem] leading-[2.6rem] text-[#201a16] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              Your Deliverables
            </h1>
            <p className="text-xs text-[#5a4139] mt-0.5">
              Everything built for your business. You own 100% of every asset.
            </p>
          </div>
          <button
            onClick={handleDownloadVault}
            disabled={downloading}
            className="px-5 py-2.5 rounded-full bg-[#ab2f00] hover:bg-[#862300] text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloading ? 'sync' : 'download'}
            </span>
            <span>{downloading ? 'Compiling Vault...' : 'Download Vault (.txt)'}</span>
          </button>
        </div>
      </div>

      {/* Vault Assets Grid */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Item 1: Source Code & Production Bundle */}
        <div className="p-5 rounded-2xl bg-[#f8ebe4] border border-[#e3bfb5]/40 flex flex-col gap-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fed56b] text-[#765b00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">code</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#201a16]">
                  Production Website Code Bundle
                </span>
                <span className="text-[11px] text-[#5a4139]">
                  Clean static HTML5, CSS, and modern framework code. Zero vendor lock-in.
                </span>
              </div>
            </div>
            <button
              onClick={handleDownloadVault}
              className="text-xs font-semibold text-[#ab2f00] hover:underline"
            >
              Export
            </button>
          </div>
        </div>

        {/* Item 2: Brand Identity Kit */}
        <div className="p-5 rounded-2xl bg-[#f8ebe4] border border-[#e3bfb5]/40 flex flex-col gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbd1] text-[#ab2f00] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">palette</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#201a16]">Brand Identity & Swatches</span>
              <span className="text-[11px] text-[#5a4139]">
                Typography specifications, color hex codes, and SVG logo files.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1">
            <div className="flex flex-col items-center p-2 rounded-xl bg-[#fff8f5] border border-[#e3bfb5]/30">
              <div className="w-6 h-6 rounded-full bg-[#ab2f00] shadow-2xs mb-1" />
              <span className="text-[10px] font-mono font-bold text-[#201a16]">#AB2F00</span>
              <span className="text-[9px] text-[#5a4139]">Terracotta</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-[#fff8f5] border border-[#e3bfb5]/30">
              <div className="w-6 h-6 rounded-full bg-[#fed56b] shadow-2xs mb-1" />
              <span className="text-[10px] font-mono font-bold text-[#201a16]">#FED56B</span>
              <span className="text-[9px] text-[#5a4139]">Gold Butter</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-[#fff8f5] border border-[#e3bfb5]/30">
              <div className="w-6 h-6 rounded-full bg-[#2a6653] shadow-2xs mb-1" />
              <span className="text-[10px] font-mono font-bold text-[#201a16]">#2A6653</span>
              <span className="text-[9px] text-[#5a4139]">Deep Sage</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-[#fff8f5] border border-[#e3bfb5]/30">
              <div className="w-6 h-6 rounded-full bg-[#201a16] shadow-2xs mb-1" />
              <span className="text-[10px] font-mono font-bold text-[#201a16]">#201A16</span>
              <span className="text-[9px] text-[#5a4139]">Earthen Ink</span>
            </div>
          </div>
        </div>

        {/* Item 3: Domain Ownership Key & Certificate */}
        <div className="p-5 rounded-2xl bg-[#f8ebe4] border border-[#e3bfb5]/40 flex flex-col gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b1f0d6] text-[#0e503e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">badge</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#201a16]">
                Domain Transfer Authorization (EPP Code)
              </span>
              <span className="text-[11px] text-[#5a4139]">
                Transfer your domain anytime to GoDaddy, Spaceship, or Namecheap. (Sample data shown.)
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#fff8f5] rounded-xl flex items-center justify-between text-xs font-mono border border-[#e3bfb5]/30">
            <span>EPP: WHISK-EPP-98421-SARAH</span>
            <button
              onClick={() => handleCopy('WHISK-EPP-98421-SARAH', 'epp')}
              className="text-[#ab2f00] font-semibold flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedCode === 'epp' ? 'check' : 'content_copy'}
              </span>
              <span>{copiedCode === 'epp' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Item 4: Google Indexing & SEO Setup */}
        <div className="p-5 rounded-2xl bg-[#f8ebe4] border border-[#e3bfb5]/40 flex flex-col gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ede0d9] text-[#201a16] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">travel_explore</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#201a16]">
                SEO & Google Search Console Package
              </span>
              <span className="text-[11px] text-[#5a4139]">
                Live XML sitemap, mobile robots.txt, and canonical meta tags installed.
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-mono text-[#5a4139]">
            <div className="p-2.5 bg-[#fff8f5] rounded-lg flex items-center justify-between">
              <span>https://sarahpilates.com/sitemap.xml</span>
              <span className="text-[#2a6653] font-bold">200 OK</span>
            </div>
            <div className="p-2.5 bg-[#fff8f5] rounded-lg flex items-center justify-between">
              <span>https://sarahpilates.com/robots.txt</span>
              <span className="text-[#2a6653] font-bold">Optimized</span>
            </div>
          </div>
        </div>

        {/* Item 5: 7-Day Guarantee Certificate */}
        <div className="p-5 rounded-2xl bg-[#201A16] text-[#FBF7F1] flex flex-col gap-3 shadow-lg border border-[#e3bfb5]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fed56b] text-[#765b00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white">
                  7-Day On-The-House Tweak Warranty
                </span>
                <span className="text-[11px] text-[#e5daca]/80">
                  Full coverage for copy, photos, and links through October 06, 2026.
                </span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#fed56b] font-mono">
            <span>Direct WhatsApp & Call Support Included</span>
            <span>Policy #WHK-7D-2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
