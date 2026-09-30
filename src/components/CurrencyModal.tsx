import React, { useState } from 'react';
import { CURRENCIES, formatPrice, BASE_PRICES } from '../data/currencies';
import { CurrencyConfig } from '../types';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCurrency: string;
  onSelectCurrency: (code: string) => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  activeCurrency,
  onSelectCurrency,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = Object.values(CURRENCIES).filter(
    (c: CurrencyConfig) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#fff8f5] p-6 rounded-2xl shadow-2xl flex flex-col gap-4 max-h-[85vh] border border-[#e3bfb5]/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#e3bfb5]/30">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-[#201a16] font-['Fraunces']">
              Select Currency
            </span>
            <span className="text-xs text-[#5a4139] font-mono">
              Live conversion benchmark from USD
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f8ebe4] hover:bg-[#f3e6df] flex items-center justify-center text-[#201a16] transition-colors"
            aria-label="Close currency modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search currency (e.g. EUR, GBP, Dirham)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 px-3 pl-9 rounded-xl bg-[#f8ebe4] text-[#201a16] placeholder:text-[#5a4139]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#ab2f00]"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#5a4139] text-[18px]">
            search
          </span>
        </div>

        {/* Currency List */}
        <div className="flex flex-col gap-1.5 overflow-y-auto pr-1 max-h-[360px]">
          {filtered.map((curr) => {
            const isSelected = curr.code === activeCurrency;
            const buildDisplay = formatPrice(BASE_PRICES.build, curr.code);

            return (
              <button
                key={curr.code}
                onClick={() => {
                  onSelectCurrency(curr.code);
                  onClose();
                }}
                className={`w-full px-4 py-3 rounded-xl flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-[#fed56b]/40 border-2 border-[#765b00]'
                    : 'bg-[#f8ebe4]/60 hover:bg-[#f8ebe4] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#201a16] w-12">
                    {curr.code}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#201a16]">{curr.name}</span>
                    <span className="text-[11px] text-[#5a4139]">
                      Build: {buildDisplay}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#5a4139] font-semibold bg-[#fff8f5] px-2 py-0.5 rounded">
                    {curr.symbol.trim()}
                  </span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[#ab2f00] text-[18px]">
                      check
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-center text-[#5a4139] font-mono pt-1 border-t border-[#e3bfb5]/20">
          Prices update instantly across all packages and receipts.
        </p>
      </div>
    </div>
  );
};
