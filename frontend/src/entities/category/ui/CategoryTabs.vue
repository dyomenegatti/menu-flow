<template>
  <div class="category-tabs">
    <v-slide-group show-arrows>
      <v-slide-group-item
        v-for="category in categories"
        :key="category.id"
      >
        <CategoryItem
          :category="category"
          variant="tab"
        />
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script setup>
import CategoryItem from './CategoryItem.vue';

defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});
</script>