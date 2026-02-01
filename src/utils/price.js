export function calculateGrossPrice(netPriceEur, vatRate, exchangeRate) {
   return Math.round(netPriceEur * (1 + vatRate) * exchangeRate * 100) / 100
} 
