<template>
  <v-list-item
    :to="{
      name: 'MenuCategory',
      params: {
        category: category.slug
      }
    }"
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
defineProps({
  category: {
    type: Object,
    required: true
  }
});
</script>