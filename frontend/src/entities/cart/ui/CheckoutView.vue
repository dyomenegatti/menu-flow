<template>
    <v-container>
        <v-row dense justify="center">
            <v-col
                cols="12"
                md="6"
            >
                <div class="d-flex flex-column ga-4">
                    <div class="text-title-medium font-weight-semibold">
                        Como você quer receber?
                    </div>

                    <CartCheckoutStep 
                        @validation-change="checkoutValid = $event"
                        @form-change="checkoutData = $event"
                    />
                </div>

                <div class="mt-4">
                    <div class="text-title-medium font-weight-semibold">
                        Pagamento
                    </div>

                    <CartPaymentStep 
                        @validation-change="paymentValid = $event"
                        @payment-change="paymentData = $event"
                    />
                </div>
            </v-col>

            <v-col
                cols="12"
                md="6"
            >
                <div>
                    <div class="d-flex alignt-center justify-space-between">
                        <div class="text-title-medium font-weight-semibold mt-3">
                            Seu pedido
                        </div>

                        <BaseButton
                            variant="text"
                            :disabled="items.length === 0"
                            :loading="loading"
                            @click="handleClearCart"
                        >
                            Limpar Carrinho
                        </BaseButton>
                    </div>

                    <CartProductsStep 
                        :items="items"
                    />

                    <BaseButton 
                        variant="primary"
                        rounded="pill"
                        border="sm"
                        class="w-100 mt-6"
                        :loading="loading"
                        :disabled="isConfirmDisabled"
                        @click="handleConfirm"
                    >
                        Confirmar pedido
                    </BaseButton>
                </div>
            </v-col>
        </v-row>

        <ResumeOrderModal 
            :show-dialog="showDialogResumeOrder"
            :order="orderSnapshot"
            @update:show-dialog="showDialogResumeOrder = $event"
            @confirm="handleConfirmOrder"
            @back="showDialogResumeOrder = false"
        />
    </v-container>
</template>

<script setup lang="ts">
import { computed, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import ResumeOrderModal from '../../orders/ui/ResumeOrderModal.vue';
import CartCheckoutStep from './CartCheckoutStep.vue';
import CartPaymentStep from './CartPaymentStep.vue';
import CartProductsStep from './CartProductsStep.vue';

import { useCart } from '../model/useCart.js';
import { useOrder } from '../../orders/model/useOrder.js';
import { useRestaurant } from '../../restaurant/model/useRestaurant.js';
import { buildOrderWhatsAppMessage } from '../../orders/model/whatsapp/buildOrderWhatsAppMessage.js';

const router = useRouter();

const checkoutValid = ref(false);
const paymentValid = ref(false);

const checkoutData = ref(null);
const paymentData = ref(null);

const showDialogResumeOrder = ref(false);

const {
    items,
    total,
    loading,
    clearCart
} = useCart();

const {
    orderSnapshot,
    createSnapshot,
    submitOrder
} = useOrder();

const {
    restaurant,
    fetchRestaurant
} = useRestaurant();

const isConfirmDisabled = computed(() => {
    return (
        items.value.length === 0 ||
        !checkoutValid.value ||
        !paymentValid.value
    );
});

function handleClearCart() {
    clearCart();

    router.push({ name: 'MenuRedirect' });
};

function handleConfirm() {
    if (!checkoutValid.value) {
        toast.error('Preencha os campos obrigatórios.');
        return;
    }

    if (!paymentValid.value) {
        toast.error('Selecione uma forma de pagamento.');
        return;
    }

    const checkout = {
        ...checkoutData.value,
        restaurant_id: paymentData.value?.restaurantId,
        payment_method_id: paymentData.value?.payment,
        payment_method: paymentData.value?.paymentTitle,
        change: paymentData.value?.change,
        items: structuredClone(toRaw(items.value)),
        total: total.value
    };

    createSnapshot(checkout);

    showDialogResumeOrder.value = true;
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

        showDialogResumeOrder.value = false;
        clearCart();

        router.push({ name: 'MenuRedirect' });
    } catch (error) {
        toast.error(
            'Não foi possível realizar o pedido.'
        );
    }
}
</script>