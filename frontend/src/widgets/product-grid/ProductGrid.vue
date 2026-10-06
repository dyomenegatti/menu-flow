<template>
   <v-row dense>
        <template v-if="loading">
            <v-col
                v-for="product in products"
                :key="product.id ?? product.slug"
                cols="12"
                sm="6"
                md="4"
                lg="3"
            >
                <v-skeleton-loader type="image, list-item-two-line"></v-skeleton-loader>
            </v-col>
        </template>

        <template v-else>
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
                    :adding="addingId === product.id"
                    @click="emit('product-click', product)"
                    @add-to-cart="handleAddToCart"
                    :loading="loading"
                />
            </v-col>
        </template>
   </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { useCart } from '../../entities/cart/model/useCart.js';
import ProductCard from '../../entities/product/ui/ProductCard.vue';

const emit = defineEmits(['product-click']);

defineProps({
    products: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean, 
        default: false
    },
    skeletonCount: {
        type: Number,
        default: 8
    }
});

const { addItem } = useCart();

const addingId = ref(null);

async function handleAddToCart(payload) {
    if(addingId.value !== null) return;

    addingId.value = payload.product_id;

    try {
        await addItem(payload);
    } catch (err) {
        console.error(err);
    } finally {
        addingId.value = null;
    }
}
</script>