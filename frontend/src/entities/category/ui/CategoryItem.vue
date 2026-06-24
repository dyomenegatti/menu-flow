<template>
  <v-list-item
    v-if="variant === 'sidebar'"
    :to="route"
    router
    rounded="pill"
    class="mx-2 my-1 ps-4"
    color="primary"
  >
    <v-list-item-title>
      {{ category.name }}
    </v-list-item-title>

    <template #append>
      <v-chip
        size="small"
        variant="tonal"
      >
        {{ category.total_items }}
      </v-chip>
    </template>
  </v-list-item>

  <v-btn
    v-else-if="variant === 'tab'"
    :to="route"
    rounded="pill"
    variant="flat"
    class="category-tab mr-2"
  >
    {{ category.name }}
  </v-btn>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  category: {
    type: Object,
    required: true
  },

  variant: {
    type: String,
    default: 'sidebar',
    validator: value => ['sidebar', 'tab'].includes(value)
  }
});

const route = computed(() => ({
  name: 'MenuCategory',
  params: {
    category: props.category.slug
  }
}));
</script>

<style scoped>
.category-tab {
  text-transform: none;
}
</style>