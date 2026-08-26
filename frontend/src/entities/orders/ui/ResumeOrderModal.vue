<template>
    <BaseModal
        :dialog="showDialog"
        @update:dialog="emit('update:showDialog', $event)"
        title="Resumo do Pedido"
        subtitle="Confira tudo antes de confirmar"
        :max-width="450"
    >
        <div class="d-flex flex-column ga-4">
            <div class="d-flex flex-column ga-3">
                <span
                    class="text-medium-emphasis text-uppercase font-weight-semibold"
                >
                    Itens do pedido
                </span>

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
                            class="text-body-1 font-weight-bold text-primary text-no-wrap"
                        >
                            {{ formattedPrice(item.total) }}
                        </span>
                    </div>
                </div>

                <v-divider />

                <div class="d-flex justify-space-between align-center py-2">
                    <span class="text-body-1 text-medium-emphasis">
                        Total
                    </span>

                    <span class="text-h6 font-weight-bold text-primary">
                        {{ formattedPrice(order?.total) }}
                    </span>
                </div>
            </div>

            <v-divider />

            <div
                class="w-100 d-flex flex-column bg-grey-lighten-3 py-4 px-6 rounded-xl"
            >
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
                        v-if="
                            order?.type === 'delivery' &&
                            order?.delivery
                        "
                    >
                        <div class="d-flex align-start ga-3">
                            <v-icon
                                icon="mdi-map-marker-outline"
                                size="20"
                                color="medium-emphasis"
                            />

                            <span>
                                Endereço:

                                {{ order.delivery.street }},
                                {{ order.delivery.number }}

                                <template
                                    v-if="order.delivery.neighborhood"
                                >
                                    <br />

                                    {{ order.delivery.neighborhood }}
                                </template>
                            </span>
                        </div>

                        <div
                            v-if="order.delivery.reference"
                            class="d-flex align-start ga-3"
                        >
                            <v-icon
                                icon="mdi-map-marker-radius-outline"
                                size="20"
                                color="medium-emphasis"
                            />

                            <span>
                                Referência:
                                {{ order.delivery.reference }}
                            </span>
                        </div>

                        <div
                            v-if="order.delivery.observation"
                            class="d-flex align-start ga-3"
                        >
                            <v-icon
                                icon="mdi-note-text-outline"
                                size="20"
                                color="medium-emphasis"
                            />

                            <span>
                                Observação:
                                {{ order.delivery.observation }}
                            </span>
                        </div>
                    </template>

                    <template
                        v-if="
                            order?.type === 'pickup' &&
                            order?.pickup?.observation
                        "
                    >
                        <div class="d-flex align-start ga-3">
                            <v-icon
                                icon="mdi-note-text-outline"
                                size="20"
                                color="medium-emphasis"
                            />

                            <span>
                                Observação:
                                {{ order.pickup.observation }}
                            </span>
                        </div>
                    </template>
                </div>
            </div>

            <div
                class="w-100 d-flex flex-column bg-grey-lighten-3 py-4 px-6 rounded-xl"
            >
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
                            class="text-title-small text-primary font-weight-bold"
                        >
                            {{ paymentName }}
                        </div>

                        <div class="text-medium-emphasis">
                            {{ paymentDescription }}
                        </div>
                    </div>
                </div>
            </div>

            <span class="text-label-small text-medium-emphasis">
                Ao confirmar, você será redirecionado ao WhatsApp
                do restaurante com seu pedido formatado, pronto para
                enviar.
            </span>

            <v-divider />

            <div class="w-100 d-flex flex-column ga-2">

                <BaseButton
                    variant="primary"
                    rounded="lg"
                    border="sm"
                    class="w-100"
                    @click="emit('confirm')"
                >
                    Confirmar e enviar
                </BaseButton>

                <BaseButton
                    variant="outlined"
                    rounded="lg"
                    border="sm"
                    class="w-100"
                    @click="emit('back')"
                >
                    Voltar e editar
                </BaseButton>

            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { computed } from 'vue';

import BaseModal from '../../../shared/ui/modal/BaseModal.vue';
import BaseButton from '../../../shared/ui/button/BaseButton.vue';

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
    }
});

const emit = defineEmits([
    'update:showDialog',
    'confirm',
    'back'
]);

function formattedPrice(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(value) || 0);
}

function formattedPhone(phone) {
    if (!phone) {
        return 'Não informado';
    }

    const value = String(phone).replace(/\D/g, '');

    if (value.length === 11) {
        return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }

    if (value.length === 10) {
        return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    }

    return phone;
}

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