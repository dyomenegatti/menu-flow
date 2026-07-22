<template>
    <div class="d-flex flex-column ga-4">
        <div class="d-flex justify-center align-center ga-4 w-100">
            <SelectableCard
                v-model="selectedPayment"
                :items="checkoutPayments"
            ></SelectableCard>
        </div>

        <div class="d-flex flex-column" v-if="showChangeField">
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-cash"
                    size="20"
                />
                Troco para (opcional)
            </div>

            <BaseInput
                v-if="showChangeField"
                v-model="changeFor"
                placeholder="Ex: 50,00"
                type="number"
                variant="filled"
           />
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

import BaseInput from '../../../shared/ui/input/BaseInput.vue';
import SelectableCard from '../../../shared/ui/selectable-card/SelectableCard.vue';

import { checkoutPayments } from '../model/checkoutPayments.js';

const emit = defineEmits([
    'payment-change',
    'validation-change'
]);

const selectedPayment = ref(null);
const changeFor = ref('');

const selectedMethod = computed(() =>
    checkoutPayments.find(item => item.id === selectedPayment.value)
);

const showChangeField = computed(() =>
    selectedMethod.value?.code === 'cash'
);

const isValid = computed(() => {
    return selectedPayment.value !== null;
});

watch(
    [selectedPayment, changeFor],
    () => {
        emit('validation-change', isValid.value);

        emit('payment-change', {
            payment: selectedPayment.value,
            changeFor: changeFor.value
        });
    },
    {
        immediate: true
    }
);
</script>