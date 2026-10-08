import React, { useState, useMemo } from 'react';
import { CurrencyCode } from '../types';
import { FLEET, LOCATIONS } from '../data/fleetData';
import { formatPrice, calculateDays } from '../utils/formatters';
import { Phone, MessageCircle, Mail, MapPin, Copy, Check, Send, AlertCircle, Calendar, Clock, Car } from 'lucide-react';

interface QuoteContactPageProps {
  initialVehicleName?: string;
  currency: CurrencyCode;
}

export const QuoteContactPage: React.FC<QuoteContactPageProps> = ({
  initialVehicleName = 'Volkswagen Polo',
  currency,
}) => {
  // Form state
  const [vehicleName, setVehicleName] = useState<string>(initialVehicleName);
  const [pickupLoc, setPickupLoc] = useState<string>(LOCATIONS[0]);
  const [returnLoc, setReturnLoc] = useState<string>(LOCATIONS[0]);

  // Default dates: tomorrow to +3 days
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const returnDateDefaultStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  }, []);

  const [startDate, setStartDate] = useState<string>(tomorrowStr);
  const [startTime, setStartTime] = useState<string>('10:00');
  const [endDate, setEndDate] = useState<string>(returnDateDefaultStr);
  const [endTime, setEndTime] = useState<string>('10:00');

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [flightNumber, setFlightNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Options
  const [optBabySeat, setOptBabySeat] = useState<boolean>(false);
  const [optSecondDriver, setOptSecondDriver] = useState<boolean>(false);
  const [optAirportMeet, setOptAirportMeet] = useState<boolean>(true);

  const [copied, setCopied] = useState<boolean>(false);

  // Selected vehicle object
  const selectedVehicle = FLEET.find((v) => v.name === vehicleName) || FLEET[0];

  // Duration calculation
  const rawDays = calculateDays(startDate, endDate);
  const billableDays = Math.max(rawDays, 2);
  const isLessThanMinimum = rawDays > 0 && rawDays < 2;

  // Price calculations
  const pricePerDay = selectedVehicle.pricePerDayDA;
  const cautionAmount = selectedVehicle.cautionDA;
  const totalBaseDA = pricePerDay * billableDays;

  // Options cost (example: baby seat 1000 DA flat, second driver free or small fee)
  const optionsTotalDA = (optBabySeat ? 1000 : 0);
  const totalEstimatedDA = totalBaseDA + optionsTotalDA;

  // Build structured message text
  const messageSummary = useMemo(() => {
    return `Nouvelle demande de réservation — DZ LocAuto Walid

Véhicule souhaité : ${vehicleName}
Prise en charge : ${pickupLoc} le ${startDate} à ${startTime}
Restitution : ${returnLoc} le ${endDate} à ${endTime}
Durée estimée : ${billableDays} jour(s)${isLessThanMinimum ? ' (minimum contractuel 2 jours)' : ''}

Devis estimatif : ${totalEstimatedDA.toLocaleString('fr-FR')} DA (caution de garantie : ${cautionAmount.toLocaleString('fr-FR')} DA)
Devise préférée : ${currency}

Coordonnées du client :
Nom : ${fullName || 'Non spécifié'}
Téléphone : ${phone || 'À renseigner'}
Email : ${email || 'Non renseigné'}
${flightNumber ? `Numéro de vol : ${flightNumber}` : ''}

Options :
- Siège enfant : ${optBabySeat ? 'Oui (+1 000 DA)' : 'Non'}
- 2ème conducteur : ${optSecondDriver ? 'Oui' : 'Non'}
- Accueil aéroport : ${optAirportMeet ? 'Oui' : 'Non'}

Remarques particulières :
${notes || 'Aucune'}`;
  }, [
    vehicleName,
    pickupLoc,
    returnLoc,
    startDate,
    startTime,
    endDate,
    endTime,
    billableDays,
    isLessThanMinimum,
    totalEstimatedDA,
    cautionAmount,
    currency,
    fullName,
    phone,
    email,
    flightNumber,
    optBabySeat,
    optSecondDriver,
    optAirportMeet,
    notes,
  ]);

  const handleSendWhatsApp = () => {
    if (!phone && !fullName) {
      alert('Veuillez au minimum indiquer votre nom et un numéro de téléphone.');
    }
    const encoded = encodeURIComponent(messageSummary);
    window.open(`https://wa.me/213673371449?text=${encoded}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Réservation ${vehicleName} — ${startDate} — ${fullName || 'Client'}`);
    const body = encodeURIComponent(messageSummary);
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=choukriwalid00@gmail.com&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageSummary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-slate-200">
        <span className="text-xs font-bold text-[#d9a203] tracking-widest uppercase">
          Devis Express & Prise de Contact
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Simulez votre devis et réservez directement.
        </h1>
        <p className="text-sm text-slate-600 max-w-xl">
          Sélectionnez vos dates, vos lieux de prise en charge et obtenez instantanément le tarif calculé.
          Transmettez ensuite votre demande en un clic sur WhatsApp ou par email à Walid.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Interactive Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 lg:p-8 space-y-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Détails de la réservation
          </h2>

          <div className="space-y-4 text-xs">
            {/* Vehicle Selection */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-slate-400" />
                <span>Véhicule souhaité</span>
              </label>
              <select
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className="w-full border border-slate-300 rounded p-2.5 text-xs font-medium focus:outline-none focus:border-[#0F2136]"
              >
                {FLEET.map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.name} ({v.year}) — {formatPrice(v.pricePerDayDA, currency)} / jour
                  </option>
                ))}
              </select>
            </div>

            {/* Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Prise en charge</span>
                </label>
                <select
                  value={pickupLoc}
                  onChange={(e) => setPickupLoc(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2.5 text-xs focus:outline-none focus:border-[#0F2136]"
                >
                  {LOCATIONS.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Restitution</span>
                </label>
                <select
                  value={returnLoc}
                  onChange={(e) => setReturnLoc(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2.5 text-xs focus:outline-none focus:border-[#0F2136]"
                >
                  {LOCATIONS.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates & Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded border border-slate-200">
              <div className="space-y-2">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#F2B705]" />
                  <span>Début de location</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white focus:outline-none"
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F2B705]" />
                  <span>Fin de location</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white focus:outline-none"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Options Checkboxes */}
            <div className="space-y-2 pt-2">
              <span className="block font-semibold text-slate-700">Options supplémentaires</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optBabySeat}
                    onChange={(e) => setOptBabySeat(e.target.checked)}
                    className="rounded text-[#0F2136]"
                  />
                  <span>Siège enfant (+1000 DA)</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optSecondDriver}
                    onChange={(e) => setOptSecondDriver(e.target.checked)}
                    className="rounded text-[#0F2136]"
                  />
                  <span>2ème conducteur (Offert)</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optAirportMeet}
                    onChange={(e) => setOptAirportMeet(e.target.checked)}
                    className="rounded text-[#0F2136]"
                  />
                  <span>Accueil aéroport vol</span>
                </label>
              </div>
            </div>

            {/* Client Coordinates */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <span className="block font-semibold text-slate-700">Vos coordonnées</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Nom & Prénom</label>
                  <input
                    type="text"
                    placeholder="Ex: Sofiane Bouzid"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2.5 text-xs focus:outline-none focus:border-[#0F2136]"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Téléphone joignable / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+213 5xx xx xx xx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2.5 text-xs focus:outline-none focus:border-[#0F2136]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2.5 text-xs focus:outline-none focus:border-[#0F2136]"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">N° de vol (si aéroport)</label>
                  <input
                    type="text"
                    placeholder="Ex: AH 1005 (Air Algérie)"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2.5 text-xs focus:outline-none focus:border-[#0F2136]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Demandes ou précisions particulières</label>
                <textarea
                  rows={2}
                  placeholder="Horaires spécifiques, livraison à une adresse précise..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2.5 text-xs focus:outline-none focus:border-[#0F2136]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Live Quote Box & Send Action */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Quote Card */}
          <div className="bg-[#0F2136] text-white border border-white/10 rounded-lg p-6 space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-display text-base font-bold text-white">Devis Calculé en Direct</span>
              <span className="text-xs bg-[#F2B705] text-[#0F2136] font-bold px-2 py-0.5 rounded">
                {selectedVehicle.category}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Véhicule sélectionné :</span>
                <span className="font-bold text-white">{vehicleName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Durée de location :</span>
                <span className="font-bold text-white">
                  {billableDays} jour(s) {isLessThanMinimum && '(min. 2 j)'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tarif journalier :</span>
                <span>{formatPrice(pricePerDay, currency)} / j</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Kilométrage inclus :</span>
                <span className="text-emerald-400 font-medium">{billableDays * 300} km (300 km/j)</span>
              </div>
              {optBabySeat && (
                <div className="flex justify-between text-slate-300">
                  <span>Option siège bébé :</span>
                  <span>{formatPrice(1000, currency)}</span>
                </div>
              )}
            </div>

            {isLessThanMinimum && (
              <div className="flex items-center gap-2 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 text-[11px]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>La durée minimale de location est de 2 jours (facturé 2 jours minimum).</span>
              </div>
            )}

            {/* Total Highlight */}
            <div className="pt-4 border-t border-white/10 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Total estimatif :</div>
              <div className="font-display text-3xl font-bold text-[#F2B705] tabular-nums">
                {formatPrice(totalEstimatedDA, currency)}
              </div>
              {currency !== 'DA' && (
                <div className="text-xs text-slate-400">
                  (soit environ {totalEstimatedDA.toLocaleString('fr-FR')} DA au taux de change actuel)
                </div>
              )}
              <div className="text-xs text-slate-300 pt-2">
                Caution requise : <strong className="text-white">{formatPrice(cautionAmount, currency)}</strong> (restituée à l'état des lieux de retour).
              </div>
            </div>

            {/* Direct Send CTAs */}
            <div className="pt-3 space-y-2.5">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Envoyer ma demande sur WhatsApp</span>
              </button>

              <button
                onClick={handleSendEmail}
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/20"
              >
                <Mail className="w-4 h-4" />
                <span>Ouvrir dans Gmail</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white rounded text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/10"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Résumé copié dans le presse-papier !' : 'Copier le récapitulatif'}</span>
              </button>
            </div>
          </div>

          {/* Direct Contact Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs text-xs">
            <h3 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wider">
              Coordonnées directes de l'agence
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Une question urgente ou un besoin particulier ? Contactez directement <strong>Walid Choukri</strong> :
            </p>

            <div className="space-y-3 pt-1 text-slate-700">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F2B705]" />
                <a href="tel:+213791596139" className="font-bold hover:underline">
                  +213 791 59 61 39
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <a
                  href="https://wa.me/213673371449"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                >
                  WhatsApp : +213 673 37 14 49
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href="mailto:choukriwalid00@gmail.com" className="hover:underline">
                  choukriwalid00@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800">Agence Béjaïa :</strong>
                  <span>Centre Commercial Ritaj Mall & Aéroports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
