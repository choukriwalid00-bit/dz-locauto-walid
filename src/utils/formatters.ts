import { CurrencyCode } from '../types';
import { CURRENCY_RATES, CURRENCY_SYMBOLS } from '../data/fleetData';

export function formatPrice(amountDA: number, currency: CurrencyCode): string {
  const rate = CURRENCY_RATES[currency] || 1;
  const converted = amountDA * rate;

  if (currency === 'DA') {
    return `${amountDA.toLocaleString('fr-FR')} DA`;
  }

  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  return `${Math.round(converted).toLocaleString('fr-FR')} ${symbol}`;
}

export function calculateDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function getAgencyStatus(): { status: 'open' | 'soon' | 'closed'; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Schedule: Sat-Thu 8h-22h | Fri 14h-22h
  const openMinutes = day === 5 ? 14 * 60 : 8 * 60;
  const closeMinutes = 22 * 60;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes - 30) {
    return { status: 'open', label: 'Ouvert actuellement (8h–22h)' };
  } else if (currentMinutes >= closeMinutes - 30 && currentMinutes < closeMinutes) {
    return { status: 'soon', label: 'Ferme bientôt (à 22h)' };
  } else if (currentMinutes >= openMinutes - 30 && currentMinutes < openMinutes) {
    return { status: 'soon', label: 'Ouvre bientôt' };
  } else {
    return { status: 'closed', label: 'Fermé actuellement' };
  }
}
