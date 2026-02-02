export function calculateGrossPrice(netPriceEur, vatRate, exchangeRate) {
   return Math.round(netPriceEur * (1 + vatRate) * exchangeRate * 100) / 100
} 

export function formatPrice(locale, amount, currency = 'EUR') {
   return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
 }