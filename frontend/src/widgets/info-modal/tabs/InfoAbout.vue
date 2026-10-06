<template>
    <div class="d-flex flex-column ga-6">
        <div class="d-flex flex-column ga-3">
            <div class="text-label-large font-weight-semibold">Contato</div>

            <div class="text-caption font-italic">
                Entre em contato pelo WhatsApp para fazer seu pedido.
            </div>

            <div
                class="d-flex justify-center align-center ga-3 w-100 border-md border-primary text-primary rounded-pill py-2 cursor-pointer custom-bg"
                @click="openWhatsapp"
            >
                <v-icon icon="mdi-whatsapp"></v-icon>
                {{ formatPhone(whatsapp) }}
            </div>
        </div>

        <div class="d-flex flex-column ga-3">
            <div class="text-label-large font-weight-semibold">
                Endereço
            </div>

            <div>
                <v-icon
                    icon="mdi-map-marker"
                    size="20"
                />
                {{ address }}
            </div>
        </div>

        <div class="d-flex flex-column ga-3">
            <div class="text-label-large font-weight-semibold">
                Entrega e Retirada
            </div>

            <div class="d-flex justify-start align-center ga-3">
                <div class="d-flex flex-column justify-center align-center bg-background rounded-lg pa-4 w-50">
                    <div class="d-flex justify-center align-center ga-4">
                        <v-icon icon="mdi-motorbike" size="small"></v-icon>
                        <div class="text-label-small font-weight-semibold">Entrega</div>
                    </div>
                    {{ deliveryTime }}
                </div>

                <div class="d-flex flex-column justify-center align-center bg-background rounded-lg pa-4 w-50">
                    <div class="d-flex justify-center align-center ga-4">
                        <v-icon icon="mdi-home" size="small"></v-icon>
                        <div class="text-label-small font-weight-semibold">Retirada</div>
                    </div>
                    {{ pickupTime }}
                </div>
            </div>

            <div class="d-flex flex-column ga-2 mt-3">
                <div class="text-label-large font-weight-semibold">Taxa de entrega</div>

                <div>
                    {{ deliveryFee }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    restaurant: {
        type: Object,
        default: null,
    },
});

const whatsapp = computed(() => {
    return props.restaurant?.phones?.find(
        phone => phone.type === 'WhatsApp'
    )?.phone ?? '-';
});

function openWhatsapp() {
    if (whatsapp.value === '-') {
        return;
    }

    const message = 'Olá, gostaria de fazer um pedido!';

    const whatsappUrl =
        `https://api.whatsapp.com/send?phone=${whatsapp.value}&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

const address = computed(() => {
    const address = props.restaurant?.address;

    if(!address) {
        return '-';
    }

    return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`;
});

const deliveryTime = computed(() => {
    const { delivery_time_min, delivery_time_max } = props.restaurant ?? [];

    if(!delivery_time_min || !delivery_time_max) {
        return '-';
    }

    return `${delivery_time_min} min - ${delivery_time_max} min`;
});

const pickupTime = computed(() => {
    const { pickup_time_min, pickup_time_max } = props.restaurant ?? [];

    if(!pickup_time_min || !pickup_time_max) {
        return '-';
    }

    return `${pickup_time_min} min - ${pickup_time_max} min`;
});

const deliveryFee = computed(() => {
    const fee = Number(props.restaurant?.delivery_fee);

    if(Number.isNaN(fee)) {
        return '-';
    }

    return fee.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
});

function formatPhone(phone) {
    if (!phone) {
        return '-';
    }

    const numbers = phone.replace(/\D/g, '');

    if (numbers.length === 11) {
        return numbers.replace(
            /(\d{2})(\d{5})(\d{4})/,
            '($1) $2-$3'
        );
    }

    if (numbers.length === 10) {
        return numbers.replace(
            /(\d{2})(\d{4})(\d{4})/,
            '($1) $2-$3'
        );
    }

    return phone;
};
</script>

<style scoped>
.custom-bg {
    background-color: rgba(var(--v-theme-primary), 0.15);
    border-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary));
}
</style>