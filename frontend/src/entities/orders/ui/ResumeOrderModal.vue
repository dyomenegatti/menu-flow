<template>
    <BaseModal
        :dialog="showDialog"
        @update:dialog="emit('update:showDialog', $event)"
        :title="orderId"
        subtitle="Confira tudo antes de confirmar"
        :max-width="700"
    >
        <div class="d-flex flex-column ga-4">
            <div class="d-flex flex-column ga-3">
                <span class="font-weight-semibold text-medium-emphasis mb-1">Itens</span>

                <div
                    v-for="item in order?.items || []"
                    :key="item.id"
                    class="d-flex ga-4"
                >
                    <div
                        class="rounded-circle overflow-hidden flex-shrink-0"
                        style="width: 50px; height: 50px;"
                    >
                        <v-img
                            :src="item.image"
                            :alt="item.name"
                            width="50"
                            height="50"
                            cover
                        />
                    </div>

                    <div
                        class="d-flex align-center justify-space-between flex-grow-1 ga-2"
                    >
                        <div class="d-flex flex-column">
                            <span class="text-body-1 font-weight-medium">
                                {{ item.quantity }}x {{ item.name }}
                            </span>

                            <div
                                v-if="item.addons?.length"
                                class="d-flex flex-column text-caption text-medium-emphasis"
                            >
                                <span
                                    v-for="addon in item.addons"
                                    :key="addon.id"
                                >
                                    + {{ addon.name }}
                                </span>
                            </div>

                            <div
                                v-if="item.options?.length"
                                class="d-flex flex-column text-caption text-medium-emphasis"
                            >
                                <span
                                    v-for="option in item.options"
                                    :key="option.id"
                                >
                                    {{ option.name }}
                                </span>
                            </div>

                            <span
                                v-if="item.observation"
                                class="text-caption text-medium-emphasis font-italic"
                            >
                                Obs.: {{ item.observation }}
                            </span>
                        </div>

                        <span
                            class="text-body-1 font-weight-medium text-no-wrap"
                        >
                            {{ formatCurrency(item.total || item.price) }}
                        </span>
                    </div>
                </div>

                <v-divider />

                <div class="d-flex flex-column justify-start align-start ga-2">
                    <div class="d-flex justify-space-between align-center w-100">
                        <span class="text-medium-emphasis">Subtotal</span>

                        <div>
                            {{ formatCurrency(order?.total) }}
                        </div>
                    </div>
                    <div class="d-flex justify-space-between align-center w-100">
                        <span class="text-medium-emphasis">Taxa de entrega</span>

                        <div>
                            {{ formatCurrency(deliveryFee) }}
                        </div>
                    </div>
                    <div class="d-flex justify-space-between align-center w-100">
                        <span class="text-title-medium font-weight-semibold">Total</span>

                        <div class="text-h6 text-primary font-weight-bold">
                            {{ formatCurrency(orderTotal) }}
                        </div>
                    </div>
                </div>
            </div>

            <v-divider />

            <div class="bg-background rounded-lg pa-4">
                <span
                    class="text-medium-emphasis text-uppercase font-weight-semibold"
                >
                    Dados da entrega
                </span>

                <div class="d-flex flex-column ga-3 mt-3">
                    <div class="d-flex align-center ga-3">
                        <v-icon
                            icon="mdi-account-outline"
                            size="20"
                            color="medium-emphasis"
                        />

                        <span>
                            Nome: {{ order?.customer_name || 'Não informado' }}
                        </span>
                    </div>

                    <div class="d-flex align-center ga-3">
                        <v-icon
                            icon="mdi-phone-outline"
                            size="20"
                            color="medium-emphasis"
                        />

                        <span>
                            WhatsApp:
                            {{ formattedPhone(order?.customer_phone) }}
                        </span>
                    </div>

                    <div class="d-flex align-center ga-3">
                        <v-icon
                            :icon="
                                order?.type === 'delivery'
                                    ? 'mdi-moped-outline'
                                    : 'mdi-store-outline'
                            "
                            size="20"
                            color="medium-emphasis"
                        />

                        <span>
                            Tipo:
                            {{
                                order?.type === 'delivery'
                                    ? 'Delivery'
                                    : 'Retirada local'
                            }}
                        </span>
                    </div>

                    <template
                        v-if="order?.type === 'delivery'"
                    >
                        <div class="d-flex align-start ga-3">
                            <v-icon
                                icon="mdi-map-marker-outline"
                                size="20"
                                color="medium-emphasis"
                            />

                            <span>
                                Endereço:

                                {{ order.address }},
                                {{ order.number }}

                                <template
                                    v-if="order.neighborhood"
                                >
                                    <br />

                                    {{ order.neighborhood }}
                                </template>
                            </span>
                        </div>

                        <div
                            v-if="order.reference"
                            class="d-flex align-start ga-3"
                        >
                            <v-icon
                                icon="mdi-map-marker-radius-outline"
                                size="20"
                                color="medium-emphasis"
                            />

                            <span>
                                Referência:
                                {{ order.reference }}
                            </span>
                        </div>

                        <div
                            v-if="order.observation"
                            class="d-flex align-start ga-3"
                        >
                            <v-icon
                                icon="mdi-note-text-outline"
                                size="20"
                                color="medium-emphasis"
                            />

                            <span>
                                Observação:
                                {{ order.observation }}
                            </span>
                        </div>
                    </template>

                    <template
                        v-if="order?.type === 'pickup'"
                    >
                        <div class="d-flex align-start ga-3">
                            <v-icon
                                icon="mdi-note-text-outline"
                                size="20"
                                color="medium-emphasis"
                            />

                            <span>
                                Observação:
                                {{ order.observation }}
                            </span>
                        </div>
                    </template>
                </div>
            </div>

            <div class="bg-background rounded-lg pa-4">
                <span
                    class="text-medium-emphasis text-uppercase font-weight-semibold"
                >
                    Pagamento
                </span>

                <div class="d-flex align-center ga-2 mt-3">

                    <v-sheet
                        class="d-flex align-center justify-center"
                        height="40"
                        width="40"
                        rounded="xl"
                        color="primary"
                    >
                        <v-icon
                            :icon="paymentIcon"
                            size="20"
                        />
                    </v-sheet>

                    <div>
                        <div
                            class="text-title-small text-primary font-weight-bold d-flex ga-3"
                        >
                            {{ paymentName }}

                            <div v-if="paymentName === 'Dinheiro' && order.change > 0">
                                - Troco p/ {{ formatCurrency(order.change) }}
                            </div>
                        </div>

                        <div class="text-medium-emphasis">
                            {{ paymentDescription }}
                        </div>
                    </div>
                </div>
            </div>

            <span class="text-body-small text-medium-emphasis" v-if="!isReorder">
                Ao confirmar, você será redirecionado ao WhatsApp
                do restaurante com seu pedido formatado, pronto para
                enviar.
            </span>

            <v-divider />

            <div class="d-flex justify-space-between align-center ga-2" v-if="!isReorder">
                <BaseButton
                    variant="outlined"
                    rounded="pill"
                    border="sm"
                    class="w-50"
                    @click="emit('back')"
                >
                    Voltar e editar
                </BaseButton>

                <BaseButton
                    variant="primary"
                    rounded="pill"
                    border="sm"
                    class="w-50"
                    @click="emit('confirm')"
                >
                    Confirmar e enviar
                </BaseButton>
            </div>

            <div class="d-flex justify-space-between align-center ga-2" v-else>
                <BaseButton
                    variant="outlined"
                    rounded="pill"
                    border="sm"
                    class="w-50"
                    @click="openWhatsapp"
                >
                    WhatsApp
                </BaseButton>

                <BaseButton
                    variant="primary"
                    rounded="pill"
                    border="sm"
                    class="w-50"
                    @click="emit('confirm')"
                >
                    Pedir novamente
                </BaseButton>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue';

