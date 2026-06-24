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
                rounded="xl"
            >
                <div class="d-flex align-start justify-space-between pa-6">
                    <div>
                        <div class="text-h6 font-weight-semibold">
                            {{ title }}
                        </div>
                        <div class="text-caption text-medium-emphasis">
                            {{ subtitle }}
                        </div>
                    </div>

                    <BaseButton
                        variant="text"
                        size="30"
                        rounded="lg"
                        @click="$emit('update:dialog', false)"
                    >   
                        <v-icon icon="mdi-close"></v-icon>
                    </BaseButton>
                </div>

                <v-card-text>
                    <slot />
                </v-card-text>
                
                <template #actions>
                    <slot name="actions" />
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import BaseButton from '../button/BaseButton.vue'

defineProps({
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

const emit = defineEmits(['update:dialog']);

function closeModal() {
    emit('update:dialog', false);
}
</script>