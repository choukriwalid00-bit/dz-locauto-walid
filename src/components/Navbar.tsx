import React, { useState, useEffect } from 'react';
import { CurrencyCode } from '../types';
import { getAgencyStatus } from '../utils/formatters';
import { Phone, MessageCircle, Mail } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
}) => {
  const [agencyStatus, setAgencyStatus] = useState(getAgencyStatus());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAgencyStatus(getAgencyStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'accueil', label: 'Entreprise & Avis' },
    { id: 'flotte', label: 'Nos Voitures' },
    { id: 'technique', label: 'Fiches Techniques' },
    { id: 'devis', label: 'Devis & Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0F2136] border-b border-white/10 text-white">
      {/* Top status bar */}
      <div className="bg-[#16314F] border-b border-white/5 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                agencyStatus.status === 'open'
                  ? 'bg-emerald-400 animate-pulse'
                  : agencyStatus.status === 'soon'
                  ? 'bg-amber-400'
                  : 'bg-rose-400'
              }`}
            />
            <span className="font-medium text-white">{agencyStatus.label}</span>
            <span className="text-slate-400 hidden sm:inline">· Béjaïa Ritaj Mall & Aéroports</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:+213791596139"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F2B705]" />
              <span>+213 791 59 61 39</span>
            </a>
            <a
              href="https://wa.me/213673371449"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href="mailto:choukriwalid00@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors hidden md:flex"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>choukriwalid00@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation - Strict 3-zone contract */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('accueil')}
          className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-white">
            DZ Loc<span className="text-[#F2B705]">Auto</span> Walid
          </span>
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                  isActive
                    ? 'text-white border-[#F2B705]'
                    : 'text-slate-300 border-transparent hover:text-white hover:border-slate-500'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Currency selector & primary action */}
        <div className="flex items-center gap-3">
          {/* Currency selector */}
          <div className="flex items-center rounded bg-[#16314F] p-0.5 border border-white/10 text-xs">
            {(['DA', 'EUR', 'USD', 'CAD', 'GBP'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2 py-1 rounded font-medium transition-all ${
                  currency === c
                    ? 'bg-[#F2B705] text-[#0F2136] font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('devis')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs md:text-sm font-bold text-[#0F2136] bg-[#F2B705] hover:bg-[#d9a203] rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            Demander un devis
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16314F] border-t border-white/10 px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-[#F2B705] text-[#0F2136] font-bold'
                  : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setActiveTab('devis');
              setMobileMenuOpen(false);
            }}
            className="w-full text-center py-2.5 px-4 text-xs font-bold text-[#0F2136] bg-[#F2B705] rounded mt-2"
          >
            Demander un devis immédiat
          </button>
        </div>
      )}
    </header>
  );
};
