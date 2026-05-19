<template>
    <v-btn 
        v-bind="$attrs"
        :color="color"
        :variant="variant"
        :loading="loading"
        :disabled="disabled"
        :rounded="rounded"
        :size="size"
        :border="border"
        @click="emitirEvento"
        class="btn-base"
    >
        <template v-if="isIconOnly && !hasContent">
            <v-icon :icon="icon" />
        </template>

        <template v-else>
            <v-icon v-if="icon" start :icon="icon" />
            
            <slot>{{ title }}</slot>
        </template>
    </v-btn>
</template>

<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
    color: { 
        type: String, 
        default: 'text' 
    },
    variant: { 
        type: String, 
        default: 'flat' 
    },
    loading: { 
        type: Boolean, 
        default: false 
    },
    disabled: { 
        type: Boolean, 
        default: false 
    },
    icon: { 
        type: String, 
        default: '' 
    },
    title: { 
        type: String, 
        default: '' 
    },
    rounded: {
        type: [Boolean, String],
        default: undefined,
    },
    size: {
        type: [String, Number],
        default: undefined,
    },
    border: {
        type: String,
        default: '0'
    },
});

const emit = defineEmits(['click']);

const isIconOnly = computed(() => !props.title && props.icon);

function emitirEvento(e) {
    emit('click', e);
}

const slots = useSlots();

const hasContent = computed(() => !!slots.default);
</script>

<style scoped>
.btn-base {
  border-color: rgb(var(--v-theme-border)); 
}

.btn-base:hover {
  background-color: rgb(var(--v-theme-primary)); 
}
</style>