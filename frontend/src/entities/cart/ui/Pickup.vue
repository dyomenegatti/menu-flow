<template>
    <div class="d-flex flex-column ga-2">
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-account"
                    size="20"
                />
                Nome completo (*)
            </div>

            <BaseInput
                v-model="pickup.name"
                placeholder="Seu nome"
                type="text"
                variant="outlined"
                rounded="pill"
                color="primary"
            />
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-phone"
                    size="20"
                />
                Telefone/WhatsApp (*)
            </div>

            <BaseInput
                v-model="phone"
                placeholder="(11) 99999-9999"
                type="tel"
                variant="outlined"
                rounded="pill"
                color="primary"
            />
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-note-text-outline"
                    size="20"
                />
                Observação
            </div>

            <BaseInput
                v-model="pickup.observation"
                placeholder="Alguma instrução?"
                type="textarea"
                variant="outlined"
                rounded="pill"
                color="primary"
            />
        </div>

        <v-card 
            variant="flat"
            rounded="xl"
            class="pa-2 mb-3"
        >
            <v-card-title>
                <v-icon 
                    icon="mdi-walk"
                    size="20"
                />
                Retirar
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text class="d-flex flex-column align-start ga-4">
                <div class="d-flex ga-2">
                    <v-icon 
                        icon="mdi-map-marker"
                        size="20"
                    />
                    {{ address }}
                </div>

                <div class="d-flex ga-2">
                    <v-icon 
                        icon="mdi-clock-time-eight-outline"
                        size="20"
                    />
                    {{ pickupTime }}
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import BaseInput from '../../../shared/ui/input/BaseInput.vue'
import { formatPhoneInput } from '../../../utils/formatPhone.js';

const props = defineProps({
    restaurant: {
        type: Object,
        default: null,
    },
});

const pickup = defineModel({
    type: Object,
    required: true
});

const address = computed(() => {
    const address = props.restaurant?.address;

    if(!address) {
        return '-';
    }

    return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`;
});

const pickupTime = computed(() => {
    const { pickup_time_min, pickup_time_max } = props.restaurant ?? [];

    if(!pickup_time_min || !pickup_time_max) {
        return '-';
    }

    return `${pickup_time_min} min - ${pickup_time_max} min`;
});

const phone = computed({
    get: () => pickup.value.phone,
    set: (value) => {
        pickup.value.phone = formatPhoneInput(value);
    }
});
</script>