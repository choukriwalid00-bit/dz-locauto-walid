import React, { useState } from 'react';
import { Vehicle, CurrencyCode } from '../types';
import { FLEET } from '../data/fleetData';
import { formatPrice } from '../utils/formatters';
import { Users, Briefcase, Fuel, Cog, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface FleetPageProps {
  setActiveTab: (tab: string) => void;
  currency: CurrencyCode;
  onSelectVehicleForQuote: (vehicleName: string) => void;
  onSelectVehicleForTech: (vehicleId: string) => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({
  setActiveTab,
  currency,
  onSelectVehicleForQuote,
  onSelectVehicleForTech,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const categories = ['Tous', 'Citadine', 'SUV Urbain', 'Berline', 'SUV Premium'];

  const filteredFleet =
    selectedCategory === 'Tous'
      ? FLEET
      : FLEET.filter((v) => v.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#d9a203] tracking-widest uppercase">
            Notre Parc Automobile 2025–2026
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Quatre véhicules neufs, zéro compromis.
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Des modèles récents équipés des dernières technologies de sécurité et de confort.
            Livrés propres, réservoir plein et désinfectés pour chaque client.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredFleet.map((car) => {
          return (
            <div
              key={car.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              {/* Media banner */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden group">
                <img
                  src={car.image}
                  alt={`${car.name} ${car.year}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to simple colored background with label if remote blocked
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Fallback container background if image hidden */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center p-6 text-white text-center">
                  <div>
                    <div className="font-display font-bold text-xl">{car.name}</div>
                    <div className="text-xs text-slate-300 mt-1">{car.year} · {car.category}</div>
                  </div>
                </div>

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-[#F2B705] text-[#0F2136] text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs">
                    {car.year}
                  </span>
                  <span className="bg-[#0F2136] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-xs">
                    {car.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-mono">
                  {car.color}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-display text-xl font-bold text-slate-900">{car.name}</h2>
                      <div className="text-xs text-slate-500 mt-0.5">{car.model}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                        {formatPrice(car.pricePerDayDA, currency)}
                      </div>
                      <div className="text-[11px] text-slate-500">par jour (min. 2 j)</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {car.shortDescription}
                  </p>

                  {/* Spec pills with clean typography */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 pb-1 border-t border-b border-slate-100 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.seats} places</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.luggage} bagages</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Cog className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.fuelType}</span>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                    {car.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing summary & actions */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Caution de garantie :</span>
                    <span className="font-semibold text-slate-800">
                      {formatPrice(car.cautionDA, currency)} (restituée au retour)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => {
                        onSelectVehicleForTech(car.id);
                        setActiveTab('technique');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Fiche technique
                    </button>
                    <button
                      onClick={() => {
                        onSelectVehicleForQuote(car.name);
                        setActiveTab('devis');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-[#0F2136] bg-[#F2B705] hover:bg-[#d9a203] rounded transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Réserver</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conditions Strip Reminder */}
      <div className="bg-[#16314F] text-white p-6 rounded-lg border border-white/10 space-y-4">
        <h3 className="font-display text-lg font-bold">Rappel des conditions essentielles :</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
          <div>
            <span className="text-[#F2B705] font-bold block mb-1">ÂGE MINIMUM</span>
            <p>22 ans révolus, permis de conduire valide depuis plus de 2 ans.</p>
          </div>
          <div>
            <span className="text-[#F2B705] font-bold block mb-1">KILOMÉTRAGE</span>
            <p>300 km / jour inclus. 50 DA par km supplémentaire.</p>
          </div>
          <div>
            <span className="text-[#F2B705] font-bold block mb-1">DURÉE MINIMALE</span>
            <p>Location à partir de 2 jours minimum.</p>
          </div>
          <div>
            <span className="text-[#F2B705] font-bold block mb-1">RESTITUTION</span>
            <p>Véhicule rendu propre avec le plein fait, état des lieux rapide.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
