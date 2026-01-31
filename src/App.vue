<script setup>
import { ref, onMounted } from 'vue';

const cart = ref([]);
const products = ref([
  {
    id: 1,
    name: 'iPhone 11',
    picture: 'https://files.refurbed.com/ii/iphone-11-pro-1619179577.jpg',
    price: 399,
    stock: 3,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S8',
    picture:
      'https://files.refurbed.com/ii/64-gb-schwarz-single-sim-1562659918.jpg',
    price: 275,
    stock: 5,
  },
]);

const vatConnectionTest = async () => {
  try {
    const response = await fetch('https://api.vatstack.com/v1/rates', {
      method: 'GET',
      headers: {
        'X-API-KEY': 'pk_live_2799371ddcc7b44086e2da1e9d22a4f3',
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log('VatStack connection OK:', data);
  } catch (error) {
    console.error('VatStack connection failed:', error);
  }
};

const currencyConnectionTest = async () => {
  try {
    const response = await fetch(
      'https://api.currencyapi.com/v3/latest?currencies=EUR%2CUSD%2CPLN',
      {
        method: 'GET',
        headers: {
          apikey: 'cur_live_0E5lRNI66c83ORLNBhXxrznnzyVRYIWKirEnVNMY',
        },
      }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log('😀 CurrencyAPI connection OK:', data);
  } catch (error) {
    console.error('🤬 CurrencyAPI connection failed:', error);
  }
};

const addToCart = id => {
  const product = { ...products.value[id] };
  product.quantity = 1;
  product.stock = product.stock - 1;
  cart.value.push(product);
};

const total = products => {
  return 0;
};

const vat_rates = async () => {
  try {
    const options = {
      method: 'GET',
      headers: { 'X-API-KEY': 'API-KEY' },
    };
    const url = 'https://api.vatstack.com/v1/rates';
    const response = await fetch(url, options);
    const data = await response.json();
    //console.log('Alessandro asks: ', data);
  } catch (error) {
    //console.error('Error fetching VAT rates:', error);
  }
};

const exchangeRates = async () => {
  const options = {
    method: 'GET',
  };
  const url = `https://api.currencyapi.com/v3/latest?apikey=API-KEY&currencies=EUR%2CUSD%2CPLN`;
  const response = await fetch(url, options);
  //console.log(response);
};

onMounted(() => {
  vatConnectionTest();
  currencyConnectionTest();
  vat_rates();
  exchangeRates();
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
          <p class="mb-2">{{ product.price }}</p>
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
              <td class="p-2">{{ product.price }}</td>
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
