import React, { useState } from 'react';
import { INITIAL_TWEAKS } from '../data/whiskData';
import { TweakRequest } from '../types';

interface PortalScreenProps {
  onNavigateTab: (tab: 'overview' | 'pipeline' | 'portal' | 'deliverables') => void;
}

export const PortalScreen: React.FC<PortalScreenProps> = ({ onNavigateTab }) => {
  const [tweaks, setTweaks] = useState<TweakRequest[]>(INITIAL_TWEAKS);
  const [showTweakModal, setShowTweakModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPage, setNewPage] = useState('Homepage');
  const [newDesc, setNewDesc] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleAddTweak = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const tweak: TweakRequest = {
      id: `twk-${Date.now()}`,
      title: newTitle,
      page: newPage,
      description: newDesc,
      priority: 'medium',
      status: 'pending',
      createdAt: 'Just now',
    };

    setTweaks([tweak, ...tweaks]);
    setNewTitle('');
    setNewDesc('');
    setShowTweakModal(false);
  };

  const handleCopyDns = () => {
    navigator.clipboard?.writeText?.('A 76.76.21.21\nCNAME cname.whisk.app');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full text-[#201a16] pb-24 max-w-2xl mx-auto px-5 pt-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#b1f0d6]">
          <span className="w-2 h-2 rounded-full bg-[#2a6653]" />
          <span className="text-[11px] font-mono uppercase text-[#0e503e] tracking-wider font-semibold">
            Site Status: Live & Secure
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-[2.25rem] leading-[2.6rem] text-[#201a16] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              Sarah's Pilates
            </h1>
            <p className="text-xs font-mono text-[#5a4139] mt-0.5">
              https://sarahpilates.com
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('deliverables')}
            className="px-3.5 py-1.5 rounded-full bg-[#f8ebe4] text-xs font-semibold text-[#201a16] hover:bg-[#f3e6df] border border-[#e3bfb5]/40 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">folder_open</span>
            Vault
          </button>
        </div>
      </div>

      {/* Traffic & Uptime Stats Strip */}
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-[#f8ebe4] border border-[#e3bfb5]/30 flex flex-col">
          <span className="text-[11px] font-mono text-[#5a4139]">Monthly Visitors</span>
          <span className="text-xl font-bold font-mono text-[#201a16] mt-0.5">1,420</span>
          <span className="text-[10px] text-[#2a6653] font-semibold mt-1">↑ +24% vs last wk</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#f8ebe4] border border-[#e3bfb5]/30 flex flex-col">
          <span className="text-[11px] font-mono text-[#5a4139]">Inquiries Sent</span>
          <span className="text-xl font-bold font-mono text-[#201a16] mt-0.5">34</span>
          <span className="text-[10px] text-[#2a6653] font-semibold mt-1">Direct to email</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#f8ebe4] border border-[#e3bfb5]/30 flex flex-col">
          <span className="text-[11px] font-mono text-[#5a4139]">CDN Uptime</span>
          <span className="text-xl font-bold font-mono text-[#201a16] mt-0.5">99.98%</span>
          <span className="text-[10px] text-[#2a6653] font-semibold mt-1">Global edge SSL</span>
        </div>
      </div>

      {/* Domain & Business Email Cards */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Domain Card */}
        <div className="p-4 rounded-2xl bg-[#fef1ea] border border-[#e3bfb5]/40 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-[#ab2f00]">
                Registered Domain
              </span>
              <span className="material-symbols-outlined text-[#2a6653] text-[18px]">verified</span>
            </div>
            <span className="text-base font-bold font-mono text-[#201a16]">sarahpilates.com</span>
            <span className="text-[11px] text-[#5a4139]">
              Registered in your name · Renews Oct 2027
            </span>
          </div>
          <button
            onClick={handleCopyDns}
            className="mt-3 py-1.5 px-3 rounded-lg bg-[#fff8f5] text-[11px] font-mono font-medium text-[#201a16] border border-[#e3bfb5]/40 flex items-center justify-between hover:bg-[#f8ebe4]"
          >
            <span>{isCopied ? 'DNS Copied to Clipboard!' : 'Copy DNS Pointers'}</span>
            <span className="material-symbols-outlined text-[14px]">
              {isCopied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>

        {/* Business Email Card */}
        <div className="p-4 rounded-2xl bg-[#fef1ea] border border-[#e3bfb5]/40 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-[#ab2f00]">
                Business Email
              </span>
              <span className="material-symbols-outlined text-[#2a6653] text-[18px]">mail</span>
            </div>
            <span className="text-base font-bold font-mono text-[#201a16]">
              hello@sarahpilates.com
            </span>
            <span className="text-[11px] text-[#5a4139]">
              Forwarding active to personal inbox + Webmail
            </span>
          </div>
          <a
            href="mailto:hello@sarahpilates.com"
            className="mt-3 py-1.5 px-3 rounded-lg bg-[#fff8f5] text-[11px] font-mono font-medium text-[#201a16] border border-[#e3bfb5]/40 flex items-center justify-between hover:bg-[#f8ebe4]"
          >
            <span>Launch Webmail Portal</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>

      {/* Free Tweaks & Care Plan Management */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-lg font-bold text-[#201a16]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Post-Launch Tweak Desk
            </h2>
            <p className="text-xs text-[#5a4139]">
              7 days of free tweaks active · Handled within 4 hours
            </p>
          </div>
          <button
            onClick={() => setShowTweakModal(true)}
            className="px-4 py-2 rounded-full bg-[#ab2f00] hover:bg-[#862300] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Request Tweak
          </button>
        </div>

        {/* Tweaks List */}
        <div className="space-y-2">
          {tweaks.map((twk) => (
            <div
              key={twk.id}
              className="p-3.5 rounded-xl bg-[#f8ebe4] border border-[#e3bfb5]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#201a16]">{twk.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#fff8f5] text-[#5a4139]">
                    {twk.page}
                  </span>
                </div>
                <p className="text-[11px] text-[#5a4139] mt-0.5">{twk.description}</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    twk.status === 'completed'
                      ? 'bg-[#b1f0d6] text-[#0e503e]'
                      : 'bg-[#fed56b] text-[#765b00]'
                  }`}
                >
                  {twk.status === 'completed' ? '✓ Applied' : 'Pending'}
                </span>
                <span className="text-[10px] text-[#5a4139]/70">{twk.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Care Plan Banner */}
      <div className="mt-6 p-5 rounded-2xl bg-[#201a16] text-[#fbf7f1] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-[#e3bfb5]/20">
        <div className="flex flex-col text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="px-2 py-0.5 rounded bg-[#fed56b] text-[#765b00] text-[10px] font-mono font-bold">
              ACTIVE
            </span>
            <span className="text-xs font-mono text-[#e5daca]/80">Care Plan Subscription</span>
          </div>
          <span
            className="text-lg font-bold text-white mt-1"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Annual Security & Unlimited Minor Tweaks
          </span>
          <span className="text-xs text-[#e5daca]/70 mt-0.5">
            Automatic weekly cloud backups, uptime monitoring, and priority email.
          </span>
        </div>
        <button
          onClick={() => alert('Care plan is active. To modify billing or payment method, email hello@whisk.app.')}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold whitespace-nowrap transition-colors"
        >
          Manage Plan
        </button>
      </div>

      {/* Tweak Request Modal */}
      {showTweakModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowTweakModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#fff8f5] p-6 rounded-2xl shadow-2xl border border-[#e3bfb5]/40 flex flex-col gap-4 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-[#e3bfb5]/30">
              <span
                className="text-lg font-bold text-[#201a16]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Submit a Quick Tweak
              </span>
              <button
                onClick={() => setShowTweakModal(false)}
                className="w-8 h-8 rounded-full bg-[#f8ebe4] flex items-center justify-center text-[#201a16]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddTweak} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#201a16]">Tweak Title</label>
                <input
                  required
                  placeholder="e.g. Update pricing on class packages"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="h-10 px-3 rounded-xl bg-[#f8ebe4] text-xs text-[#201a16] focus:outline-none focus:ring-2 focus:ring-[#ab2f00]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#201a16]">Target Page</label>
                <select
                  value={newPage}
                  onChange={(e) => setNewPage(e.target.value)}
                  className="h-10 px-3 rounded-xl bg-[#f8ebe4] text-xs text-[#201a16] focus:outline-none focus:ring-2 focus:ring-[#ab2f00]"
                >
                  <option value="Homepage">Homepage</option>
                  <option value="About Page">About Page</option>
                  <option value="Services / Classes">Services / Classes</option>
                  <option value="Contact / Booking">Contact / Booking</option>
                  <option value="Footer / Header">Footer / Header</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#201a16]">Description & Specifics</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Please describe exactly what you want changed..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="p-3 rounded-xl bg-[#f8ebe4] text-xs text-[#201a16] focus:outline-none focus:ring-2 focus:ring-[#ab2f00] resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-3 rounded-full bg-[#ab2f00] text-white text-xs font-semibold shadow-md active:scale-95 transition-transform"
              >
                Send Tweak Request (Est. &lt; 4 Hours)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
