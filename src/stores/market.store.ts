import { defineStore } from 'pinia';
import { fetchExchangeRates } from '../services/currency.service';
import { fetchVatRates } from '../services/vat.service';

export const useMarketStore = defineStore('market', {
   state: () => ({
      selectedCountry: 'DE',
      exchangeRates: {} as Record<string, number>,
      vatRates: {} as Record<string, number>,
      loading: false,
      error: null as string | null
   }),

   actions: {
      async loadMarketData() {
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