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
            <div class="pr-2 flex-grow-1 d-flex flex-column">
                <div class="d-flex justify-space-between align-start mb-8">
                    <div class="d-flex align-center justify-center ga-4">
                        <div>
                            <v-icon
                                icon="mdi-arrow-left"
                                size="20"
                                class="cursor-pointer"
                                @click="goToStep(step - 1)"
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

                <div v-else>
                    <div class="d-flex ga-2 mb-8">
                        <v-progress-linear 
                            :model-value="100"
                            :color="step === 1 ? 'primary' : 'grey'"
                            height="4"
                            rounded
                            class="cursor-pointer"
                            @click="goToStep(1)"
                        />

                        <v-progress-linear 
                            :model-value="100"
                            :color="step === 2 ? 'primary' : 'grey'"
                            height="4"
                            rounded
                            class="cursor-pointer"
                            @click="goToStep(2)"
                        />

                        <v-progress-linear 
                            :model-value="100"
                            :color="step === 3 ? 'primary' : 'grey'"
                            height="4"
                            rounded
                            class="cursor-pointer"
                            @click="goToStep(3)"
                        />
                    </div>

                    <div v-if="step === 1">
                        <CartProductsStep 
                            :items="items" 
                            @edit-item="handleEditItem"    
                        />
                    </div>

                    <div v-if="step === 2">
                        <CartCheckoutStep 
                            @validation-change="checkoutValid = $event"
                            @form-change="checkoutData = $event"
                        />
                    </div>
                    
                    <div v-else-if="step === 3">    
                        <CartPaymentStep 
                            @validation-change="paymentValid = $event"
                            @payment-change="paymentData = $event"
                        />
                    </div>
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
                        :disabled="isNextButtonDisabled"
                    >
                        {{ buttonText }}
                    </BaseButton>

                    <BaseButton
                        variant="outlined"
                        rounded="pill"
                        border="sm"
                        :loading="loading"
                        @click="handleClearCart"
                        :disabled="items.length === 0"
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

        <ResumeOrderModal
            :show-dialog="showDialogResumeOrder"
            :order="orderSnapshot"
            @update:showDialog="showDialogResumeOrder = $event"
            @confirm="handleConfirmOrder"
            @back="showDialogResumeOrder = false"
        ></ResumeOrderModal>
    </v-navigation-drawer>
</template>

<script setup>
import { computed, ref, toRaw } from 'vue';

import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import ProductDetailModal from '../../../features/product-details-modal/ui/ProductDetailModal.vue';
import CartProductsStep from './CartProductsStep.vue';
import CartCheckoutStep from './CartCheckoutStep.vue';
import CartPaymentStep from './CartPaymentStep.vue';
import ResumeOrderModal from '../../orders/ui/ResumeOrderModal.vue';

import { useCart } from '../model/useCart.js';
import { useProducts } from '../../product/model/useProducts';
import { useCheckout } from '../model/useCheckout.js';
import { useOrder } from '../../orders/model/useOrder.js';
import { useRestaurant } from '../../restaurant/model/useRestaurant.js';

import { buildOrderWhatsAppMessage } from '../../orders/model/whatsapp/buildOrderWhatsAppMessage.js';

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
const showDialogResumeOrder = ref(false);
const paymentData = ref(null);
const checkoutData = ref(null);

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

const {
    clearCheckoutData
} = useCheckout();

const {
    orderSnapshot,
    createSnapshot,
    submitOrder
} = useOrder();

const {
    restaurant,
    fetchRestaurant
} = useRestaurant();

const buttonText = computed(() => {
    if(step.value === 1)
        return 'Finalizar pedido';

    if(step.value === 2)
        return 'Continuar para pagamento';

    return 'Confirmar pedido';

});

const isNextButtonDisabled = computed(() => {
    if(items.value.length === 0) {
        return true;
    }

    if(step.value === 2) {
        return !checkoutValid.value;
    }

    if(step.value === 3) {
        return !paymentValid.value;
    }

    return false;
});

const whatsapp = restaurant.value?.phones?.find(
    phone => phone.type === 'WhatsApp'
);

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

        const isDelivery = checkoutData.value?.deliveryType === 'delivery';

        const checkoutForm = isDelivery
            ? checkoutData.value.delivery
            : checkoutData.value.pickup;

        const snapshot = {
            restaurant_id: paymentData.value?.restaurantId,
            type: checkoutData.value.deliveryType,

            customer_name: isDelivery
                ? checkoutForm.deliveryName
                : checkoutForm.name,

            customer_phone: checkoutForm.phone,

            payment_method_id: paymentData.value?.payment,
            payment_method: paymentData.value?.paymentTitle,

            items: structuredClone(toRaw(items.value)),

            total: total.value,

            ...(isDelivery && {
                delivery: {
                    street: checkoutForm.street,
                    number: checkoutForm.number,
                    neighborhood: checkoutForm.neighborhood,
                    reference: checkoutForm.reference,
                    observation: checkoutForm.observation
                }
            }),

            ...(!isDelivery && {
                pickup: {
                    name: checkoutForm.name,
                    phone: checkoutForm.phone,
                    observation: checkoutForm.observation
                }
            })
        };

        createSnapshot(snapshot);

        showDialogResumeOrder.value = true;
    }

    showDialogResumeOrder.value = true;
};

function goToStep(targetStep) {
    if(targetStep < step.value) {
        step.value = targetStep;
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
    }
};

function handleClearCart() {
    clearCart();
    clearCheckoutData();
};

async function handleConfirmOrder() {
    try {
        await submitOrder();

        await fetchRestaurant();

        const whatsapp = restaurant.value?.phones?.find(
            phone => phone.type === 'WhatsApp'
        );

        if (!whatsapp?.phone) {
            toast.error(
                'O WhatsApp do restaurante não está configurado.'
            );
            return;
        }

        const message = buildOrderWhatsAppMessage(
            orderSnapshot.value,
            restaurant.value
        );

        const phone = `55${whatsapp.phone.replace(/\D/g, '')}`;

        const whatsappUrl =
            `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');

    } catch (error) {
        toast.error(
            'Não foi possível realizar o pedido.'
        );
    }
}
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