<script setup>
defineProps({
  disabled: { type: Boolean, default: false },
  ariaLabel: { type: String, default: 'Add to cart' },
});
defineEmits(['click']);
</script>

<template>
  <button
    type="button"
    class="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-white rounded-lg text-sm font-medium transition-colors"
    :class="{
      'bg-[#455F96] hover:bg-[#5a7ab8] active:bg-[#3a4f7a]': !disabled,
    }"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    Add to cart
  </button>
</template>
