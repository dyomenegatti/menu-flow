<template>
    <div>
        <v-card
            v-for="item in items"
            :key="item.id"
            variant="flat"
            rounded="xl"
            class="pa-5 mb-4"
        >
            <div class="d-flex justify-space-between mb-4">
                <div class="d-flex ga-4">
                    <v-img
                        height="100"
                        :width="100"
                        rounded="xl"
                        elevation="2"
                        cover
                        :src="item?.image"
                    />

                    <div>
                        <div class="font-weight-bold">
                            {{ item.name }}
                        </div>

                        <div class="text-medium-emphasis">
                            R$ {{ item.product_price }} cada
                        </div>
                    </div>
                </div>

                <div>
                    <v-btn
                        icon="mdi-pencil"
                        variant="text"
                        color="text-medium-emphasis"
                        :loading="loading.update"
                        @click="editItem(item)"
                    ></v-btn>
                    <v-btn
                        icon="mdi-delete-outline"
                        variant="text"
                        color="text-medium-emphasis"
                        :loading="loading.remove"
                        @click="removeItemCart(item.id)"
                    ></v-btn>
                </div>
            </div>
            
            <div class="flex flex-column ga-4 my-4">
                <div class="mb-4 d-flex flex-column ga-2" v-if="item.addons.length">
                    <span class="font-weight-semibold">
                        Acréscimos
                    </span>
                    <span class="font-weight-light" v-for="addon in item.addons.filter(item => item.id)" :key="addon.id">
                        + {{ addon.name }}
                    </span>
                </div>

                <div class="mb-4 d-flex flex-column ga-2" v-if="item.options.length">
                    <span class="font-weight-semibold">
                        Opções
                    </span>
                    <span class="font-weight-light"  v-for="option in item.options.filter(item => item.id)" :key="option.id">
                        + {{ option.name }}
                    </span>
                </div>

                <div class="mb-4 d-flex flex-column ga-2" v-if="item.observation">
                    <span class="font-weight-semibold">
                        Observações
                    </span>
                    <span class="font-weight-light">
                        {{ item.observation }}
                    </span>
                </div>

                <div class="mb-4 d-flex justify-space-between align-center ga-2" v-if="item.quantity > 1">
                    <span class="font-weight-semibold">
                        Quantidade
                    </span>
                    <span class="font-weight-light">
                        {{ item.quantity }}
                    </span>
                </div>

                <v-divider></v-divider>

                <div class="d-flex justify-space-between align-center mt-4">
                    <span class="font-weight-semibold">
                        Total
                    </span>
                    <span class="font-weight-light">
                        {{ formatCurrency(item.total) }}
                    </span>
                </div>
            </div>
        </v-card>

        <div
            v-if="items.length"
            class="d-flex flex-column ga-3 mt-6"
        >
            <div class="d-flex justify-space-between">
                <span class="text-medium-emphasis">
                    Subtotal:
                </span>
                <span>
                    {{ formatCurrency(total) }}
                </span>
            </div>

            <div class="d-flex justify-space-between">
                <span class="text-medium-emphasis">
                    Taxa de entrega:
                </span>
                <span>
                    {{ formatCurrency(deliveryFee) }}
                </span>
            </div>

            <v-divider></v-divider>

            <div class="d-flex justify-space-between align-center">
                <span class="text-title-medium font-weight-semibold">
                    Total
                </span>

                <span class="text-h6 text-primary font-weight-bold">
                    {{ formatCurrency(orderTotal) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useProducts } from '../../product/model/useProducts';
import { useCart } from '../model/useCart';
import { useRestaurantStore } from '../../restaurant/model/restaurantStore.js';

import { formatCurrency } from '../../../utils/formatCurrency';

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['edit-item']);

const {
    items,
    total,
    loading,
    updateItem,
    removeItemCart,
    clearCart
} = useCart();

const {
    selectedProduct,
    fetchProduct
} = useProducts();

const restaurantStore = useRestaurantStore();

const {
    restaurant
} = storeToRefs(restaurantStore);

const deliveryFee = computed(() => {
    return Number(restaurant.value?.delivery_fee ?? 0);
});

const orderTotal = computed(() => {
    return total.value + deliveryFee.value;
});

async function editItem(item) {
    await fetchProduct(item.product_id);

    emit('edit-item', {
        cartItem: item,
        product: selectedProduct.value
    });
};
</script>