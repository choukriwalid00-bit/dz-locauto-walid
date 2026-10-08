import React, { useState } from 'react';
import { Vehicle, CurrencyCode } from '../types';
import { FLEET } from '../data/fleetData';
import { formatPrice } from '../utils/formatters';
import { Gauge, Fuel, Shield, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';

interface TechnicalPageProps {
  selectedVehicleId: string;
  setSelectedVehicleId: (id: string) => void;
  setActiveTab: (tab: string) => void;
  currency: CurrencyCode;
  onSelectVehicleForQuote: (vehicleName: string) => void;
}

export const TechnicalPage: React.FC<TechnicalPageProps> = ({
  selectedVehicleId,
  setSelectedVehicleId,
  setActiveTab,
  currency,
  onSelectVehicleForQuote,
}) => {
  const currentVehicle: Vehicle =
    FLEET.find((v) => v.id === selectedVehicleId) || FLEET[0];

  const [compareMode, setCompareMode] = useState<boolean>(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#d9a203] tracking-widest uppercase">
            Ingénierie & Spécifications Détaillées
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Fiches techniques complètes de la flotte.
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Toutes les données vérifiées sur nos véhicules 2025–2026 : motorisation, consommation réelle,
            volume de coffre, équipements de sécurité et carnet d’entretien.
          </p>
        </div>

        {/* Comparison toggle */}
        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`px-4 py-2 text-xs font-bold rounded cursor-pointer transition-colors ${
            compareMode
              ? 'bg-[#0F2136] text-white'
              : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
          }`}
        >
          {compareMode ? 'Afficher la fiche individuelle' : 'Comparer les 4 véhicules côte à côte'}
        </button>
      </div>

      {/* Mode 1: Side by side comparison table */}
      {compareMode ? (
        <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-700 uppercase tracking-wider w-1/5">
                  Critères Techniques
                </th>
                {FLEET.map((v) => (
                  <th key={v.id} className="p-4 font-bold text-slate-900 w-1/5">
                    <div className="font-display text-sm">{v.name}</div>
                    <div className="text-[11px] text-slate-500 font-normal">
                      {v.year} · {v.category}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Moteur & Cylindrée</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-800 font-medium">
                    {v.engine} ({v.displacement})
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Puissance DIN</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-800 font-medium">
                    {v.powerHP} ch
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Boîte de vitesses</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-800 font-medium">
                    {v.transmission}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Consommation mixte</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-800 font-medium">
                    {v.fuelConsumption100km}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Capacité du coffre</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-800 font-medium">
                    {v.trunkVolumeLiters} Litres
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Places & Bagages</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-800 font-medium">
                    {v.seats} places / {v.luggage} valises
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Carburant recommandé</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-800 font-medium">
                    {v.recommendedFuel}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Tarif / jour</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-900 font-bold tabular-nums">
                    {formatPrice(v.pricePerDayDA, currency)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Caution</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4 text-slate-800 font-semibold tabular-nums">
                    {formatPrice(v.cautionDA, currency)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Action</td>
                {FLEET.map((v) => (
                  <td key={v.id} className="p-4">
                    <button
                      onClick={() => {
                        onSelectVehicleForQuote(v.name);
                        setActiveTab('devis');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-[#F2B705] hover:bg-[#d9a203] text-[#0F2136] font-bold rounded text-xs cursor-pointer"
                    >
                      Réserver
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        /* Mode 2: Individual Vehicle Technical File */
        <div className="space-y-8">
          {/* Vehicle Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {FLEET.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVehicleId(v.id)}
                className={`px-4 py-2.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  selectedVehicleId === v.id
                    ? 'bg-[#0F2136] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {v.name} ({v.year})
              </button>
            ))}
          </div>

          {/* Active Vehicle Hero Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 lg:p-8 shadow-xs space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative rounded-lg overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src={currentVehicle.image}
                  alt={currentVehicle.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#F2B705] text-[#0F2136] font-bold text-xs px-2.5 py-1 rounded">
                  Modèle {currentVehicle.year}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                      {currentVehicle.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {currentVehicle.model} · Finition {currentVehicle.color}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      {formatPrice(currentVehicle.pricePerDayDA, currency)}
                    </span>
                    <span className="text-xs text-slate-500 block">/ jour (caution {formatPrice(currentVehicle.cautionDA, currency)})</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentVehicle.shortDescription}
                </p>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                      <Gauge className="w-3.5 h-3.5 text-slate-400" />
                      <span>Motorisation</span>
                    </div>
                    <div className="font-bold text-xs text-slate-800">{currentVehicle.engine}</div>
                    <div className="text-[11px] text-slate-500">{currentVehicle.powerHP} chevaux DIN</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                      <Fuel className="w-3.5 h-3.5 text-slate-400" />
                      <span>Consommation</span>
                    </div>
                    <div className="font-bold text-xs text-slate-800">{currentVehicle.fuelConsumption100km}</div>
                    <div className="text-[11px] text-slate-500">Réservoir {currentVehicle.tankCapacityLiters} L</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                      <Wrench className="w-3.5 h-3.5 text-slate-400" />
                      <span>Transmission</span>
                    </div>
                    <div className="font-bold text-xs text-slate-800">{currentVehicle.transmission}</div>
                    <div className="text-[11px] text-slate-500">Coffre {currentVehicle.trunkVolumeLiters} L</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onSelectVehicleForQuote(currentVehicle.name);
                      setActiveTab('devis');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2B705] hover:bg-[#d9a203] text-[#0F2136] font-bold text-xs rounded transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Demander un devis pour cette {currentVehicle.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* In-depth Features & Safety split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#F2B705]" />
                  <span>Confort, Infodivertissement & Vie à bord</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {currentVehicle.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Systèmes de Sécurité & Aides à la Conduite</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {currentVehicle.safety.map((safe, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{safe}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Maintenance & Fuel Certification Box */}
            <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs space-y-2">
              <div className="font-bold text-slate-800">
                Suivi mécanique et qualité du carburant :
              </div>
              <p className="text-slate-600">
                <strong className="text-slate-700">Entretien :</strong> {currentVehicle.maintenanceStatus}
              </p>
              <p className="text-slate-600">
                <strong className="text-slate-700">Carburant à utiliser :</strong> {currentVehicle.recommendedFuel}.
                Véhicule livré avec le plein et à restituer avec le plein fait dans une station service certifiée Naftal.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Technical Policy & FAQ Section */}
      <section className="bg-white border border-slate-200 rounded-lg p-6 lg:p-8 space-y-6 shadow-xs">
        <h3 className="font-display text-xl font-bold text-slate-900">
          Réglementation technique et directives de conduite
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Kilométrage & Dépassement</h4>
            <p className="leading-relaxed">
              Chaque journée de location inclut <strong>300 km</strong>. Si vous effectuez par exemple
              un aller-retour Béjaïa-Alger sur 3 jours (900 km inclus), vous disposez d’une marge très confortable.
              Tout km supplémentaire au-delà du forfait global est facturé 50 DA.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Gestion du Carburant</h4>
            <p className="leading-relaxed">
              Nous appliquons la règle stricte du <strong>plein à plein</strong>. Vous partez avec la jauge pleine à 100%,
              vous rendez le véhicule avec la jauge pleine. Aucun frais de service si le niveau est respecté.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Propreté & Restitution</h4>
            <p className="leading-relaxed">
              Le véhicule vous est remis impeccablement lavé. Si le véhicule est restitué anormalement sale
              (terre, sable, sellerie tachée), un forfait de nettoyage professionnel de 3 000 DA sera retenu.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
