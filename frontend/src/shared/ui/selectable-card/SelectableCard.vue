<template>
    <v-radio-group
        v-model="model"
        hide-details
    >
        <v-card 
            v-for="item in items"
            :key="item.id"
            color="primary"
            variant="outlined"
            rounded="xl"
            class="d-flex justify-space-between align-center pa-3 mb-3"
            @click="model = item.id"
        >
            <div class="d-flex justify-space-between align-center w-100">
                <div class="d-flex ga-2">
                    <v-sheet 
                        class="pa-4 d-flex align-center justify-center"
                        height="50"
                        :width="50"
                        rounded="xl"
                        color="primary"
                    >
                        <v-icon
                            :icon="item.icon"
                            size="30"
                        />
                    </v-sheet>

                    <div>
                        <div class="text-h6 text-primary font-weight-bold">
                            {{ item.title }}
                        </div>
                        <div class="text-medium-emphasis">
                            {{ item.subtitle }}
                        </div>
                    </div>
                </div>
            </div>

            <v-radio :value="item.id"/>
        </v-card>
    </v-radio-group>
</template>

<script setup>
import { onMounted } from 'vue';

import BaseRadio from '../radio-button/BaseRadio.vue';

const { items } = defineProps({
    items: {
        type: [Array, Object], 
        required: true
    }
});

const model = defineModel();
</script>