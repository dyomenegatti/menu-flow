<template>
  <BaseSelect 
    :model-value="modelValue"
    :items="categories"
    item-title="name"
    item-value="id"
    color="primary"
    @update:model-value="handleCategoryChange"
  />
</template>

<script setup>
import { useRouter } from 'vuetify/lib/composables/router.mjs';
import BaseSelect from '../../../shared/ui/select/BaseSelect.vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: null
  },
});

const emit = defineEmits(['update:modelValue']);

const router = useRouter();

function handleCategoryChange(categoryId) {
  emit('update:modelValue', categoryId);

  const category = props.categories.find(
    category => category.id === categoryId
  );

  if(!category) return;

  router.push({
    name: 'MenuCategory',
    params: {
      category: category.slug
    }
  });
}
</script>