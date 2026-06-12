<template>
    <v-btn
        v-bind="$attrs"
        :class="[
            'd-flex rounded-lg',
            buttonClass,
        ]"
        :loading="loading"
        :disabled="disabled"
        @click="$emit('click', $event)"
        variant="flat"
    >
        <slot />
    </v-btn>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
});

const buttonClass = computed(() => [
    'btn-base',
    `btn-${props.variant}`
]);
</script>

<style scoped>
.btn-base {
    text-transform: none;
    transition: all .2s ease;
    padding: 20px 12px !important;
}

.btn-primary {
    background: rgb(var(--v-theme-primary));
    color: white;
}

.btn-primary:hover {
    filter: brightness(1.08);
}

.btn-outlined {
    background: transparent;
    color: rgb(var(--v-theme-on-surface));
    border: 1px solid rgb(var(--v-theme-on-outline));
    padding: 0 !important;
}

.btn-outlined:hover {
    background: rgb(var(--v-theme-primary));
    color: white;
    border-color: rgb(var(--v-theme-primary));
}

.btn-cancel {
    background: transparent;
    color: rgba(var(--v-theme-on-surface), .7);
    border: 1px solid rgb(var(--v-theme-on-outline));
}

.btn-cancel:hover {
    background: rgba(0, 0, 0, .05);
}

.btn-ghost {
    background: transparent;
    border: none;
    color: rgb(var(--v-theme-on-surface));
}

.btn-ghost:hover {
    background: rgba(var(--v-theme-primary));
    color: white
}
</style>