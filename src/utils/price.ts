export function calculateGrossPrice(netPriceEur: number, vatRate: number, exchangeRate: number) {
   return Math.round(netPriceEur * (1 + vatRate) * exchangeRate * 100) / 100
} 

export function formatPrice(locale: string | { value: string }, amount: number, currency = 'EUR') {
  const localeStr = typeof locale === 'string' ? locale : (locale?.value ?? 'en');
  return new Intl.NumberFormat(localeStr, {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}