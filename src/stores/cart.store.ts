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
      netTotal(state) {
         return state.items.reduce((sum, item) => sum + item.netPrice * item.quantity, 0);
      },
      vatTotal(state) {
         const market = useMarketStore();
         const net = state.items.reduce(
            (sum, item) => sum + item.netPrice * item.quantity,
            0
         );
         return net * (market.vatRateForSelectedMarket ?? 0);
      },
      grossTotal(state) {
         const market = useMarketStore();
         const net = state.items.reduce(
            (sum, item) => sum + item.netPrice * item.quantity,
            0
         );
         return net * (1 + (market.vatRateForSelectedMarket ?? 0));
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

         product.stock -= 1;
      }
   }
});