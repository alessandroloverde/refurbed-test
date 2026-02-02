export function calculateGrossPrice(netPriceEur, vatRate, exchangeRate) {
   return Math.round(netPriceEur * (1 + vatRate) * exchangeRate * 100) / 100
} 

export function formatPrice(locale, amount, currency = 'EUR') {
  const localeStr = typeof locale === 'string' ? locale : (locale?.value ?? 'en');
  return new Intl.NumberFormat(localeStr, {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}