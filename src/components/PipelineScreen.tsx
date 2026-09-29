import React, { useState } from 'react';
import { QuoteRequest } from '../types';

interface PipelineScreenProps {
  currentProject: QuoteRequest | null;
  onNavigateTab: (tab: 'overview' | 'pipeline' | 'portal' | 'deliverables') => void;
}

export const PipelineScreen: React.FC<PipelineScreenProps> = ({
  currentProject,
  onNavigateTab,
}) => {
  const [selectedDay, setSelectedDay] = useState<0 | 1 | 2 | 3>(1);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [tweakText, setTweakText] = useState('');
  const [tweakSubmitted, setTweakSubmitted] = useState(false);

  const projectName = currentProject?.name ? `${currentProject.name}'s Studio` : 'Sarah Jenkins Pilates';
  const projectDomain = currentProject?.domain || 'sarahpilates.com';
  const projectProfession = currentProject?.profession || 'Independent Pilates instructor & studio owner';

  const stages = [
    {
      day: 0 as const,
      num: '00',
      title: 'We talk & verify',
      status: 'Completed',
      time: 'Day 00 · Hour 0-24',
      badgeClass: 'bg-[#fed56b] text-[#765b00]',
      desc: 'Intake answers gathered, target domain locked, initial aesthetic palette and sitemap outlined.',
    },
    {
      day: 1 as const,
      num: '01',
      title: 'We build & write',
      status: 'Ready for Review',
      time: 'Day 01 · Hour 24-48',
      badgeClass: 'bg-[#ab2f00] text-white',
      desc: 'All copy written in your natural tone, custom responsive layout created, mobile optimization applied.',
    },
    {
      day: 2 as const,
      num: '02',
      title: 'You refine',
      status: 'In Progress',
      time: 'Day 02 · Hour 48-60',
      badgeClass: 'bg-[#f8ebe4] text-[#5a4139]',
      desc: 'Private preview delivered. You submit copy adjustments, we connect business email and DNS.',
    },
    {
      day: 3 as const,
      num: '03',
      title: 'You’re live',
      status: 'Scheduled',
      time: 'Day 03 · Hour 60-72',
      badgeClass: 'bg-[#b1f0d6] text-[#0e503e]',
      desc: 'SSL certificate issued, Google Search Console indexing pinged, keys handed over with 7 days free tweaks.',
    },
  ];

  return (
    <div className="flex flex-col w-full text-[#201a16] pb-24 max-w-2xl mx-auto px-5 pt-4">
      {/* Header Badge & Title */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#fed56b]/40">
          <span className="w-2 h-2 rounded-full bg-[#ab2f00] animate-pulse" />
          <span className="text-[11px] font-mono uppercase text-[#201a16] tracking-wider font-semibold">
            Live 72-Hour Pipeline Tracker
          </span>
        </div>
        <h1
          className="text-[2.25rem] leading-[2.6rem] text-[#201a16] tracking-tight"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
        >
          {projectName}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5a4139]">
          <span className="font-semibold text-[#ab2f00]">https://{projectDomain}</span>
          <span>·</span>
          <span>{projectProfession}</span>
        </div>
      </div>

      {/* Countdown Card */}
      <div className="mt-5 p-5 rounded-2xl bg-[#201a16] text-[#fbf7f1] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-[#e3bfb5]/20">
        <div className="flex flex-col text-center sm:text-left">
          <span className="text-[11px] font-mono uppercase text-[#fed56b] font-bold">
            Guaranteed Go-Live Clock
          </span>
          <span
            className="text-3xl font-bold font-mono tracking-tight text-white mt-0.5"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            48h 12m remaining
          </span>
          <span className="text-xs text-[#e5daca]/70 mt-1">
            Target launch: Thursday 11:00 AM UTC
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full border-4 border-[#fed56b] flex flex-col items-center justify-center bg-white/5">
            <span className="text-sm font-bold font-mono text-[#fed56b]">66%</span>
            <span className="text-[8px] text-[#e5daca]/80 uppercase">Done</span>
          </div>
        </div>
      </div>

      {/* Pipeline Stage Tabs */}
      <div className="mt-6 flex flex-col gap-2">
        <span className="text-xs font-mono font-semibold uppercase text-[#5a4139] tracking-wider">
          72-Hour Pipeline Timeline
        </span>
        <div className="grid grid-cols-4 gap-2">
          {stages.map((stg) => {
            const isSelected = selectedDay === stg.day;
            return (
              <button
                key={stg.day}
                onClick={() => setSelectedDay(stg.day)}
                className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all ${
                  isSelected
                    ? 'bg-[#ab2f00] text-white shadow-md scale-[1.02]'
                    : 'bg-[#f8ebe4] text-[#201a16] hover:bg-[#f3e6df]'
                }`}
              >
                <span className="font-mono text-xs font-bold">DAY {stg.num}</span>
                <span className="text-[11px] font-semibold mt-1 truncate max-w-full">
                  {stg.day === 0 && 'Intake'}
                  {stg.day === 1 && 'Build'}
                  {stg.day === 2 && 'Refine'}
                  {stg.day === 3 && 'Launch'}
                </span>
                <span
                  className={`mt-1.5 w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white' : stg.day < 2 ? 'bg-[#2a6653]' : 'bg-[#fed56b]'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="mt-5 p-5 rounded-2xl bg-[#f8ebe4] border border-[#e3bfb5]/40 flex flex-col gap-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-mono text-[#5a4139] font-bold">
              {stages[selectedDay].time}
            </span>
            <h3
              className="text-xl font-bold text-[#201a16] mt-0.5"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Day {stages[selectedDay].num}: {stages[selectedDay].title}
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${stages[selectedDay].badgeClass}`}
          >
            {stages[selectedDay].status}
          </span>
        </div>
        <p className="text-xs text-[#5a4139] leading-relaxed">
          {stages[selectedDay].desc}
        </p>

        {/* Dynamic content per stage */}
        {selectedDay === 0 && (
          <div className="flex flex-col gap-3 pt-2 border-t border-[#e3bfb5]/30">
            <span className="text-xs font-mono font-semibold uppercase text-[#201a16]">
              Intake Checklist & Verification
            </span>
            <div className="space-y-2">
              <div className="p-3 bg-[#fff8f5] rounded-xl flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a6653] text-[18px]">check_circle</span>
                  Domain {projectDomain}
                </span>
                <span className="font-mono text-[#2a6653] font-bold">Verified & Reserved</span>
              </div>
              <div className="p-3 bg-[#fff8f5] rounded-xl flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a6653] text-[18px]">check_circle</span>
                  Brand brief & voice
                </span>
                <span className="font-mono text-[#2a6653] font-bold">Captured</span>
              </div>
              <div className="p-3 bg-[#fff8f5] rounded-xl flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a6653] text-[18px]">check_circle</span>
                  Fixed price confirmed
                </span>
                <span className="font-mono text-[#201a16] font-bold">$299 USD</span>
              </div>
            </div>
          </div>
        )}

        {selectedDay === 1 && (
          <div className="flex flex-col gap-3 pt-2 border-t border-[#e3bfb5]/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-[#201a16]">
                Interactive Private Preview
              </span>
              <div className="flex gap-1 bg-[#ede0d9] p-0.5 rounded-lg">
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    previewDevice === 'mobile' ? 'bg-[#fff8f5] text-[#201a16] font-bold shadow-xs' : 'text-[#5a4139]'
                  }`}
                >
                  Mobile
                </button>
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    previewDevice === 'desktop' ? 'bg-[#fff8f5] text-[#201a16] font-bold shadow-xs' : 'text-[#5a4139]'
                  }`}
                >
                  Desktop
                </button>
              </div>
            </div>

            {/* Embedded Live Preview Mockup */}
            <div
              className={`mx-auto w-full bg-[#fff8f5] border border-[#e3bfb5] rounded-2xl overflow-hidden shadow-sm p-4 flex flex-col gap-3 transition-all ${
                previewDevice === 'mobile' ? 'max-w-xs' : 'max-w-xl'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#e3bfb5]/30">
                <span className="font-bold text-sm text-[#201a16] font-['Fraunces']">
                  {projectName}
                </span>
                <span className="text-[10px] font-mono text-[#2a6653] bg-[#b1f0d6]/60 px-2 py-0.5 rounded-full">
                  Preview v1.2
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[#ab2f00] uppercase font-semibold">
                  Mindful Movement & Posture Alignment
                </span>
                <h4 className="text-lg font-bold font-['Fraunces'] leading-snug">
                  Transform your core strength in an unhurried, private sanctuary.
                </h4>
                <p className="text-[11px] text-[#5a4139] leading-relaxed">
                  Personalized 1-on-1 reformer Pilates, gentle somatic breathwork, and clinical
                  rehabilitation tailored to your body's natural cadence.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="p-2 bg-[#f8ebe4] rounded-lg text-center">
                    <span className="text-xs font-bold text-[#201a16]">1-on-1 Reformer</span>
                    <p className="text-[10px] text-[#5a4139]">Custom apparatus</p>
                  </div>
                  <div className="p-2 bg-[#f8ebe4] rounded-lg text-center">
                    <span className="text-xs font-bold text-[#201a16]">Small Groups</span>
                    <p className="text-[10px] text-[#5a4139]">Max 4 people</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-1 w-full py-2 rounded-xl bg-[#ab2f00] text-white text-xs font-semibold"
                >
                  Book Initial Assessment
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedDay(2)}
                className="px-4 py-2 rounded-full bg-[#ab2f00] text-white text-xs font-semibold shadow-xs"
              >
                Approve & Proceed to Refinement →
              </button>
            </div>
          </div>
        )}

        {selectedDay === 2 && (
          <div className="flex flex-col gap-3 pt-2 border-t border-[#e3bfb5]/30">
            <span className="text-xs font-mono font-semibold uppercase text-[#201a16]">
              Request Tweaks & Adjustments
            </span>
            <p className="text-xs text-[#5a4139]">
              Anything you'd like to adjust on the preview? Headline words, color shades, or contact info?
            </p>
            {tweakSubmitted ? (
              <div className="p-4 bg-[#b1f0d6]/60 rounded-xl text-center">
                <span className="material-symbols-outlined text-[#0e503e] text-[24px]">check_circle</span>
                <p className="text-xs font-bold text-[#0e503e] mt-1">Tweak Received!</p>
                <p className="text-[11px] text-[#5a4139]">
                  Our designer is applying this now. Re-checking in &lt; 2 hours.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <textarea
                  rows={3}
                  value={tweakText}
                  onChange={(e) => setTweakText(e.target.value)}
                  placeholder="e.g. Please swap 'Mindful Movement' for 'Contemporary Classical Pilates' in the headline..."
                  className="w-full p-3 rounded-xl bg-[#fff8f5] text-xs text-[#201a16] border border-[#e3bfb5]/40 focus:outline-none focus:ring-2 focus:ring-[#ab2f00]"
                />
                <button
                  onClick={() => {
                    if (tweakText.trim()) {
                      setTweakSubmitted(true);
                    }
                  }}
                  className="self-end px-5 py-2.5 rounded-full bg-[#ab2f00] text-white text-xs font-semibold shadow-xs"
                >
                  Send Tweak to Builder
                </button>
              </div>
            )}
          </div>
        )}

        {selectedDay === 3 && (
          <div className="flex flex-col gap-3 pt-2 border-t border-[#e3bfb5]/30">
            <span className="text-xs font-mono font-semibold uppercase text-[#201a16]">
              Pre-Launch Checklist (All Green)
            </span>
            <div className="space-y-2">
              <div className="p-3 bg-[#fff8f5] rounded-xl flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a6653] text-[18px]">verified_user</span>
                  SSL / HTTPS Certificate
                </span>
                <span className="font-mono text-[#2a6653] font-bold">Active & Secure</span>
              </div>
              <div className="p-3 bg-[#fff8f5] rounded-xl flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a6653] text-[18px]">travel_explore</span>
                  Google Search Console Indexing
                </span>
                <span className="font-mono text-[#2a6653] font-bold">Submitted</span>
              </div>
              <div className="p-3 bg-[#fff8f5] rounded-xl flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a6653] text-[18px]">mail</span>
                  Business Email (hello@{projectDomain})
                </span>
                <span className="font-mono text-[#2a6653] font-bold">Routing Configured</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('deliverables')}
              className="mt-2 w-full py-3 rounded-full bg-[#201a16] text-[#fbf7f1] text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>Access Digital Handover Vault</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>

      {/* Direct support message */}
      <div className="mt-6 p-4 rounded-xl bg-[#fef1ea] border border-[#e3bfb5]/40 text-center">
        <p className="text-xs text-[#5a4139]">
          Have questions during your build? Message your dedicated developer at{' '}
          <a href="mailto:hello@whisk.app" className="font-semibold text-[#ab2f00] underline">
            hello@whisk.app
          </a>
        </p>
      </div>
    </div>
  );
};