import BaseModal from '../../../shared/ui/modal/BaseModal.vue';
import BaseButton from '../../../shared/ui/button/BaseButton.vue';

import { formatCurrency } from '../../../utils/formatCurrency.js';
import { formattedPhone } from '../../../utils/formatPhone.js';

import { useRestaurant } from '../../restaurant/model/useRestaurant.js';

const props = defineProps({
    showDialog: {
        type: Boolean,
        default: false
    },
    order: {
        type: Object,
        default: () => ({
            restaurant_id: null,
            type: null,
            customer_name: '',
            customer_phone: '',
            payment_method_id: null,
            items: [],
            total: 0
        })
    },
    isReorder: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    'update:showDialog',
    'confirm',
    'back'
]);

const itemId = ref('');

const orderId = computed(() => {
    const itemId = props.order?.items?.[0]?.id ?? null;

    return `Pedido #${itemId}`; 
});

const {
    restaurant
} = useRestaurant(); 

const deliveryFee = computed(() => {
    return Number(restaurant.value?.delivery_fee ?? 0);
});

const orderTotal = computed(() => {
    return props.order.total + deliveryFee.value;
});

const whatsapp = computed(() => {
    return restaurant?.value?.phones?.find(
        phone => phone.type === 'WhatsApp'
    )?.phone ?? '-';
});

function openWhatsapp() {
    if (whatsapp.value === '-') {
        return;
    }

    const message = 'Olá, gostaria de ajuda com o pedido!';

    const whatsappUrl =
        `https://api.whatsapp.com/send?phone=${whatsapp.value}&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
};

const paymentName = computed(() => {
    switch (props.order?.payment_method_id) {
        case 1:
            return 'PIX';

        case 2:
            return 'Cartão';

        case 3:
            return 'Dinheiro';

        default:
            return 'Pagamento';
    }
});

const paymentDescription = computed(() => {
    switch (props.order?.payment_method_id) {
        case 1:
            return 'Pagamento instantâneo';

        case 2:
            return 'Crédito ou débito';

        case 3:
            return 'Pagamento em dinheiro';

        default:
            return 'Forma de pagamento selecionada';
    }
});

const paymentIcon = computed(() => {
    switch (props.order?.payment_method_id) {
        case 1:
            return 'mdi-qrcode';

        case 2:
            return 'mdi-credit-card-outline';

        case 3:
            return 'mdi-cash';

        default:
            return 'mdi-cash';
    }
});
</script>