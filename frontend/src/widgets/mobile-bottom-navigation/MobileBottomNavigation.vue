<template>
    <v-bottom-navigation
        v-model="value"
        color="primary"
        :elevation="10"
        grow
    >
        <v-btn
            value="info"
            rounded="lg"
            @click="openInfoModal"
        >
            <v-icon icon="mdi-clipboard-text-outline"></v-icon>
            Informações
        </v-btn>

        <v-btn
            value="orders"
            rounded="lg"
            @click="openCart"
        >
            <v-icon icon="mdi-information-outline"></v-icon>
            Pedidos
        </v-btn>

        <v-btn
            value="cart"
            rounded="lg"
            @click="openCart"
            variant="text"
        >
            <v-icon icon="mdi-cart-outline"></v-icon>
            Carrinho
        </v-btn>

        <InfoModal 
            :show-dialog="showModal"
            :restaurant="restaurant"
            @update:show-dialog="showModal = $event"
        />
    </v-bottom-navigation>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '../../entities/cart/model/useCart.js';
import InfoModal from '../info-modal/InfoModal.vue';
import { useRestaurant } from '../../entities/restaurant/model/useRestaurant.js';

const value = ref('restaurant');
const showModal = ref(false);

const {
  openCart,
} = useCart();

const {
    restaurant,
} = useRestaurant();

function openInfoModal() {
    showModal.value = true;
};
</script>