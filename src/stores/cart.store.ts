import { defineStore } from 'pinia';
import { useMarketStore } from './market.store';


interface CartItem {
   id: number;
   name: string;
   netPrice: number;
   quantity: number;
}
interface Product {
   id: number;
   name: string;
   picture: string;
   netPrice: number;
   stock: number
}

export const useCartStore = defineStore('cart', {
   state: () => ({
      items: [] as CartItem[],
   }),

   getters: {
      // Base calculation: net total in EUR (before exchange rate conversion)
      netTotalEur(state): number {
         return state.items.reduce(
           (sum, item) => sum + item.netPrice * item.quantity,
           0
         );
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      netTotal(_state): number {
         const market = useMarketStore();
         return this.netTotalEur * (market.exchangeRateForSelectedMarket ?? 1);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      vatTotal(_state): number {
         const market = useMarketStore();
         const vatAmount = this.netTotalEur * (market.vatRateForSelectedMarket ?? 0);
         const exchangeRate = market.exchangeRateForSelectedMarket ?? 1;
         
         return vatAmount * exchangeRate; 
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      grossTotal(_state): number {
         const market = useMarketStore();
         const grossEur = this.netTotalEur * (1 + (market.vatRateForSelectedMarket ?? 0));
         const exchangeRate = market.exchangeRateForSelectedMarket ?? 1;

         return grossEur * exchangeRate;
      },
   },

   actions: {
      addItem(product: Product) {
         if (product.stock <= 0) return;

         const existingItem = this.items.find(item => item.id === product.id)

         if (existingItem) {
            existingItem.quantity += 1
         } else {
            this.items.push({
               id: product.id,
               name: product.name,
               netPrice: product.netPrice,
               quantity: 1,
            });
         }
      },
      removeItem(productId: number) {
         const index = this.items.findIndex(item => item.id === productId);

         if(index === -1) return;

         const [removedItem] = this.items.splice(index, 1);

         return removedItem;
      }
   }
});