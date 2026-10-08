import React from 'react';
import { CurrencyCode } from '../types';
import { CURRENCY_RATES, CURRENCY_SYMBOLS } from '../data/fleetData';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, currency, setCurrency }) => {
  return (
    <footer className="bg-[#0F2136] text-slate-300 border-t border-white/10 pt-16">
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & mission */}
          <div className="space-y-4">
            <div className="font-display text-2xl font-bold text-white tracking-tight">
              DZ Loc<span className="text-[#F2B705]">Auto</span> Walid
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Agence de location de voitures modernes basée à Béjaïa et Alger. Véhicules récents 2025–2026,
              entretenus et livrés désinfectés avec le plein.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Contrats certifiés · Caution restituée sans délai</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('accueil');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Entreprise & Avis Clients
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('flotte');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Notre Flotte 2025–2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('technique');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fiches Techniques & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('devis');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Demande de Devis Instantané
                </button>
              </li>
            </ul>
          </div>

          {/* Zones & Agences */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Zones de prise en charge
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                <span>Béjaïa : Centre Ritaj Mall & Livraison hôtel</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                <span>Béjaïa : Aéroport Soummam (Abane Ramdane)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                <span>Alger : Centre-Ville & Didouche Mourad</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                <span>Alger : Aéroport Houari Boumédiène (T1/T4)</span>
              </li>
            </ul>
          </div>

          {/* Contact direct */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Contact & Horaires
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+213791596139"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F2B705]" />
                  <span className="font-semibold text-white">+213 791 59 61 39</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/213673371449"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp direct : +213 673 37 14 49</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:choukriwalid00@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="break-all">choukriwalid00@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-400 pt-1 border-t border-white/10">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p>Samedi – Jeudi : 08h00 – 22h00</p>
                  <p>Vendredi : 14h00 – 22h00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Currency conversion bar */}
      <div className="bg-[#16314F] border-t border-b border-white/10 py-3 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Devise d’affichage des prix :</span>
            <div className="flex items-center gap-1">
              {(['DA', 'EUR', 'USD', 'CAD', 'GBP'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-0.5 rounded font-semibold transition-all ${
                    currency === c
                      ? 'bg-[#F2B705] text-[#0F2136]'
                      : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  {c} ({CURRENCY_SYMBOLS[c]})
                </button>
              ))}
            </div>
          </div>
          <span className="text-slate-400 text-[11px]">
            Taux indicatif : 1€ ≈ {(1 / CURRENCY_RATES.EUR).toFixed(0)} DA · 1$ ≈ {(1 / CURRENCY_RATES.USD).toFixed(0)} DA (marché parallèle)
          </span>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 DZ LocAuto Walid. Tous droits réservés. Location de voitures Béjaïa & Alger.</p>
        <p>Garantie véhicules récents 2025–2026 · Clarté contractuelle</p>
      </div>
    </footer>
  );
};
