<template>
    <v-container class="d-flex flex-column ga-6">
        <div>
            <InputSearch 
                v-model="search"
            />
        </div>
        
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
            @add-to-cart="handleAddToCart"
        />
    </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import { useProducts } from '../../../entities/product/model/useProducts.js';
import { useCategories } from '../../../entities/category/model/useCategories.js';
import { useCart } from '../../../entities/cart/model/useCart.js';
import ProductGrid from '../../../widgets/product-grid/ProductGrid.vue';
import InputSearch from '../../../shared/ui/input-search/InputSearch.vue';

const ProductDetailModal = defineAsyncComponent(() => 
    import('../../../features/product-details-modal/ui/ProductDetailModal.vue')
);

const route = useRoute();

const { products, fetchProductByCategory } = useProducts();
const { categories, fetchCategories } = useCategories();
const { addItem } = useCart();

const selectedProduct = ref(null);
const showProductModal = ref(false);
const search = ref('');
let searchTimeout;

const categoriesMap = computed(() => {
    return Object.fromEntries(
        categories.value.map((category) => [category.slug, category])
    )
});

const currentCategory = computed(() => {
  return categoriesMap.value[route.params.category] || null
});

watch(search, () => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        loadProductsByCategory();
    }, 400);
});

watch(
    () => route.params.category,
    async() => {
        clearTimeout(searchTimeout);
        search.value = '';
        await loadProductsByCategory();
    }
);

async function loadProductsByCategory() {
    const slug = route.params.category;

    const category = categories.value.find(
        c => c.slug === slug
    );

    if (!category) return;

    await fetchProductByCategory(category.id, search.value);
}

function openProduct(product) {
    selectedProduct.value = product
    showProductModal.value = true
}

async function handleAddToCart(item) {
    await addItem(item);

    showProductModal.value = false;
}

onMounted(async () => {
    await fetchCategories();
    await loadProductsByCategory();
});
</script>