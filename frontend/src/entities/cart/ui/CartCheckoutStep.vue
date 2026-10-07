<template>
    <div class="d-flex flex-column ga-4">
        <div class="d-flex justify-start align-start ga-4 w-100">
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

        <Delivery 
            v-if="checkout.deliveryType === 'delivery'"
            v-model="checkout.delivery"
        />

        <Pickup 
            v-else
            v-model="checkout.pickup"
            :restaurant="restaurant"
        />
        
        <Checkbox 
            v-model="rememberCheckout"
            label="Lembrar meus dados neste dispositivo"
            :is-border="false"
        />
    </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia';

import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import Checkbox from '../../../shared/ui/checkbox/Checkbox.vue';
import Delivery from './Delivery.vue';
import Pickup from './Pickup.vue';

import { useCheckout } from '../model/useCheckout.js';
import { useRestaurantStore } from '../../restaurant/model/restaurantStore.js';

const emit = defineEmits([
    'validation-change',
    'form-change'
]);

const loading = ref(false);

const restaurantStore = useRestaurantStore();

const {
    restaurant
} = storeToRefs(restaurantStore);

const {
    checkout,
    isValid,
    rememberCheckout
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