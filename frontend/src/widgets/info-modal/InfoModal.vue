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
        <div v-if="restaurant" class="d-flex flex-column ga-5">
            <div class="d-flex ga-3">
                <v-avatar color="primary" size="48" variant="tonal">
                    <v-icon icon="mdi-map-marker-outline" />
                </v-avatar>

                <div class="d-flex flex-column">
                    <div class="text-subtitle-1 font-weight-semibold">
                        Localização
                    </div>
                    <span class="text-medium-emphasis text-subtitle-2">
                        {{ restaurant.address }}, {{ restaurant.number }}
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

                    <span class="text-medium-emphasis text-subtitle-2">
                        {{ restaurant.phone }}
                    </span>

                    <span class="text-medium-emphasis text-subtitle-2">
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

                    <span class="text-medium-emphasis text-subtitle-2">
                        {{ restaurant.opening_hours }}
                    </span>

                    <span class="text-medium-emphasis text-subtitle-2">
                        Feriado: consultar
                    </span>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
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
</script>