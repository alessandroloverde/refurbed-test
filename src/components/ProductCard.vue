<script setup>
import AddToCartButton from './AddToCartButton.vue';

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

    <AddToCartButton
      :disabled="product.stock <= 0"
      :aria-label="`Add ${product.name} to cart`"
      @click="$emit('add-to-cart', product)"
    />
  </div>
</template>
