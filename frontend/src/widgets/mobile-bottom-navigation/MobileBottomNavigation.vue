<template>
    <v-bottom-navigation
        v-model="value"
        color="primary"
        :elevation="10"
        grow
    >
        <BaseButton
            variant="text"
            value="info"
            rounded="lg"
            @click="openInfoModal"
        >
            <v-icon icon="mdi-clipboard-text-outline"></v-icon>
            Informações
        </BaseButton>

        <BaseButton
            variant="text"
            value="orders"
            rounded="lg"
            @click="openOrders"
        >
            <v-icon icon="mdi-shopping-outline"></v-icon>
            Pedidos
        </BaseButton>

        <BaseButton
            variant="text"
            @click="openCart"
        >
            <v-badge
                :content="itemCount"
                :model-value="itemCount > 0"
                color="primary"
            >
                <v-icon icon="mdi-cart-outline"></v-icon>
            </v-badge>
            Carrinho
        </BaseButton>
    </v-bottom-navigation>

    <InfoModal 
        :show-dialog="showModal"
        :restaurant="restaurant"
        @update:show-dialog="showModal = $event"
    />
</template>

<script setup>
import { ref } from 'vue'
import router from '../../app/router/index.js';
import { storeToRefs } from 'pinia';

import { useCart } from '../../entities/cart/model/useCart.js';
import { useRestaurantStore } from '../../entities/restaurant/model/restaurantStore.js';

import InfoModal from '../info-modal/InfoModal.vue';
import BaseButton from '../../shared/ui/button/BaseButton.vue';

const value = ref('restaurant');
const showModal = ref(false);

const {
  openCart,
  itemCount
} = useCart();

const restaurantStore = useRestaurantStore();

const {
    restaurant
} = storeToRefs(restaurantStore);

function openInfoModal() {
    showModal.value = true;
};

function openOrders() {
    router.push({ name: 'OrdersViews' })
};
</script>