<script setup>
import { ref, onMounted } from 'vue';
import { useMarketStore } from './stores/market.store';

const market = useMarketStore();

const countries = [
  {
    name: "Czech Republik",
    en_name: "Czech Republic",
    currency: "CZK",
    currency_name: "Czech Republic Koruna",
    currency_value: 0.456,
    vat: 21,
    flag: null
  }
]
const cart = ref([]);
const products = ref([
  {
    id: 1,
    name: 'iPhone 11',
    picture: 'https://files.refurbed.com/ii/iphone-11-pro-1619179577.jpg',
    netPrice: 399,
    stock: 3,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S8',
    picture: 'https://files.refurbed.com/ii/64-gb-schwarz-single-sim-1562659918.jpg',
    netPrice: 275,
    stock: 5,
  },
]);


const addToCart = id => {
  const product = { ...products.value[id] };
  product.quantity = 1;
  product.stock = product.stock - 1;
  cart.value.push(product);
};

const total = products => {
  return 0;
};


onMounted(() => {
  market.loadMarketData();
});
</script>

<template>
  <div class="min-h-screen">
    <header class="bg-[#332e80] p-4 w-full">
      <div class="mx-auto w-full max-w-6xl px-4 py-4">
        <select
          class="bg-white text-xs border border-gray-200 rounded p-2 float-right"
        >
          <option selected>DE (EUR)</option>
          <option>PL (PLN)</option>
        </select>

        <img class="w-32" src="./assets/logo.svg" />
      </div>
    </header>
    <main class="mx-auto w-full max-w-6xl px-4 py-6">
      <div class="grid grid-cols-3 gap-4 p-4 mb-4">
        <div
          class="bg-white rounded-xl p-4 shadow-md"
          v-for="(product, index) in products"
          :key="product.id"
        >
          <img class="w-32" :src="product.picture" />
          <h3 class="text-xl mb-2">{{ product.name }}</h3>
          <p class="mb-2">{{ product.netPrice }}</p>
          <div
            class="py-2 px-4 bg-[#332e80] hover:bg-[#27237a] text-white rounded-lg shadow-md float-right"
            @click="addToCart(index)"
            :disabled="product.stock < 0"
          >
            Add to cart
          </div>
        </div>
      </div>

      <div class="p-4 m-4 bg-white shadow-md">
      TOPO
          <p>Country: {{ market.selectedCountry }}</p>
          <button
            class="px-3 py-1.5 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition"
            @click="market.setCountry('PL')">Set PL</button>

        <ul class="text-xs font-mono bg-gray-50 border rounded p-3 space-y-1 max-w-sm">
          <li
            v-for="(rate, currency) in market.exchangeRates"
            :key="currency"
            class="flex justify-between"
          >
            <span>{{ currency }}</span>
            <span>{{ rate }}</span>
          </li>
        </ul>

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
            <tr v-for="product in cart" :key="product.id">
              <td class="p-2">{{ product.name }}</td>
              <td class="p-2">{{ product.quantity }}</td>
              <td class="p-2">{{ product.netPrice }}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <p class="m-2">Net: 0</p>
        <p class="m-2">VAT: 0</p>
        <p class="m-2 font-bold">Total: {{ total(cart) }}</p>
      </div>
    </main>
  </div>
</template>
