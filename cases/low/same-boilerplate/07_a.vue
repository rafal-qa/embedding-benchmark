<script setup lang="ts">
const red = ref(0);
const green = ref(0);
const blue = ref(0);

const hex = computed(() => {
  const channel = (value: number) => value.toString(16).padStart(2, '0');
  return `#${channel(red.value)}${channel(green.value)}${channel(blue.value)}`;
});
</script>

<template>
  <div class="picker" :style="{ background: hex }">
    <input type="range" max="255" v-model.number="red" />
    <input type="range" max="255" v-model.number="green" />
    <input type="range" max="255" v-model.number="blue" />
    <span>{{ hex }}</span>
  </div>
</template>
