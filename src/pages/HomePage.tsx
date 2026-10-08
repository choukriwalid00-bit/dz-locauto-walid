import React, { useState } from 'react';
import { Review, CurrencyCode } from '../types';
import { INITIAL_REVIEWS } from '../data/reviewsData';
import { Star, ShieldCheck, CheckCircle2, Plane, HeartHandshake, Car, Sparkles, PlusCircle } from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  currency: CurrencyCode;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newType, setNewType] = useState<'Vacances' | 'Aéroport' | 'Mariage' | 'Affaires'>('Vacances');
  const [newVehicle, setNewVehicle] = useState('Volkswagen Taos 2026');
  const [newComment, setNewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredReviews =
    selectedCategory === 'Tous'
      ? reviews
      : reviews.filter((r) => r.rentalType === selectedCategory);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      city: newCity.trim() || 'Béjaïa',
      rating: newRating,
      date: "Aujourd'hui",
      rentalType: newType,
      vehicleUsed: newVehicle,
      comment: newComment.trim(),
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowAddReviewModal(false);
      setNewAuthor('');
      setNewCity('');
      setNewComment('');
    }, 1500);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#0F2136] text-white pt-16 pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300">
                <span className="w-8 h-0.5 bg-[#F2B705]" />
                <span className="text-[#F2B705]">BÉJAÏA · ALGER · AÉROPORTS</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Roulez différent, <br />
                <span className="text-[#F2B705]">en toute sérénité.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Véhicules neufs 2025 et 2026 rigoureusement révisés, livrés lavés et désinfectés
                avec le plein pour vos voyages d’affaires, vacances sur la côte ou cérémonies de mariage.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('flotte')}
                  className="px-6 py-3.5 bg-[#F2B705] hover:bg-[#d9a203] text-[#0F2136] font-bold rounded text-sm transition-colors cursor-pointer shadow-md"
                >
                  Découvrir la flotte 2025–2026
                </button>
                <button
                  onClick={() => setActiveTab('devis')}
                  className="px-6 py-3.5 bg-transparent hover:bg-white/5 text-white border border-white/20 font-semibold rounded text-sm transition-colors cursor-pointer"
                >
                  Simuler un devis gratuit
                </button>
              </div>

              {/* Key trust numbers */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Véhicules 2025-2026</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    4.9 / 5
                  </div>
                  <div className="text-xs text-slate-400 mt-1">148 avis clients vérifiés</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    2 Aéroports
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Béjaïa & Alger 24h/24</div>
                </div>
              </div>
            </div>

            {/* Visual Hero Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#16314F] border border-white/10 rounded-lg p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between text-xs text-slate-300 pb-3 border-b border-white/10">
                  <span className="font-semibold text-white">DZ LocAuto Walid</span>
                  <span className="text-[#F2B705]">Flotte Officielle</span>
                </div>

                <div className="relative rounded overflow-hidden aspect-video bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80"
                    alt="Audi Q3 DZ LocAuto Walid"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#F2B705] text-[#0F2136] text-xs font-bold px-2.5 py-1 rounded-sm shadow-sm">
                    Audi Q3 2026 disponible
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-lg font-bold text-white">Audi Q3 S-Line 2026</h3>
                    <span className="text-sm font-bold text-[#F2B705]">20 000 DA / jour</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    Boîte automatique, GPS, toit panoramique et intérieur cuir. Le choix privilégié pour vos mariages et déplacements VIP.
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setActiveTab('technique')}
                    className="flex-1 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded text-center transition-colors"
                  >
                    Fiche technique
                  </button>
                  <button
                    onClick={() => setActiveTab('devis')}
                    className="flex-1 py-2 text-xs font-bold text-[#0F2136] bg-[#F2B705] hover:bg-[#d9a203] rounded text-center transition-colors"
                  >
                    Réserver maintenant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entreprise Presentation Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-[#d9a203] tracking-widest uppercase">
              Qui sommes-nous ?
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 leading-tight">
              Une agence locale engagée pour votre confort de route.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Fondée et dirigée par <strong>Walid Choukri</strong>, DZ LocAuto Walid est née d’un constat simple :
              les voyageurs en Algérie méritent des voitures récentes, fiables et propres, avec des conditions
              claires et une relation de confiance dès le premier échange.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Basés à <strong>Béjaïa</strong> (agence centrale au Ritaj Mall) et actifs à <strong>Alger</strong>,
              nous couvrons tous vos besoins : navette aéroport, tourisme sur la côte kabyle, rendez-vous d’affaires
              ou célébration de mariage.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Véhicules récents (mises en circulation 2025 et 2026)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparence absolue : caution et tarifs fixés à l'avance</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Accueil personnalisé aux aéroports Soummam et Houari Boumédiène</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-900">
                <ShieldCheck className="w-5 h-5 text-[#0F2136]" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Zéro surprise sur la caution
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                40 000 DA (Polo, Taos, Corolla) ou 80 000 DA (Audi Q3), restituée immédiatement
                à la fin de la location après l’état des lieux contradictoire.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-900">
                <Plane className="w-5 h-5 text-[#0F2136]" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Prise en charge aéroport
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nous suivons votre vol en temps réel. Même en cas de retard d’avion, votre véhicule
                vous attend à la sortie du terminal à Béjaïa ou Alger.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-900">
                <Sparkles className="w-5 h-5 text-[#0F2136]" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Nettoyage & Plein fait
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chaque véhicule est lavé et désinfecté avant remise des clés. Politique carburant
                équitable : plein au départ, plein au retour.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-900">
                <HeartHandshake className="w-5 h-5 text-[#0F2136]" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Service client réactif
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contact direct par appel ou WhatsApp avec Walid. Réponse rapide pour toute prolongation,
                conseil d’itinéraire ou demande spécifique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#d9a203] tracking-widest uppercase">
              Nos prestations adaptées
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Des solutions pour chaque type de trajet.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">01. Vacances & Tourisme</div>
              <h4 className="font-display text-lg font-bold text-slate-900">Séjours & Découverte</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Parcourez les paysages de Béjaïa (Cap Carbon, Pic des Singes, Aokas, Tichy) et d’Alger en totale liberté
                grâce à 300 km inclus par jour et un véhicule confortable et climatisé.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">02. Mariages & Fêtes</div>
              <h4 className="font-display text-lg font-bold text-slate-900">Cortèges & Événements</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Faites sensation pour votre cortège avec notre <strong>Audi Q3 S-Line 2026</strong> ou notre berline <strong>Toyota Corolla</strong>.
                Possibilité de mise à disposition d’un chauffeur courtois et ponctuel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">03. Professionnels</div>
              <h4 className="font-display text-lg font-bold text-slate-900">Déplacements d’Affaires</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Facturation claire, formalités express et remise du véhicule à l’hôtel ou à l’aéroport pour vos
                missions et réunions à Alger ou dans la région de Béjaïa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#d9a203] tracking-widest uppercase">
              Témoignages certifiés
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Ce que disent nos clients.
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-800">4.9 sur 5</span>
              <span>· Basé sur les réservations récentes</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddReviewModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0F2136] bg-[#F2B705] hover:bg-[#d9a203] rounded cursor-pointer transition-colors shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              Laisser un avis
            </button>
          </div>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {['Tous', 'Vacances', 'Aéroport', 'Mariage', 'Affaires'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0F2136] text-white shadow-xs'
                  : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">
                    {rev.city} · {rev.rentalType}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Véhicule</span>
                  <span className="text-[11px] font-medium text-slate-700">{rev.vehicleUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal: Add Review */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Partager votre expérience
              </h3>
              <button
                onClick={() => setShowAddReviewModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-900">Merci pour votre avis !</h4>
                <p className="text-xs text-slate-500">Votre témoignage a été ajouté avec succès.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Votre Nom & Prénom</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Ex: Mehdi K."
                      className="w-full border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-[#0F2136]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Ville / Pays</label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="Ex: Béjaïa / Lyon"
                      className="w-full border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-[#0F2136]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Type de location</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as any)}
                      className="w-full border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-[#0F2136]"
                    >
                      <option value="Vacances">Vacances</option>
                      <option value="Aéroport">Aéroport</option>
                      <option value="Mariage">Mariage</option>
                      <option value="Affaires">Affaires</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Véhicule loué</label>
                    <select
                      value={newVehicle}
                      onChange={(e) => setNewVehicle(e.target.value)}
                      className="w-full border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-[#0F2136]"
                    >
                      <option value="Volkswagen Polo 2025">Volkswagen Polo 2025</option>
                      <option value="Volkswagen Taos 2026">Volkswagen Taos 2026</option>
                      <option value="Toyota Corolla 2025">Toyota Corolla 2025</option>
                      <option value="Audi Q3 2026">Audi Q3 2026</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Note globale</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Votre commentaire</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Partagez votre avis sur l'accueil, la propreté du véhicule et la ponctualité..."
                    className="w-full border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-[#0F2136]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReviewModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-600 rounded hover:bg-slate-100"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0F2136] text-white font-bold rounded hover:bg-[#16314F]"
                  >
                    Publier l'avis
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Pre-footer Call to Action Band */}
      <section className="bg-[#F2B705] text-[#0F2136] py-12 rounded-lg max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold">
              Besoin d’un véhicule pour ce week-end ou votre prochain vol ?
            </h3>
            <p className="text-sm font-medium text-slate-800">
              Réservation garantie en 2 minutes avec confirmation directe de Walid sur WhatsApp.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('devis')}
            className="px-6 py-3.5 bg-[#0F2136] hover:bg-[#16314F] text-white font-bold rounded text-sm transition-colors whitespace-nowrap cursor-pointer shadow-md"
          >
            Faire une demande de devis →
          </button>
        </div>
      </section>
    </div>
  );
};
