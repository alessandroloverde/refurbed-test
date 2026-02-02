<script setup>
import { ref, onMounted } from 'vue';
import { useMarketStore } from './stores/market.store';
import { useCartStore } from './stores/cart.store';
import { PRODUCT_CATALOG } from './domain/products';
import { calculateGrossPrice, formatPrice } from './utils/price'

const market = useMarketStore();
const cart = useCartStore();
const products = ref(PRODUCT_CATALOG.map((p) => ({ ...p })));


// ––– ℹ️ Add to cart function ––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const addToCart = product => {
  cart.addItem(product)
};


// ––– ℹ️ Remove from cart function ––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const removeFromCart = (item) => {
  const removedItem = cart.removeItem(item.id);

  if (!removedItem) return;

  const product = products.value.find(p => p.id === removedItem.id);

  if (product) {
    product.stock += removedItem.quantity;
  }
}


// ––– ℹ️ Gross price utility ––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Returns the market-adjusted gross price for a product (VAT + currency conversion)
const grossPrice = product => {
  return calculateGrossPrice(
    product.netPrice,
    market.vatRateForSelectedMarket,
    market.exchangeRateForSelectedMarket
  );
};


// ––– ℹ️ Stock label utility ––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Generates an availability label based on the onStock data
const stockLabel = (stock) => {
  if (stock <= 0) return 'No stock';
  if (stock <= 2) return `Only ${stock} remaining`;

  return 'In stock';
};


// ––– ℹ️ Line total helper ––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Line total in selected market currency: (net × qty) + VAT, converted via exchange rate
const lineTotal = (item) =>
  (item.netPrice * item.quantity * (1 + market.vatRateForSelectedMarket) * market.exchangeRateForSelectedMarket);

  
// ––– ℹ️ Load market data on mount ––––––––––––––––––––––––––––––––––––––––––––––––––––––––
onMounted(() => {
  market.loadMarketData();
});
</script>

<template>
  <div class="min-h-screen mainBkg">
    <header class="bg-[#332e80] p-4 w-full">
      <div class="mx-auto w-full max-w-6xl px-4 py-4 flex justify-between items-center">
        <img class="w-32" src="./assets/logo.svg" alt="Refurbed Logo" />
        <div class="flex items-center gap-2">
          <label for="market-select" class="text-[#f3ffef] text-sm">Market selected:</label>
          <select
            id="market-select"
            name="market-select"
            class="bg-white text-xs border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :value="market.selectedCountry"
            @change="market.setCountry($event.target.value)"
          >
            <option 
              v-for="m in market.allMarkets"
              :key="m.code"
              :value="m.code"
            >{{m.flag}} {{ m.label }} | {{ m.currency }}</option>
          </select>
        </div>
      </div>
    </header>
    
    <main class="mx-auto w-full max-w-6xl px-4 py-6">
      <div v-if="market.loading" class="flex items-center justify-center py-16">
        <div class="text-center text-gray-600">
          <div class="inline-block w-8 h-8 border-2 border-[#332e80] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p>Loading market data...</p>
        </div>
      </div>
      <div 
        v-else-if="market.error" 
        class="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg"
        role="alert"
      >
        <p class="text-red-700 mb-3">Failed to load prices.</p>
        <button
          type="button"
          class="px-4 py-2 bg-[#332e80] hover:bg-[#4540a0] text-white text-sm font-medium rounded cursor-pointer"
          @click="market.loadMarketData()"
        >
          Retry
        </button>
      </div>
      <template v-else>
        <h1 class="text-2xl font-bold mb-4 px-4">Mobile Phones</h1>
        <div class="grid grid-cols-3 gap-4 p-4 mb-4">
          <div
            class="bg-white rounded-xl p-4 shadow-md flex flex-col"
            v-for="(product) in products"
            :key="product.id"
          >
            <h3 class="text-lg font-semibold mb-3">{{ product.name }}</h3>

            <div class="grid grid-cols-[3fr_2fr] gap-3 mb-4">
              <img
                class="w-full aspect-square object-contain rounded-lg"
                :src="product.picture"
                :alt="product.name"
              />
              <div class="flex flex-col justify-center">
                <p class="text-xl font-bold mb-1">{{grossPrice(product) }} {{ market.selectedMarket?.currency }} </p>
                <p
                  class="text-sm"
                  :class="{
                    'text-green-600': product.stock > 2,
                    'text-amber-600': product.stock > 0 && product.stock <= 2,
                    'text-red-600': product.stock <= 0
                  }"
                >
                  {{ stockLabel(product.stock) }}
                </p>
              </div>
            </div>

            <button
              class="w-full py-2 px-4 bg-[#332e80] hover:bg-[#4540a0] active:bg-[#1e1a5e] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-white rounded-lg text-sm font-medium transition-colors"
              :disabled="product.stock <= 0"
              aria-label="Add {{ product.name }} to cart"
              @click="addToCart(product)"
            >
              Add to cart
            </button>
          </div>
      </div>

      <div class="p-4 m-4 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl mb-4">🛒 Your Cart</h2>

        <div class="grid grid-cols-[1fr_auto_6rem_8rem] gap-3 py-2 border-b border-gray-200 text-sm font-medium text-gray-500">
          <span>Product</span>
          <span></span>
          <span class="text-center">Quantity</span>
          <span class="text-right">Price</span>
        </div>

        <div
          v-for="item in cart.items"
          :key="item.id"
          class="grid grid-cols-[1fr_auto_6rem_8rem] gap-3 py-3 border-b border-gray-100 text-sm items-center"
        >
          <span class="font-medium">{{ item.name }}</span>
          <button
            type="button"
            class="px-3 py-1 text-sm font-medium text-[#332e80] hover:text-[#4540a0] border border-[#332e80] hover:border-[#4540a0] rounded cursor-pointer"
            aria-label="Remove {{ item.name }} from cart"
            @click="removeFromCart(item)"
          >
            Remove
          </button>
          <span class="text-center">{{ item.quantity }}</span>
          <span class="text-right">{{ formatPrice(market.selectedMarket?.locale ?? 'en', lineTotal(item), market.selectedMarket?.currency) }}</span>
        </div>

        <div class="mt-4 space-y-2 pt-4 border-t border-gray-200">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Net price</span>
            <span>{{ formatPrice(market.selectedMarket?.locale ?? 'en', cart.netTotal, market.selectedMarket?.currency) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">VAT</span>
            <span>{{ formatPrice(market.selectedMarket?.locale ?? 'en', cart.vatTotal, market.selectedMarket?.currency) }}</span>
          </div>
          <div class="flex justify-between font-bold pt-2">
            <span>Total price</span>
            <span>{{ formatPrice(market.selectedMarket?.locale ?? 'en', cart.grossTotal, market.selectedMarket?.currency) }}</span>
          </div>
        </div>
      </div>
      </template>
    </main>
  </div>
</template>
