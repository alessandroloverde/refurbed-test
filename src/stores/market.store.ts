import { defineStore } from 'pinia';
import { fetchExchangeRates } from '../services/currency.service';
import { fetchVatRates } from '../services/vat.service';
import { AVAILABLE_MARKETS } from '../domain/markets';

export const useMarketStore = defineStore('market', {
   state: () => ({
      selectedCountry: 'DE',
      exchangeRates: {} as Record<string, number>,
      vatRates: {} as Record<string, number>,
      loading: false,
      error: null as string | null,
   }),

   getters: {
      allMarkets() {
         return Object.values(AVAILABLE_MARKETS);
      },
      selectedMarket(state) {
         return AVAILABLE_MARKETS[state.selectedCountry as keyof typeof AVAILABLE_MARKETS];
      },
      exchangeRateForSelectedMarket(state) {
         const currency = AVAILABLE_MARKETS[state.selectedCountry as keyof typeof AVAILABLE_MARKETS].currency

         return state.exchangeRates[currency] ?? 1
      },
      vatRateForSelectedMarket(state) {
         const vatCode = AVAILABLE_MARKETS[state.selectedCountry as keyof typeof AVAILABLE_MARKETS].vatCountryCode;

         return state.vatRates[vatCode] ?? 0
      }
   },

   actions: {
      async loadMarketData() {
         if (Object.keys(this.exchangeRates).length > 0) return;
         if (Object.keys(this.vatRates).length > 0) return;

         try {
            this.loading = true;
            this.error = null;

            const [rates, vat] = await Promise.all([
               fetchExchangeRates('EUR'),
               fetchVatRates()
            ]);

            this.exchangeRates = rates;
            this.vatRates = vat;
         } catch (error) {
            this.error = `Failed to load market data: ${error}`;
         } finally {
            this.loading = false
         }
      },
      setCountry(countryCode: string) {
         this.selectedCountry = countryCode;
      }
   }
})