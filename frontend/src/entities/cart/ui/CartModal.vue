<template>
    <v-navigation-drawer
        location="right"
        temporary
        fixed
        :model-value="dialog"
        @update:model-value="$emit('update:dialog', $event)"
        width="550"
        class="pa-6 cart-content"
    >
        <div class="d-flex flex-column justify-space-between ga-2 h-100">
            <div class="pr-2 flex-grow-1 d-flex flex-column">
                <div class="d-flex justify-space-between align-start mb-8">
                    <div class="d-flex align-center justify-center ga-4">
                        <div>
                            <h3>Seu carrinho</h3>

                            <span class="text-subtitle-2">
                                {{ items.length }} item(s) no carrinho
                            </span>
                        </div>
                    </div>
        
                    <v-icon
                        icon="mdi-close"
                        size="20"
                        class="cursor-pointer"
                        @click="$emit('update:dialog', false)"
                    />
                </div>

                <div 
                    v-if="items.length === 0" 
                    class="d-flex flex-column justify-center align-center flex-grow-1"
                >
                    <div class="d-flex align-center ga-2">
                        <v-icon
                            icon="mdi-cart-outline"
                            size="sm"
                            color="primary"
                        />

                        <span class="text-label-medium font-weight-medium">
                            Seu carrinho está vazio
                        </span>
                    </div>

                    <span class="text-medium-emphasis font-italic text-label-small">
                        Adicione produtos ao carrinho para continuar o pedido.
                    </span>
                </div>

                <div v-else class="flex-grow-1">
                    <CartProductsStep 
                        :items="items" 
                        @edit-item="handleEditItem"    
                    />
                </div>
            </div>
    
            <div class="d-flex flex-column">
                <div class="d-flex flex-column ga-2">
                    <BaseButton
                        variant="primary"
                        rounded="pill"
                        border="sm"
                        :loading="loading"
                        :disabled="items.length === 0"
                        @click="goToCheckout"
                    >
                        Finalizar pedido
                    </BaseButton>

                    <BaseButton
                        variant="outlined"
                        rounded="pill"
                        border="sm"
                        :loading="loading"
                        :disabled="items.length === 0"
                        @click="handleClearCart"
                    >
                        Limpar Carrinho
                    </BaseButton>
                </div>
            </div>
        </div>

        <ProductDetailModal
            :dialog="showProductModal"
            :product="selectedProduct"
            :cart-item="selectedCartItem"
            @update:dialog="showProductModal = $event"
            @update-cart-item="updateItem"
        />
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import ProductDetailModal from '../../../features/product-details-modal/ui/ProductDetailModal.vue';
import CartProductsStep from './CartProductsStep.vue';

import { useCart } from '../model/useCart.js';
import { useProducts } from '../../product/model/useProducts';
import { useCheckout } from '../model/useCheckout.js';

import { formatCurrency } from '../../../utils/formatCurrency.js';

const props = defineProps({
    dialog: Boolean
});

const emit = defineEmits([
    'update:dialog', 
    'edit-item'
]);

const router = useRouter();

const showProductModal = ref(false);
const selectedCartItem = ref(null);

const {
    selectedProduct,
} = useProducts();

const {
    items,
    total,
    loading,
    updateItem,
    clearCart
} = useCart();

const {
    clearCheckoutData
} = useCheckout();

function handleEditItem({ cartItem, product }) {
    selectedCartItem.value = cartItem;
    selectedProduct.value = product;
    showProductModal.value = true;
}

function handleClearCart() {
    clearCart();
    clearCheckoutData();
}

function goToCheckout() {
    router.push({ name: 'CheckoutView' })
}
</script>

<style scoped>
.cart-content {
    background: rgb(var(--v-theme-background));
    top: 0 !important;
    height: 100dvh !important;
}

:deep(.v-navigation-drawer__content) {
    scrollbar-width: thin;
    scrollbar-color: #bdbdbd transparent;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar) {
    width: 5px;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar-track) {
    background: transparent;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar-thumb) {
    background-color: #bdbdbd;
    border-radius: 10px;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar-thumb:hover) {
    background-color: #9e9e9e;
}

.v-navigation-drawer__scrim {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
}
</style>