import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Karim Boukhedna',
    city: 'Béjaïa',
    rating: 5,
    date: '18 Mars 2026',
    rentalType: 'Vacances',
    vehicleUsed: 'Volkswagen Taos 2026',
    comment:
      'Expérience impeccable du début à la fin ! Véhicule livré pile à l’heure à l’aéroport Soummam de Béjaïa, intérieur étincelant avec le plein fait. Le Taos a été parfait pour notre séjour en famille à Tichy et Aokas. Walid est très professionnel et arrangeant. Caution rendue immédiatement au retour.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Samir & Amina L.',
    city: 'Alger / Paris',
    rating: 5,
    date: '4 Février 2026',
    rentalType: 'Mariage',
    vehicleUsed: 'Audi Q3 2026',
    comment:
      'Nous avons loué l’Audi Q3 pour notre cortège de mariage entre Alger et Béjaïa. La voiture est somptueuse, dans un état neuf irréprochable. Tous les invités l’ont remarquée. Merci à Walid pour sa disponibilité sur WhatsApp et son sérieux. Je recommande les yeux fermés !',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Mehdi Taleb',
    city: 'Alger',
    rating: 5,
    date: '22 Janvier 2026',
    rentalType: 'Affaires',
    vehicleUsed: 'Toyota Corolla 2025',
    comment:
      'Habitué des locations professionnelles, j’ai particulièrement apprécié la rapidité des formalités et la clarté du contrat. La Corolla est extrêmement douce sur l’autoroute Est-Ouest, sobre en carburant et très silencieuse. Service 5 étoiles.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Yassine M.',
    city: 'Marseille / Béjaïa',
    rating: 5,
    date: '12 Décembre 2025',
    rentalType: 'Aéroport',
    vehicleUsed: 'Volkswagen Polo 2025',
    comment:
      'Arrivé par vol Air Algérie tard le soir à Béjaïa, Walid m’attendait avec la Polo prête et propre. Boîte automatique très réactive, CarPlay fonctionne direct, super maniable. Aucun frais caché, prix annoncé = prix payé.',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Nadia Cherif',
    city: 'Tizi Ouzou',
    rating: 5,
    date: '28 Novembre 2025',
    rentalType: 'Vacances',
    vehicleUsed: 'Volkswagen Taos 2026',
    comment:
      'Excellente agence ! Très bon contact, véhicules très récents 2025-2026 introuvables ailleurs à ce niveau de propreté. Le grand coffre du Taos a accueilli toutes nos valises sans souci.',
    verified: true,
  },
  {
    id: 'rev-6',
    author: 'Sofiane Brahimi',
    city: 'Alger',
    rating: 5,
    date: '15 Octobre 2025',
    rentalType: 'Aéroport',
    vehicleUsed: 'Audi Q3 2026',
    comment:
      'Livraison à l’aéroport Houari Boumédiène sans la moindre attente. L’équipe suit votre numéro de vol et s’adapte aux retards. Caution restituée en mains propres sans discussion après vérification rapide.',
    verified: true,
  },
];
