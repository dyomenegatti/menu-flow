<template>
    <div class="d-flex flex-column ga-4">
        <div class="d-flex justify-center align-center ga-4 w-100">
            <SelectableCard
                v-model="selectedPayment"
                :items="paymentMethods"
            />
        </div>

        <div
            v-if="showChangeField"
            class="d-flex flex-column"
        >
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-cash"
                    size="20"
                />

                Troco para (opcional)
            </div>

            <BaseInput
                :model-value="changeFor"
                placeholder="R$ 0,00"
                type="text"
                variant="filled"
                @update:model-value="changeFor = formatChange($event)"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';

import BaseInput from '../../../shared/ui/input/BaseInput.vue';
import SelectableCard from '../../../shared/ui/selectable-card/SelectableCard.vue';

import { usePaymentMethod } from '../../payment-method/model/usePaymentMethod.js';
import { useRestaurant } from '../../restaurant/model/useRestaurant.js';

import { formatCurrency } from '../../../utils/formatCurrency.js';

const emit = defineEmits([
    'payment-change',
    'validation-change'
]);

const selectedPayment = ref(null);
const changeFor = ref('');

const {
    paymentMethods,
    getPaymentMethods
} = usePaymentMethod();

const { 
    restaurant, 
    fetchRestaurant 
} = useRestaurant();

const selectedMethod = computed(() =>
    paymentMethods.value.find(
        item => item.id === selectedPayment.value
    )
);

const showChangeField = computed(() =>
    selectedMethod.value?.code === 'cash'
);

const isValid = computed(() =>
    selectedPayment.value !== null
);

function formatChange(value) {
    const numbers = String(value).replace(/\D/g, '');

    if (!numbers) {
        return '';
    }

    return formatCurrency(Number(numbers) / 100);
};

function parseCurrency(value) {
    if (!value) {
        return null;
    }

    return Number(
        String(value)
            .replace(/\D/g, '')
    ) / 100;
};

onMounted(async () => {
    await fetchRestaurant();

    if (restaurant.value) {
        await getPaymentMethods(restaurant.value.id);
    }
});

watch(
    [selectedPayment, changeFor],
    () => {
        emit('validation-change', isValid.value);
        
        emit('payment-change', {
            payment: selectedPayment.value,
            paymentTitle: selectedMethod.value?.title,
            change: parseCurrency(changeFor.value),
            restaurantId: restaurant.value?.id
        });
    },
    {
        immediate: true
    }
);
</script>