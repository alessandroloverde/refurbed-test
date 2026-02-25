<script setup>
defineProps({
  product: { type: Object, required: true },
  grossPriceFormatted: { type: String, required: true },
  stockLabelText: { type: String, required: true },
  currency: { type: String, default: 'EUR' },
});
defineEmits(['add-to-cart']);
</script>

<template>
  <div class="bg-white rounded-xl p-4 shadow-md flex flex-col">
    <h3 class="text-lg font-semibold mb-3">{{ product.name }}</h3>

    <div class="grid grid-cols-[3fr_2fr] gap-3 mb-4">
      <img
        class="w-full aspect-square object-contain rounded-lg"
        :src="product.picture"
        :alt="product.name"
      />
      <div class="flex flex-col justify-center">
        <p class="text-xl font-bold mb-1">{{ grossPriceFormatted }} {{ currency }}</p>
        <p
          class="text-sm"
          :class="{
            'text-green-600': product.stock > 2,
            'text-amber-600': product.stock > 0 && product.stock <= 2,
            'text-red-600': product.stock <= 0
          }"
        >
          {{ stockLabelText }}
        </p>
      </div>
    </div>

    <button
      class="w-full py-2 px-4 bg-[#332e80] hover:bg-[#4540a0] active:bg-[#1e1a5e] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-white rounded-lg text-sm font-medium transition-colors"
      :disabled="product.stock <= 0"
      :aria-label="`Add ${product.name} to cart`"
      @click="$emit('add-to-cart', product)"
    >
      Add to cart
    </button>
  </div>
</template>
