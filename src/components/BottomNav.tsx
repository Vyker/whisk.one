import React from 'react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  activeScreen: ScreenTab;
  onNavigate: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const tabs = [
    { id: 'overview' as ScreenTab, label: 'Overview', icon: 'dashboard' },
    { id: 'pipeline' as ScreenTab, label: 'Pipeline', icon: 'hourglass_top' },
    { id: 'portal' as ScreenTab, label: 'Portal', icon: 'folder_shared' },
    { id: 'deliverables' as ScreenTab, label: 'Deliverables', icon: 'task_alt' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#fff8f5]/90 backdrop-blur-xl border-t border-[#e3bfb5]/40 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all rounded-xl ${
                isActive
                  ? 'text-[#ab2f00] font-semibold scale-105'
                  : 'text-[#5a4139] hover:text-[#201a16]'
              }`}
              type="button"
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="relative inline-block">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400",
                  }}
                >
                  {tab.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ab2f00]" />
                )}
              </span>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
