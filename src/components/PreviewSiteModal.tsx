import React, { useState } from 'react';
import { ShowcaseSample } from '../data/whiskData';

interface PreviewSiteModalProps {
  sample: ShowcaseSample | null;
  onClose: () => void;
  onSelectForQuote?: (sample: ShowcaseSample) => void;
}

export const PreviewSiteModal: React.FC<PreviewSiteModalProps> = ({
  sample,
  onClose,
  onSelectForQuote,
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'about' | 'contact'>('home');
  const [contactSent, setContactSent] = useState(false);

  if (!sample) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#fff8f5] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#e3bfb5]/50 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#201a16] text-[#fbf7f1] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#ab2f00]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm font-['Fraunces'] tracking-tight">
                {sample.name} · Live Preview
              </span>
              <span className="text-[11px] font-mono text-[#e5daca]/70">
                https://{sample.domain} · Built in 72 hours
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Toggle */}
            <div className="hidden sm:flex bg-white/10 rounded-full p-0.5">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                  deviceMode === 'mobile' ? 'bg-white text-[#201a16]' : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">smartphone</span>
                Mobile
              </button>
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                  deviceMode === 'desktop' ? 'bg-white text-[#201a16]' : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">laptop</span>
                Desktop
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close preview"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Browser Mockup Canvas */}
        <div className="flex-1 bg-[#ede0d9]/40 p-3 sm:p-6 overflow-y-auto flex justify-center items-start">
          <div
            className={`w-full bg-[#fff8f5] shadow-xl rounded-2xl border border-[#e3bfb5] transition-all duration-300 overflow-hidden flex flex-col ${
              deviceMode === 'mobile' ? 'max-w-sm min-h-[580px]' : 'max-w-3xl min-h-[640px]'
            }`}
          >
            {/* Website Sub-Header */}
            <header className="px-5 py-4 border-b border-[#e3bfb5]/40 flex items-center justify-between bg-[#fff8f5]/80 backdrop-blur-sm sticky top-0 z-10">
              <div className="font-bold text-lg text-[#201a16] font-['Fraunces']">
                {sample.name}
              </div>
              <nav className="flex items-center gap-3 text-xs font-medium text-[#5a4139]">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`hover:text-[#ab2f00] ${activeTab === 'home' ? 'text-[#ab2f00] font-semibold underline' : ''}`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`hover:text-[#ab2f00] ${activeTab === 'menu' ? 'text-[#ab2f00] font-semibold underline' : ''}`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`hover:text-[#ab2f00] ${activeTab === 'about' ? 'text-[#ab2f00] font-semibold underline' : ''}`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`hover:text-[#ab2f00] ${activeTab === 'contact' ? 'text-[#ab2f00] font-semibold underline' : ''}`}
                >
                  Contact
                </button>
              </nav>
            </header>

            {/* Inner Content based on active tab */}
            <div className="p-5 flex flex-col gap-6 text-[#201a16]">
              {activeTab === 'home' && (
                <>
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#ab2f00]">
                      {sample.type} · {sample.location}
                    </span>
                    <h2 className="text-2xl font-bold font-['Fraunces'] leading-tight">
                      {sample.heroHeadline}
                    </h2>
                    <p className="text-xs text-[#5a4139] leading-relaxed">
                      {sample.heroDescription}
                    </p>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-sm">
                    <img
                      src={sample.image}
                      alt={sample.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-medium">
                        {sample.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#201a16] font-mono">
                      Highlights
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {sample.features.map((feat, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-[#f8ebe4] flex items-center gap-2.5 text-xs font-medium"
                        >
                          <span className="material-symbols-outlined text-[#ab2f00] text-[16px]">
                            check_circle
                          </span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#201a16] text-[#fbf7f1] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex flex-col text-center sm:text-left">
                      <span className="text-xs font-semibold">Ready to visit or book?</span>
                      <span className="text-[11px] text-[#e5daca]/70">{sample.hours}</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="px-4 py-2 rounded-full bg-[#ab2f00] text-white text-xs font-semibold hover:bg-[#d2420e] transition-colors"
                    >
                      Get in Touch
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'menu' && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold font-['Fraunces']">Offerings & Pricing</h3>
                  <div className="space-y-3">
                    {sample.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-[#e3bfb5]/60 bg-[#fef1ea] flex justify-between items-center"
                      >
                        <div>
                          <div className="font-semibold text-xs text-[#201a16]">{feat}</div>
                          <div className="text-[11px] text-[#5a4139]">
                            Crafted with care · Certified organic
                          </div>
                        </div>
                        <span className="font-mono font-bold text-xs text-[#ab2f00]">
                          ${35 + idx * 25}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold font-['Fraunces']">Our Story</h3>
                  <p className="text-xs text-[#5a4139] leading-relaxed">
                    Founded in {sample.location}, {sample.name} started with a simple belief:
                    delivering genuine, master-grade hospitality without shortcuts.
                  </p>
                  <p className="text-xs text-[#5a4139] leading-relaxed">
                    Every detail of our space, our schedule, and our service is designed to give you
                    an unhurried, exceptional experience.
                  </p>
                  <div className="mt-2 p-3 bg-[#f8ebe4] rounded-xl text-xs font-mono text-[#5a4139]">
                    📍 {sample.location} · 📞 {sample.phone}
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold font-['Fraunces']">Contact & Inquiries</h3>
                  {contactSent ? (
                    <div className="p-4 bg-[#b1f0d6]/50 border border-[#2a6653]/30 rounded-xl text-center">
                      <span className="material-symbols-outlined text-[#0e503e] text-[24px]">
                        check_circle
                      </span>
                      <p className="text-xs font-semibold text-[#0e503e] mt-1">
                        Message sent successfully!
                      </p>
                      <p className="text-[11px] text-[#5a4139]">We will get back to you shortly.</p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setContactSent(true);
                      }}
                      className="space-y-2"
                    >
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        className="w-full text-xs p-2.5 rounded-lg bg-[#f8ebe4] border border-[#e3bfb5]/40"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Your Email"
                        className="w-full text-xs p-2.5 rounded-lg bg-[#f8ebe4] border border-[#e3bfb5]/40"
                      />
                      <textarea
                        required
                        rows={2}
                        placeholder="How can we help?"
                        className="w-full text-xs p-2.5 rounded-lg bg-[#f8ebe4] border border-[#e3bfb5]/40 resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-[#ab2f00] text-white text-xs font-semibold shadow-sm"
                      >
                        Send Inquiry
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto px-5 py-3 border-t border-[#e3bfb5]/40 text-center text-[10px] text-[#5a4139]/70 bg-[#f8ebe4]/50">
              © {new Date().getFullYear()} {sample.name}. All rights reserved.
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-[#fff8f5] border-t border-[#e3bfb5]/40 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#5a4139] text-center sm:text-left">
            Want a website with this same polished design and bespoke copy?
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-[#f8ebe4] text-xs font-medium hover:bg-[#ede0d9]"
            >
              Close
            </button>
            {onSelectForQuote && (
              <button
                onClick={() => {
                  onSelectForQuote(sample);
                  onClose();
                }}
                className="px-5 py-2 rounded-full bg-[#ab2f00] text-white text-xs font-semibold hover:bg-[#d2420e] shadow-sm flex items-center gap-1.5"
              >
                <span>Get a Site Like This</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
