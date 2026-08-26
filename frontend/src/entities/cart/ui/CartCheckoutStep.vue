<template>
    <div class="d-flex flex-column ga-4">
        <div class="d-flex justify-center align-center ga-4 w-100">
            <BaseButton
                variant="outlined"
                size="lg"
                rounded="pill"
                border="sm"
                :loading="loading"
                :active="checkout.deliveryType === 'delivery'"
                @click="checkout.deliveryType = 'delivery'"
            >
                <v-icon
                    icon="mdi-truck-delivery-outline"
                    size="20"
                    class="cursor-pointer mr-2"
                />
                Delivery
            </BaseButton>

            <BaseButton
                variant="outlined"
                size="lg"
                rounded="pill"
                border="sm"
                :loading="loading"
                :active="checkout.deliveryType === 'pickup'"
                @click="checkout.deliveryType = 'pickup'"
            >
                <v-icon
                    icon="mdi-home-outline"
                    size="20"
                    class="cursor-pointer mr-2"
                />
                Retirada
            </BaseButton>
        </div>
        
        <FormField 
            v-for="field in currentFields"
            :key="`${checkout.deliveryType}-${field.key}`"
            :field="field"
            v-model="checkout[checkout.deliveryType][field.key]"
        />
    </div>
</template>

<script setup>
import { watch, ref } from 'vue';

import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import FormField from '../../../shared/ui/form-field/FormField.vue';

import { useCheckout } from '../model/useCheckout.js';

const emit = defineEmits([
    'validation-change',
    'form-change'
]);

const loading = ref(false);

const {
    checkout,
    currentForm,
    currentFields,
    isValid
} = useCheckout();

watch(
    isValid,
    value => {
        emit('validation-change', value);
    },
    {
        immediate: true
    }
);

watch(
    checkout,
    value => {
        emit('form-change', value);
    },
    {
        deep: true,
        immediate: true
    }
);
</script>