<script setup lang="ts">
const props = defineProps<{ labels: string[] }>();
const active = ref(0);

function select(index: number): void {
  active.value = index;
}
</script>

<template>
  <div class="tabs">
    <button
      v-for="(label, index) in props.labels"
      :key="index"
      :class="{ on: index === active }"
      @click="select(index)"
    >
      {{ label }}
    </button>
  </div>
</template>
