<template>
    <v-navigation-drawer
        location="right"
        temporary
        :model-value="dialog"
        @update:model-value="$emit('update:dialog', $event)"
        width="500"
        class="pa-6 cart-content h-100"
    >
        <div class="d-flex flex-column justify-space-between ga-2 h-100">
            <div class="pr-2">
                <div class="d-flex justify-space-between align-start mb-8">
                    <div class="d-flex align-center justify-center ga-4">
                        <div>
                            <v-icon
                                icon="mdi-arrow-left"
                                size="20"
                                class="cursor-pointer"
                                @click="$emit('update:dialog', false)"
                                v-if="step === 2 || step === 3"
                            />
                        </div>
                        <div>
                            <h3>Seu carrinho</h3>
                            <span class="text-subtitle-2">{{ items.length }} item(s) no carrinho</span>
                        </div>
                    </div>
        
                    <v-icon
                        icon="mdi-close"
                        size="20"
                        class="cursor-pointer"
                        @click="$emit('update:dialog', false)"
                    />
                </div>

                <div class="d-flex ga-2 mb-8">
                    <v-progress-linear 
                        :model-value="step === 1 ? 100 : 0"
                        height="4"
                        rounded
                        class="cursor-pointer"
                        @click="step = 1"
                    />
                    <v-progress-linear 
                        :model-value="step === 2 ? 100 : 0"
                        height="4"
                        rounded
                        class="cursor-pointer"
                        @click="step = 2"
                    />
                    <v-progress-linear 
                        :model-value="step === 3 ? 100 : 0"
                        height="4"
                        rounded
                        class="cursor-pointer"
                        @click="step = 3"
                    />
                </div>

                <div v-if="step === 1">
                    <CartProductsStep 
                        :items="items" 
                        @edit-item="handleEditItem"    
                    />
                </div>

                <div v-if="step === 2">
                    <CartCheckoutStep @validation-change="checkoutValid = $event"/>
                </div>
                
                <div v-else-if="step === 3">    
                    <CartPaymentStep 
                        @validation-change="paymentValid = $event"
                    />
                </div>
            </div>
    
            <div class="d-flex flex-column">
                <div class="d-flex justify-space-between ma-2">
                    <span>Total</span>
        
                    <div class="text-h6 text-primary font-weight-bold">
                        {{ formattedPrice(total) }}
                    </div>
                </div>
    
                <div class="d-flex flex-column ga-2">
                    <BaseButton
                        variant="primary"
                        rounded="pill"
                        border="sm"
                        :loading="loading"
                        @click="nextStep"
                    >
                        {{ buttonText }}
                    </BaseButton>

                    <BaseButton
                        variant="outlined"
                        rounded="pill"
                        border="sm"
                        :loading="loading"
                        @click="clearCart"
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
import { computed, effect, ref } from 'vue';

import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import ProductDetailModal from '../../../features/product-details-modal/ui/ProductDetailModal.vue';
import CartProductsStep from './CartProductsStep.vue';
import CartCheckoutStep from './CartCheckoutStep.vue';
import CartPaymentStep from './CartPaymentStep.vue';

import { useCart } from '../model/useCart.js';
import { useProducts } from '../../product/model/useProducts';
import { toast } from 'vue3-toastify';

const props = defineProps({
    dialog: Boolean
});

const emit = defineEmits(['update:dialog', 'edit-item']);

const step = ref(1);
const checkoutValid = ref(false);
const showProductModal = ref(false);
const selectedCartItem = ref(null);
const paymentValid = ref(false);

const {
    products,
    selectedProduct,
    fetchProduct
} = useProducts();

const {
    items,
    total,
    loading,
    updateItem,
    removeItemCart,
    clearCart
} = useCart();

const buttonText = computed(() => {

    if(step.value === 1)
        return 'Finalizar pedido';

    if(step.value === 2)
        return 'Continuar para pagamento';

    return 'Confirmar pedido';

});

function formattedPrice(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value || 0)
};

function handleEditItem({ cartItem, product }) {
    selectedCartItem.value = cartItem;
    selectedProduct.value = product;
    showProductModal.value = true;
};

function nextStep() {
    if(step.value === 1) {
        step.value = 2;
        return;
    }

    if(step.value === 2) {
        if(!checkoutValid.value) {
            toast.error('Preencha os campos obrigatórios');
            return;
        }

        step.value = 3;
        return;
    }

    if(step.value === 3) {
        if(!paymentValid.value) {
            toast.error('Selecione uma forma de pagamento');
            return;
        }

        console.log('seguir pedido');
    }
};
</script>

<style scoped>
.cart-content {
    background: rgb(var(--v-theme-background));
    top: 0 !important;
}

.v-navigation-drawer__content {
    overflow-y: hidden !important;
    overflow-x: hidden !important;
}
</style>