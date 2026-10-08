import React, { useState } from 'react';
import { CurrencyCode } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FleetPage } from './pages/FleetPage';
import { TechnicalPage } from './pages/TechnicalPage';
import { QuoteContactPage } from './pages/QuoteContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [currency, setCurrency] = useState<CurrencyCode>('DA');
  const [selectedVehicleForQuote, setSelectedVehicleForQuote] = useState<string>('Volkswagen Polo');
  const [selectedVehicleIdForTech, setSelectedVehicleIdForTech] = useState<string>('polo-2025');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVehicleForQuote = (vName: string) => {
    setSelectedVehicleForQuote(vName);
    setActiveTab('devis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVehicleForTech = (vId: string) => {
    setSelectedVehicleIdForTech(vId);
    setActiveTab('technique');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#14171B]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'accueil' && (
          <HomePage setActiveTab={handleTabChange} currency={currency} />
        )}

        {activeTab === 'flotte' && (
          <FleetPage
            setActiveTab={handleTabChange}
            currency={currency}
            onSelectVehicleForQuote={handleSelectVehicleForQuote}
            onSelectVehicleForTech={handleSelectVehicleForTech}
          />
        )}

        {activeTab === 'technique' && (
          <TechnicalPage
            selectedVehicleId={selectedVehicleIdForTech}
            setSelectedVehicleId={setSelectedVehicleIdForTech}
            setActiveTab={handleTabChange}
            currency={currency}
            onSelectVehicleForQuote={handleSelectVehicleForQuote}
          />
        )}

        {activeTab === 'devis' && (
          <QuoteContactPage
            initialVehicleName={selectedVehicleForQuote}
            currency={currency}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleTabChange}
        currency={currency}
        setCurrency={setCurrency}
      />
    </div>
  );
}
