<template>
    <BaseModal 
        :dialog="showDialog"
        @update:dialog="emit('update:showDialog', $event)"
        :title="restaurant?.name"
        subtitle="Confira nosso endereço, telefone e horário de funcionamento"
        :card-props="{
            variant: 'elevated',
            rounded: 'lg'
        }"
        :max-width="450"
    >
        <div v-if="restaurant?.address" class="d-flex flex-column ga-5">
            <div class="d-flex ga-3">
                <v-avatar color="primary" size="48" variant="tonal">
                    <v-icon icon="mdi-map-marker-outline" />
                </v-avatar>

                <div class="d-flex flex-column">
                    <div class="text-subtitle-1 font-weight-semibold">
                        Localização
                    </div>
                    <span class="text-medium-emphasis text-subtitle-2">
                        {{ restaurant.address.street }}, {{ restaurant.address.number }}
                    </span>

                    <span class="text-medium-emphasis text-subtitle-2">
                        {{ restaurant.address.neighborhood }} — {{ restaurant.address.city }}, {{ restaurant.address.state }}
                    </span>

                    <span class="text-medium-emphasis text-subtitle-2">
                        CEP: {{ restaurant.address.zip_code }}
                    </span>
                </div>
            </div>

            <div class="d-flex ga-3">
                <v-avatar color="primary" size="48" variant="tonal">
                    <v-icon icon="mdi-phone-outline" />
                </v-avatar>

                <div class="d-flex flex-column">
                    <div class="text-subtitle-1 font-weight-semibold">
                        Telefone
                    </div>
    
                    <span
                        v-for="phone in restaurant.phones ?? []"
                        :key="phone.id"
                        class="text-medium-emphasis text-subtitle-2"
                    >
                        {{ phone.phone }}
                    </span>
    
                    <span
                        v-if="restaurant.phones?.some(phone => phone.type === 'WhatsApp')"
                        class="text-medium-emphasis text-subtitle-2"
                    >
                        WhatsApp disponível
                    </span>
                </div>
            </div>

            <div class="d-flex ga-3">
                <v-avatar color="primary" size="48" variant="tonal">
                    <v-icon icon="mdi-clock-time-five-outline" />
                </v-avatar>

                <div class="d-flex flex-column">
                    <div class="text-subtitle-1 font-weight-semibold">
                        Horário
                    </div>
    
                    <span
                        v-for="hour in formattedOpeningHours"
                        :key="hour"
                        class="text-medium-emphasis text-subtitle-2"
                    >
                        {{ hour }}
                    </span>
    
                    <span class="text-medium-emphasis text-subtitle-2">
                        Feriados: consultar
                    </span>
                </div>
            </div>

        </div>
    </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import BaseModal from '../../shared/ui/modal/BaseModal.vue';

const props = defineProps({
    showDialog: {
        type: Boolean,
        default: false
    },
    restaurant: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['update:showDialog']);

const weekDays = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb'
];

const formattedOpeningHours = computed(() => {
    if (!props.restaurant?.opening_hours) return [];

    return formatOpeningHours(props.restaurant.opening_hours);
});

function formatHour(time) {
    if (!time) return '';

    const [hour, minute] = time.split(':');

    return minute === '00'
        ? `${hour}h`
        : `${hour}h${minute}`;
}

function formatPhone(phone) {
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
}

function formatOpeningHours(openingHours) {
    const sorted = [...openingHours].sort((a, b) => a.week_day - b.week_day);

    const result = [];

    let i = 0;

    while (i < sorted.length) {
        const current = sorted[i];

        const key = current.is_closed
            ? 'closed'
            : `${current.opens_at}-${current.closes_at}`;

        let start = i;
        let end = i;

        while (
            end + 1 < sorted.length &&
            (
                sorted[end + 1].is_closed
                    ? 'closed'
                    : `${sorted[end + 1].opens_at}-${sorted[end + 1].closes_at}`
            ) === key
        ) {
            end++;
        }

        const day =
            start === end
                ? weekDays[sorted[start].week_day]
                : `${weekDays[sorted[start].week_day]} - ${weekDays[sorted[end].week_day]}`;

        result.push(
            current.is_closed
                ? `${day}: Fechado`
                : `${day}: ${formatHour(current.opens_at)} às ${formatHour(current.closes_at)}`
        );

        i = end + 1;
    }

    return result;
}
</script>