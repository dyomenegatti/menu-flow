<template>
   <v-row dense>
        <v-col
            v-for="product in products"
            :key="product.id ?? product.slug"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
            <ProductCard 
                :product="product"
                @click="emit('product-click', product)"
            />
        </v-col>
   </v-row>
</template>

<script setup>
import ProductCard from '../../entities/product/ui/ProductCard.vue';

const emit = defineEmits(['product-click']);

defineProps({
    products: {
        type: Array,
        default: () => []
    }
});
</script>