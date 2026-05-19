<template>
    <ProductGrid :products="products" />
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import ProductGrid from '../../widgets/product-grid/ProductGrid.vue';

import { useProducts } from '../../entities/product/model/useProducts';

const route = useRoute();

const {
    products,
    fetchProducts
} = useProducts();

onMounted(() => {
    fetchProducts(route.params.category);
})
</script>