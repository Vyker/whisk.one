import React from 'react';
import { ScreenTab } from '../types';

interface HeaderProps {
  activeScreen: ScreenTab;
  onNavigate: (tab: ScreenTab) => void;
  activeCurrency: string;
  onOpenCurrencyModal: () => void;
  onToggleDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  activeCurrency,
  onOpenCurrencyModal,
  onToggleDrawer,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#fff8f5]/90 backdrop-blur-xl border-b border-[#e3bfb5]/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 px-4 md:px-8 max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-1 group text-left cursor-pointer focus:outline-none"
        >
          <span className="relative inline-flex flex-col justify-center select-none">
            <span
              className="text-[1.625rem] leading-none font-bold text-[#201a16] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Whisk
            </span>
            <svg
              className="absolute -bottom-1 right-0 text-[#ab2f00]"
              fill="none"
              height="6"
              viewBox="0 0 28 6"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5C6.5 1.5 19 0.5 27 3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.2"
              />
            </svg>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate('overview')}
            className={`text-sm font-medium transition-colors ${
              activeScreen === 'overview'
                ? 'text-[#ab2f00] font-semibold'
                : 'text-[#5a4139] hover:text-[#201a16]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('pipeline')}
            className={`text-sm font-medium transition-colors ${
              activeScreen === 'pipeline'
                ? 'text-[#ab2f00] font-semibold'
                : 'text-[#5a4139] hover:text-[#201a16]'
            }`}
          >
            3-Day Pipeline
          </button>
          <button
            onClick={() => onNavigate('portal')}
            className={`text-sm font-medium transition-colors ${
              activeScreen === 'portal'
                ? 'text-[#ab2f00] font-semibold'
                : 'text-[#5a4139] hover:text-[#201a16]'
            }`}
          >
            Client Portal
          </button>
          <button
            onClick={() => onNavigate('deliverables')}
            className={`text-sm font-medium transition-colors ${
              activeScreen === 'deliverables'
                ? 'text-[#ab2f00] font-semibold'
                : 'text-[#5a4139] hover:text-[#201a16]'
            }`}
          >
            Deliverables
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Currency Pill */}
          <button
            aria-label="Select currency"
            onClick={onOpenCurrencyModal}
            className="min-h-[40px] px-3 py-1.5 rounded-full bg-[#f8ebe4] hover:bg-[#f3e6df] flex items-center gap-1.5 text-[#201a16] transition-colors border border-[#e3bfb5]/40"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#5a4139]">
              public
            </span>
            <span className="text-[13px] font-mono font-bold">{activeCurrency}</span>
            <span className="material-symbols-outlined text-[16px] text-[#5a4139]">
              expand_more
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            aria-label="Open menu"
            onClick={onToggleDrawer}
            className="min-h-[40px] min-w-[40px] rounded-full bg-[#f8ebe4] hover:bg-[#f3e6df] flex items-center justify-center text-[#201a16] transition-colors border border-[#e3bfb5]/40 md:hidden"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>

          {/* Profile / Account shortcut */}
          <button
            onClick={() => onNavigate('portal')}
            title="View Client Portal"
            className="w-9 h-9 rounded-full bg-[#ab2f00] hover:bg-[#862300] flex items-center justify-center text-white transition-transform active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
