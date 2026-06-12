<template>
    <v-container class="d-flex flex-column ga-6">
        <div>
            <div
                v-if="currentCategory"
                class="text-h5 font-weight-bold"
            >
                {{ currentCategory.name }} 
            </div>

            <div
                v-if="currentCategory" 
                class="text-subtitle-2 text-medium-emphasis"
            >
                {{ currentCategory.total_items }} itens disponíveis
            </div>
        </div>

        <ProductGrid
            v-if="products.length"
            :products="products"
            @product-click="openProduct"
        />

        <div
            v-else
            class="text-center text-medium-emphasis"
        >
            Nenhum produto encontrado.
        </div>

        <ProductDetailModal
            :dialog="showProductModal"
            :product="selectedProduct"
            @update:dialog="showProductModal = $event"
        />
    </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProducts } from '../../../entities/product/model/useProducts.js';
import { useCategories } from '../../../entities/category/model/useCategories.js';
import ProductGrid from '../../../widgets/product-grid/ProductGrid.vue';
import ProductDetailModal from '../../../features/product-details-modal/ui/ProductDetailModal.vue';

const route = useRoute();

const {
    products,
    fetchProducts
} = useProducts();

const {
    categories
} = useCategories();

console.log(categories.value);

const categoriesMap = computed(() =>
    Object.fromEntries(
        categories.value.map(category => [
            category.slug,
            category
        ])
    )
);

const currentCategory = computed(() =>
    categoriesMap.value[route.params.category]
);

watch(
    currentCategory,
    async (category) => {
        if (!category) return;

        try {
            await fetchProducts(category.id);
        } catch (error) {
            console.error(error);
        }
    },
    { immediate: true }
);

const selectedProduct = ref(null);
const showProductModal = ref(false);

function openProduct(product) {
    selectedProduct.value = product
    showProductModal.value = true
}
</script>