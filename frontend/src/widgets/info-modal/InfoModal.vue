<template>
    <BaseModal 
        :dialog="showDialog"
        @update:dialog="emit('update:showDialog', $event)"
        :title="restaurant?.name"
        subtitle="Confira nosso endereço, telefone e horário de funcionamento."
        :card-props="{
            variant: 'elevated',
            rounded: 'lg'
        }"
        :max-width="900"
    >
        <template #title-action>
            <v-chip
                size="small"
                variant="tonal"
            >
                {{ restaurantStatus }}
            </v-chip>
        </template>

        <v-sheet v-if="restaurant?.address">
            <v-row dense justify="center">
                <v-col
                    cols="12"
                    md="6"
                >
                    <div class="pa-2">
                        <InfoAbout :restaurant="restaurant" />
                    </div>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                >
                    <div class="d-flex flex-column ga-6 pa-2">
                        <InfoOpeningHours :restaurant="restaurant" />

                        <v-divider></v-divider>

                        <InfoPayment />
                    </div>
                </v-col>
            </v-row>
        </v-sheet>
    </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue';
import BaseModal from '../../shared/ui/modal/BaseModal.vue';
import InfoAbout from './tabs/InfoAbout.vue';
import InfoOpeningHours from './tabs/InfoOpeningHours.vue';
import InfoPayment from './tabs/InfoPayment.vue';

import { useRestaurant } from '../../entities/restaurant/model/useRestaurant.js';
import { getRestaurantStatus } from '../../shared/lib/restaurant/getRestaurantStatus.js';

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

const {
    restaurant
} = useRestaurant();

const restaurantStatus = computed(() => {
    return getRestaurantStatus(restaurant.value);
});

const tab = ref('about');

const tabs = [
    { id: 1, value: 'about', title: 'Sobre' },
    { id: 2, value: 'time', title: 'Horários' },
    { id: 3, value: 'payment', title: 'Pagamento' },
];
</script>