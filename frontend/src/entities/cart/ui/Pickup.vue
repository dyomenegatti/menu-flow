<template>
    <div class="d-flex flex-column ga-2">
        <div class="d-flex flex-column ga-4 w-100">
            <div class="text-title-medium font-weight-semibold mb-2">
                Seus dados
            </div>

            <v-row>
                <v-col cols="12" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
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
                </v-col>

                <v-col cols="12" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
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
                </v-col>

                <v-col cols="12" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
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
                </v-col>
            </v-row>
        </div>

        <v-row>
            <v-col cols="12" class="py-1 mb-2 mt-2">
                <v-card 
                    variant="flat"
                    rounded="xl"
                    class="pa-2 mb-3"
                >
                    <v-card-title>
                        Onde retirar
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
            </v-col>
        </v-row>
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