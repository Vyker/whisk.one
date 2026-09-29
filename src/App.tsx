import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewScreen } from './components/OverviewScreen';
import { PipelineScreen } from './components/PipelineScreen';
import { PortalScreen } from './components/PortalScreen';
import { DeliverablesScreen } from './components/DeliverablesScreen';
import { CurrencyModal } from './components/CurrencyModal';
import { MobileDrawer } from './components/MobileDrawer';
import { PreviewSiteModal } from './components/PreviewSiteModal';
import { ScreenTab, QuoteRequest } from './types';
import { ShowcaseSample } from './data/whiskData';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenTab>('overview');
  const [activeCurrency, setActiveCurrency] = useState<string>('USD');
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [previewSample, setPreviewSample] = useState<ShowcaseSample | null>(null);

  // Active user project state (if they submit quote or preview Sarah's Studio)
  const [currentProject, setCurrentProject] = useState<QuoteRequest | null>(null);

  // Geolocation or localStorage currency detection on mount
  useEffect(() => {
    const saved = localStorage.getItem('whisk:currency');
    if (saved) {
      setActiveCurrency(saved);
    } else {
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.currency) {
            setActiveCurrency(data.currency);
          }
        })
        .catch(() => {
          // fallback to USD
        });
    }
  }, []);

  const handleSelectCurrency = (code: string) => {
    setActiveCurrency(code);
    localStorage.setItem('whisk:currency', code);
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveScreen('overview');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleQuoteSubmitted = (quoteData: {
    name: string;
    email: string;
    profession: string;
    location: string;
    domain: string;
    details: string;
  }) => {
    const newProject: QuoteRequest = {
      id: `proj-${Date.now()}`,
      name: quoteData.name,
      email: quoteData.email,
      profession: quoteData.profession,
      location: quoteData.location,
      domain: quoteData.domain || `${quoteData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      details: quoteData.details,
      submittedAt: 'Just now',
      status: 'reviewing',
    };
    setCurrentProject(newProject);
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#201a16] flex flex-col font-sans selection:bg-[#fed56b] selection:text-[#201a16]">
      {/* Top Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={(tab) => {
          setActiveScreen(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeCurrency={activeCurrency}
        onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16">
        {activeScreen === 'overview' && (
          <OverviewScreen
            activeCurrency={activeCurrency}
            onNavigate={(tab) => {
              setActiveScreen(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPreviewSample={(sample) => setPreviewSample(sample)}
            onQuoteSubmitted={handleQuoteSubmitted}
          />
        )}

        {activeScreen === 'pipeline' && (
          <PipelineScreen
            currentProject={currentProject}
            onNavigateTab={(tab) => {
              setActiveScreen(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'portal' && (
          <PortalScreen
            onNavigateTab={(tab) => {
              setActiveScreen(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'deliverables' && <DeliverablesScreen />}
      </main>

      {/* Persistent Bottom Tab Navigation */}
      <BottomNav
        activeScreen={activeScreen}
        onNavigate={(tab) => {
          setActiveScreen(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Currency Selection Modal */}
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        activeCurrency={activeCurrency}
        onSelectCurrency={handleSelectCurrency}
      />

      {/* Mobile Drawer Menu */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateTab={(tab) => {
          setActiveScreen(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToSection={handleScrollToSection}
      />

      {/* Showcase Site Preview Modal */}
      <PreviewSiteModal
        sample={previewSample}
        onClose={() => setPreviewSample(null)}
        onSelectForQuote={(sample) => {
          setActiveScreen('overview');
          handleScrollToSection('quote');
        }}
      />
    </div>
  );
}
