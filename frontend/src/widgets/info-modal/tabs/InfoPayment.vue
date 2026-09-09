<template>
    <div class="d-flex flex-column ga-6 mt-3">
        <div class="d-flex flex-column ga-3">
            <div class="text-label-large font-weight-semibold">Forma Pagamento Online</div>

            <div 
                v-for="payment in onlinePayments" 
                :key="payment.id"
                class="bg-backgroundGray text-text px-2 py-2 w-33 rounded-lg d-flex align-center ga-2"
            >
                <v-icon
                    :icon="payment.icon"
                    size="20"
                    color="secondary"
                />
                {{ payment.title }}
            </div>
        </div>

        <div class="d-flex flex-column ga-3">
            <div class="text-label-large font-weight-semibold">Forma Pagamento Presencial</div>

            <div 
                v-for="payment in presencialPayments" 
                :key="payment.id"
                class="bg-backgroundGray text-text px-2 py-2 w-33 rounded-lg d-flex align-center ga-2"
            >
                <v-icon
                    :icon="payment.icon"
                    size="20"
                    color="secondary"
                />
                {{ payment.title }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { usePaymentMethod } from '../../../entities/payment-method/model/usePaymentMethod';
import { useRestaurant } from '../../../entities/restaurant/model/useRestaurant';

const selectedPayment = ref(null);

const {
    restaurant,
    fetchRestaurant
} = useRestaurant();

const {
    paymentMethods,
    getPaymentMethods
} = usePaymentMethod();

const onlinePayments = computed(() =>
    paymentMethods.value.filter(
        payment => ['pix', 'icone'].includes(payment.code)
    )
);

const presencialPayments = computed(() =>
    paymentMethods.value.filter(
        payment => ['card', 'cash', 'icone'].includes(payment.code)
    )
);

onMounted(async () => {
    await fetchRestaurant();

    if (restaurant.value) {
        await getPaymentMethods(restaurant.value.id);
    }
});
</script>