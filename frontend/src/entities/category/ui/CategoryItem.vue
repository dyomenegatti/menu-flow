<template>
  <v-list-item
    :to="route"
    router
    rounded="lg"
    class="mx-3 my-1"
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
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  category: {
    type: Object,
    required: true,
    validator(value) {
      return (
        value.slug &&
        value.name &&
        typeof value.total_items !== 'undefined'
      )
    }
  }
});

const route = computed(() => ({
  name: 'MenuCategory',
  params: {
    category: props.category.slug
  }
}));
</script>