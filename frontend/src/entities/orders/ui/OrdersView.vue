<template>
    <v-container>
        <v-row dense justify="center">
            <div
                v-if="orders.length === 0"
                class="d-flex flex-column align-center justify-center text-center text-medium-emphasis w-100"
                style="min-height: 60vh"
            >
                <v-icon icon="mdi-shopping-outline" size="48" />
                <div>Você ainda não fez nenhum pedido</div>
            </div>

            <template
                v-for="(groupOrders, groupName) in groupedOrders"
                :key="groupName"
            >
                    <v-col
                        cols="12"
                        lg="8"
                    >
                        <h3 class="mt-2">{{ groupName }}</h3>
                    </v-col>

                    <v-col
                        v-for="order in groupOrders"
                        :key="order.data.id"
                        cols="12"
                        lg="8"
                    >
                        <BaseCard
                            class="mx-auto border-thin"
                            variant="flat"
                            @click="showOrder(order.data.id)"
                        >
                            <v-card-text>
                                <div class="d-flex flex-column ga-4">
                                    <div class="d-flex justify-space-between align-center">
                                        <div class="d-flex align-center ga-3">
                                            <div class="font-weight-bold">
                                                Pedido #{{ order.data.id }}
                                            </div>
    
                                            <v-chip :color="formatOrderStatus(order.data.status).color">
                                                {{ formatOrderStatus(order.data.status).label }}
                                            </v-chip>
                                        </div>
    
                                        <div>
                                            <p class="text-caption text-medium-emphasis font-italic mb-1">
                                                {{ formatDate(order.data.created_at) }} - {{ formatHour(order.data.created_at) }}
                                            </p>
                                        </div>
                                    </div>
    
                                <v-divider></v-divider>
    
                                <div class="d-flex justify-space-between">
                                    <div>
                                        <p class="text-caption">
                                            {{ getOrderType(order.data.type) }}
                                        </p>
                                        <p class="text-primary font-weight-semibold">
                                            {{ formatCurrency(order.data.total) }}
                                        </p>
                                    </div>
    
                                    <div>
                                        <BaseButton
                                            variant="text"
                                            :loading="reordering"
                                            :disabled="reordering"
                                            @click="showOrder(order.data.id)"
                                        >
                                            Pedir de novo
                                        </BaseButton>
                                    </div>
                                </div> 
                                </div> 
                            </v-card-text>
                        </BaseCard>
                    </v-col>
            </template>
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
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import ResumeOrderModal from './ResumeOrderModal.vue';
import BaseCard from '../../../shared/ui/card/BaseCard.vue';

import { useOrder } from '../model/useOrder';

import { formatDate } from '../../../utils/formatDate.js';
import { formatHour } from '../../../utils/formatHour.js';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import { formatOrderStatus } from '../../../utils/formatOrderStatus.js';
import { getOrderDateGroup } from '../../../utils/getOrderDateGroup.js';

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

async function loadOrders() {
    const storedOrders = getOrders().reverse();

    const results = await Promise.all(
        storedOrders.map(async order => {
            try {
                return { data: await getOrderById(order.data.id) };
            } catch (err) {
                if (err?.response?.status === 404) return null;

                return order;
            }
        })
    );

    const updatedOrders = results.filter(Boolean);

    // remove do armazenamento local pedidos que não existem mais no servidor
    const stillExist = updatedOrders.map(o => o.data.id);
    const kept = getOrders().filter(o => stillExist.includes(o.data.id));
    localStorage.setItem('orders', JSON.stringify(kept));

    orders.value = updatedOrders;
};

async function handleOrderAgain(id) {
    try {
        await reorder(id);
        loadOrders();
        showDialogOrderById.value = false;
        toast.success('Pedido realizado com sucesso!')
    } catch(err) {
        toast.error('Não foi possível realizar o pedido. Tento novamente.')
    }
};

async function showOrder(id) {
    orderById.value = await getOrderById(id);
    showDialogOrderById.value = true;
};

function getOrderType(type) {
    return type === 'pickup' ? 'Retirada' : 'Delivery';
};

const groupedOrders = computed(() => {
    const groups = {
        Hoje: [],
        Ontem: [],
        'Mais antigos': [],
    };

    orders.value.forEach(order => {
        const group = getOrderDateGroup(order.data.created_at);

        if (groups[group]) {
            groups[group].push(order);
        }
    });

    return Object.fromEntries(
        Object.entries(groups).filter(([, orders]) => orders.length > 0)
    );
});

onMounted(() => {
    loadOrders();
});
</script>