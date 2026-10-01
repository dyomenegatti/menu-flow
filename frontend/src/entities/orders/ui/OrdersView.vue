<template>
    <v-container>
        <v-row dense>
            <div
                v-if="orders.length === 0"
                class="d-flex flex-column align-center justify-center text-center text-medium-emphasis w-100"
                style="min-height: 60vh"
            >
                <v-icon icon="mdi-shopping-outline" size="48" />
                <div>Você ainda não fez nenhum pedido</div>
            </div>

            <v-col
                v-else
                v-for="order in orders"
                :key="order.data.id"
                cols="12"
                sm="6"
                md="4"
                lg="6"
            >
                <div class="mb-5">
                    <div class="text-label-small text-medium-emphasis font-italic mb-1">
                        {{ formatDate(order.data.created_at) }}
                    </div>

                    <v-card class="w-100 h-100 px-5 py-5 d-flex flex-column ga-3">
                        <div class="d-flex justify-space-between align-center">
                            <div class="font-weight-bold">
                                {{ order.data.customer_name }}
                            </div>

                            <BaseButton
                                variant="text"
                                :loading="reordering"
                                :disabled="reordering"
                                @click="handleOrderAgain(order.data.id)"
                            >
                                Pedir de novo
                            </BaseButton>
                        </div>

                        <div>
                            <div class="d-flex justify-space-between">
                                <div class="d-flex align-center ga-5 mb-5">
                                    <div class="text-medium-emphasis">
                                        Pedido #{{ order.data.id }}
                                    </div>

                                    <v-chip variant="tonal" color="primary">
                                        {{order.data.status}}
                                    </v-chip>
                                </div>

                                <div>
                                    <BaseButton
                                        variant="text"
                                        size="sm"
                                        @click="showOrder(order.data.id)"
                                    >
                                        <v-icon icon="mdi-chevron-right"></v-icon>
                                    </BaseButton>
                                </div>
                            </div>

                            <v-divider></v-divider>

                            <div class="d-flex justify-end ga-2 mt-3">
                                <strong>Total:</strong> 
                                <div>
                                    {{ formatCurrency(order.data.total) }}
                                </div>
                            </div>
                        </div>
                    </v-card>
                </div>
            </v-col>
        </v-row>

        <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="3000"
            location="top"
        >
            {{ snackbar.message }}
        </v-snackbar>

        <ResumeOrderModal
            :show-dialog="showDialogOrderById"
            :order="orderById"
            :is-reorder="true"
            @update:show-dialog="showDialogOrderById = $event"
            @confirm="handleOrderAgain(orderById?.id)"
            @back="showDialogOrderById = false"
        />
    </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useOrder } from '../model/useOrder';
import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import { formatDate } from '../../../utils/formatDate.js';
import ResumeOrderModal from './ResumeOrderModal.vue';

import { toast } from 'vue3-toastify';
import { formatCurrency } from '../../../utils/formatCurrency.js';

const {
    getOrders,
    getOrderById,
    reorder,
    loading: reordering
} = useOrder();

const showDialogOrderById = ref(false);
const orderById = ref(null);
const orders = ref([]);
const snackbar = ref({ show: false, message: '', color: 'success' });

function loadOrders() {
    orders.value = getOrders().reverse();
}

async function handleOrderAgain(id) {
    try {
        await reorder(id);
        loadOrders();
        showDialogOrderById.value = false;
        toast.success('Pedido realizado com sucesso!')
    } catch(err) {
        toast.error('Não foi possível realizar o pedido. Tento novamente.')
    }
}

function showOrder(id) {
    orderById.value = getOrderById(id);
    showDialogOrderById.value = true;
};

onMounted(() => {
    orders.value = getOrders();
});
</script>