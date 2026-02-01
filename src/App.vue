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
  {
    id: 3,
    name: 'iPhone 13 mini',
    picture: 'https://files.refurbed.com/ii/iphone-13-mini-1631709754.jpg',
    netPrice: 315,
    stock: 1,
  },
  {
    id: 4,
    name: 'Samsung Galaxi S25',
    picture: 'https://files.refurbed.com/ii/samsung-galaxy-s25-1737617765088880944.jpg',
    netPrice: 600,
    stock: 11,
  },
  {
    id: 5,
    name: 'iPhone 16',
    picture: 'https://files.refurbed.com/ii/iphone-16-1725945767515847653.jpg',
    netPrice: 510,
    stock: 23,
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
