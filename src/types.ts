export type CurrencyCode = 'DA' | 'EUR' | 'USD' | 'CAD' | 'GBP';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: 'Citadine' | 'SUV Urbain' | 'Berline' | 'SUV Premium';
  color: string;
  transmission: 'Automatique' | 'Manuelle';
  fuelType: 'Essence' | 'Diesel';
  seats: number;
  luggage: number;
  doors: number;
  pricePerDayDA: number;
  cautionDA: number;
  available: boolean;
  image: string;
  shortDescription: string;
  // Technical details
  engine: string;
  displacement: string;
  powerHP: number;
  fuelConsumption100km: string;
  tankCapacityLiters: number;
  trunkVolumeLiters: number;
  features: string[];
  safety: string[];
  maintenanceStatus: string;
  recommendedFuel: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  rentalType: 'Vacances' | 'Aéroport' | 'Mariage' | 'Affaires';
  vehicleUsed: string;
  comment: string;
  verified: boolean;
}

export interface QuoteFormData {
  vehicleId: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  fullName: string;
  phone: string;
  email: string;
  currency: CurrencyCode;
  flightNumber?: string;
  withBabySeat: boolean;
  withAdditionalDriver: boolean;
  withAirportMeetAndGreet: boolean;
  notes?: string;
}
