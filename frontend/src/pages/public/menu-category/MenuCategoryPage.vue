<template>
    <v-container class="d-flex flex-column ga-6">
        <div>
            <div v-if="currentCategory" class="text-h5 font-weight-bold">
                {{ currentCategory.name }} 
            </div>

            <div v-if="currentCategory" class="text-subtitle-2 text-medium-emphasis">
                {{ currentCategory.total_items }} itens disponíveis
            </div>
        </div>

        <ProductGrid
            v-if="products.length"
            :products="products"
            @product-click="openProduct"
        />


        <div v-else class="text-center text-medium-emphasis">
            Nenhum produto encontrado.
        </div>

        <ProductDetailModal
            v-if="showProductModal"
            :dialog="showProductModal"
            :product="selectedProduct"
            @update:dialog="showProductModal = $event"
        />
    </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import { useProducts } from '../../../entities/product/model/useProducts.js';
import { useCategories } from '../../../entities/category/model/useCategories.js';
import ProductGrid from '../../../widgets/product-grid/ProductGrid.vue';

const ProductDetailModal = defineAsyncComponent(() => 
    import('../../../features/product-details-modal/ui/ProductDetailModal.vue')
);

const route = useRoute();

const { products, fetchProducts } = useProducts();
const { categories, fetchCategories } = useCategories();

const selectedProduct = ref(null);
const showProductModal = ref(false);

onMounted(async () => {
  await fetchCategories()

  const slug = route.params.category

  const category = categories.value.find(
    c => c.slug === slug
  )

  if (!category) return

  await fetchProducts(category.id)
});

const categoriesMap = computed(() => {
    return Object.fromEntries(
        categories.value.map((category) => [category.slug, category])
    )
});

const currentCategory = computed(() => {
  return categoriesMap.value[route.params.category] || null
});

function openProduct(product) {
    selectedProduct.value = product
    showProductModal.value = true
}
</script>