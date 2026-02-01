<script setup>
import { ref, onMounted } from 'vue';
import { useMarketStore } from './stores/market.store';
import { useCartStore } from './stores/cart.store';
import { PRODUCT_CATALOG } from './domain/products';

const market = useMarketStore();

const cart = useCartStore();
const products = ref(PRODUCT_CATALOG.map((p) => ({ ...p })));


const addToCart = product => {
  cart.addItem(product)
};



const total = products => {
  return 0;
};

const stockLabel = (stock) => {
  if (stock <= 0) return 'No stock';
  if (stock <= 2) return `Only ${stock} remaining`;
  return 'In stock';
};


onMounted(() => {
  market.loadMarketData();
});
</script>

<template>
  <div class="min-h-screen mainBkg">
    <header class="bg-[#332e80] p-4 w-full">
      <div class="mx-auto w-full max-w-6xl px-4 py-4 flex justify-between items-center">
        <img class="w-32" src="./assets/logo.svg" />

        <select 
          class="bg-white text-xs border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          :value="market.selectedCountry"
        >
          <option 
            v-for="m in market.allMarkets"
            :key="m.code"
            :value="m.code"
          >{{m.flag}} {{ m.label }} | {{ m.currency }}</option>
        </select>
      </div>
    </header>
    
    <main class="mx-auto w-full max-w-6xl px-4 py-6">
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
              <p class="text-xl font-bold mb-1">{{ product.netPrice }} {{ market.availableMarkets?.currency ?? 'EUR' }}</p>
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
            @click="addToCart(product)"
          >
            Add to cart
          </button>
        </div>
      </div>

      <div class="p-4 m-4 bg-white shadow-md">
        <h2 class="text-2xl mb-2">Cart</h2>
        <hr />
        <table class="table-fixed">
          <thead>
            <tr>
              <th class="w-1/2 text-left p-2">Product</th>
              <th class="w-1/4 p-2">Quantity</th>
              <th class="w-1/4 text-right p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.items" :key="item.id">
              <td class="p-2">{{ item.name }}</td>
              <td class="p-2">{{ item.quantity }}</td>
              <td class="p-2">{{ item.netPrice }}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <p class="m-2">Net: 0</p>
        <p class="m-2">VAT: 0</p>
        <p class="m-2 font-bold">Total: {{ cart.netTotal }}</p>
      </div>
    </main>
  </div>
</template>
