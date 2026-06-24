<template></template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCategories } from '../../../entities/category/model/useCategories'

const router = useRouter()

const { categories, fetchCategories } = useCategories()

onMounted(() => {
  fetchCategories()
})

watch(
  categories,
  (value) => {
    const firstCategory = value?.[0]

    if (!firstCategory) return

    router.replace({
      name: 'MenuCategory',
      params: {
        category: firstCategory.slug
      }
    })
  },
  { immediate: true }
)
</script>