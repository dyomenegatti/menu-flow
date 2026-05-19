<template>
    <div class="text-center pa-4">
        <v-dialog
            :model-value="dialog"
            @update:model-value="$emit('update:dialog', $event)"
            :max-width="maxWidth"
        >  
            <v-card
                v-bind="cardProps"
                :loading="loading"
            >
                <div class="d-flex align-start justify-space-between pa-4">
                    <div>
                        <div class="text-h6 font-weight-semibold">
                            {{ title }}
                        </div>
                        <div class="text-subtitle-2 text-medium-emphasis">
                            {{ subtitle }}
                        </div>
                    </div>

                    <BaseButton
                        variant="text"
                        icon="mdi-close"
                        size="30"
                        rounded="lg"
                        border="primary lg"
                        @click="$emit('update:dialog', false)"
                    />
                </div>

                <v-card-text>
                    <slot />
                </v-card-text>
                
                <template v-slot:actions>
                    <slot name="actions"></slot>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import BaseButton from '../button/BaseButton.vue';

defineEmits(['update:dialog']);

const props = defineProps({
    dialog: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: Number,
        default: 500
    },
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    cardProps: {
        type: Object,
        default: () => ({}),
    },
});
</script>