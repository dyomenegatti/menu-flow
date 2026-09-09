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
        :max-width="500"
    >
        <v-sheet v-if="restaurant?.address">
            <v-tabs v-model="tab" color="primary">
                <v-tab
                    v-for="tab in tabs"
                    :key="tab.id"
                    :value="tab.value"
                >
                    {{ tab.title }}
                </v-tab>
            </v-tabs>

            <v-divider></v-divider>

            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="about">
                    <InfoAbout :restaurant="restaurant" />
                </v-tabs-window-item>

                <v-tabs-window-item value="time">
                    <InfoOpeningHours :restaurant="restaurant" />
                </v-tabs-window-item>

                <v-tabs-window-item value="payment">
                    <InfoPayment />
                </v-tabs-window-item>
            </v-tabs-window>
        </v-sheet>
    </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from '../../shared/ui/modal/BaseModal.vue';
import InfoAbout from './tabs/InfoAbout.vue';
import InfoOpeningHours from './tabs/InfoOpeningHours.vue';
import InfoPayment from './tabs/InfoPayment.vue';

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

const tab = ref('about');

const tabs = [
    { id: 1, value: 'about', title: 'Sobre' },
    { id: 2, value: 'time', title: 'Horários' },
    { id: 3, value: 'payment', title: 'Pagamento' },
];
</script>