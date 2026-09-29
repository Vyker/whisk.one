import React from 'react';
import { ScreenTab } from '../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: ScreenTab) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onScrollToSection,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#fff8f5]/95 backdrop-blur-2xl flex flex-col pt-20 px-6 pb-safe transition-opacity"
      onClick={onClose}
    >
      <div className="flex justify-between items-center pb-4 border-b border-[#e3bfb5]/30">
        <span
          className="text-2xl font-bold text-[#201a16]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Menu
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#f8ebe4] flex items-center justify-center text-[#201a16]"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <nav
        className="flex flex-col gap-4 mt-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-left font-semibold text-xl text-[#201a16] py-2 hover:text-[#ab2f00] transition-colors flex items-center justify-between"
          onClick={() => {
            onNavigateTab('overview');
            onScrollToSection('how');
            onClose();
          }}
        >
          <span>How It Works</span>
          <span className="material-symbols-outlined text-[#5a4139] text-[20px]">arrow_forward</span>
        </button>

        <button
          className="text-left font-semibold text-xl text-[#201a16] py-2 hover:text-[#ab2f00] transition-colors flex items-center justify-between"
          onClick={() => {
            onNavigateTab('overview');
            onScrollToSection('what');
            onClose();
          }}
        >
          <span>What You Get</span>
          <span className="material-symbols-outlined text-[#5a4139] text-[20px]">arrow_forward</span>
        </button>

        <button
          className="text-left font-semibold text-xl text-[#201a16] py-2 hover:text-[#ab2f00] transition-colors flex items-center justify-between"
          onClick={() => {
            onNavigateTab('overview');
            onScrollToSection('pricing');
            onClose();
          }}
        >
          <span>Pricing</span>
          <span className="material-symbols-outlined text-[#5a4139] text-[20px]">arrow_forward</span>
        </button>

        <button
          className="text-left font-semibold text-xl text-[#201a16] py-2 hover:text-[#ab2f00] transition-colors flex items-center justify-between"
          onClick={() => {
            onNavigateTab('overview');
            onScrollToSection('faq');
            onClose();
          }}
        >
          <span>FAQ</span>
          <span className="material-symbols-outlined text-[#5a4139] text-[20px]">arrow_forward</span>
        </button>

        <div className="my-2 border-t border-[#e3bfb5]/30 pt-4 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wider font-mono text-[#5a4139] font-bold">
            Interactive Workspaces
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onNavigateTab('pipeline');
                onClose();
              }}
              className="p-3 rounded-xl bg-[#f8ebe4] text-left text-sm font-semibold text-[#201a16] hover:bg-[#fed56b]/30"
            >
              72h Pipeline
            </button>
            <button
              onClick={() => {
                onNavigateTab('portal');
                onClose();
              }}
              className="p-3 rounded-xl bg-[#f8ebe4] text-left text-sm font-semibold text-[#201a16] hover:bg-[#fed56b]/30"
            >
              Client Portal
            </button>
            <button
              onClick={() => {
                onNavigateTab('deliverables');
                onClose();
              }}
              className="p-3 rounded-xl bg-[#f8ebe4] text-left text-sm font-semibold text-[#201a16] hover:bg-[#fed56b]/30"
            >
              Deliverables
            </button>
          </div>
        </div>

        <button
          className="mt-4 w-full py-4 px-6 rounded-full bg-[#ab2f00] text-white font-semibold text-center shadow-md active:scale-95 transition-transform"
          onClick={() => {
            onNavigateTab('overview');
            onScrollToSection('quote');
            onClose();
          }}
        >
          Get a free quote
        </button>
      </nav>
    </div>
  );
};
