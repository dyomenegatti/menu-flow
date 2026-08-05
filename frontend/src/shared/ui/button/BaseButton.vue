<template>
    <v-btn
        v-bind="$attrs"
        :class="buttonClass"
        :loading="loading"
        :disabled="disabled || loading"
        :elevation="elevation"
        @click="$emit('click', $event)"
    >
        <template #loader>
            <v-progress-circular
                indeterminate
                size="18"
                width="2"
                color="white"
            />
        </template>

        <slot />
    </v-btn>
</template>

<script setup>
import { computed } from 'vue';

defineEmits(['click']);

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: value =>
            [
            'primary',
            'secondary',
            'outlined',
            'text',
            'ghost',
            'danger',
            'success'
            ].includes(value)
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    elevation: {
        type: Number,
        default: 0
    },
    size: {
        type: String,
        default: 'md',
        validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    active: {
        type: Boolean,
        default: false
    }
});

const buttonClass = computed(() => [
    'btn-base',
    `btn-${props.variant}`,
    `btn-${props.size}`,
    {
        'btn-active': props.active
    }
]);
</script>

<style scoped>
.btn-base {
    text-transform: none;
    transition: all .2s ease;
}

.btn-primary {
    background: rgb(var(--v-theme-primary));
    color: white;
}

.btn-primary:hover {
    filter: brightness(1.08);
}

.btn-secondary {
    background: rgb(var(--v-theme-secondary));
    color: white;
}

.btn-secondary:hover {
    filter: brightness(1.08);
}

.btn-outlined {
    background: transparent;
    color: rgb(var(--v-theme-on-surface));
    border: 1px solid rgb(var(--v-theme-on-outline));
}

.btn-outlined:hover {
    background: rgb(var(--v-theme-primary));
    color: white;
    border-color: rgb(var(--v-theme-primary));
}

.btn-text {
    background: transparent;
    color: rgb(var(--v-theme-on-surface));
    box-shadow: none;
}

.btn-text:hover {
    color: rgb(var(--v-theme-primary));
    background: rgba(var(--v-theme-primary), 0.08);
}

.btn-ghost {
    background: rgba(var(--v-theme-on-gray));
    border: none;
    color: rgb(var(--v-theme-on-surface));
}

.btn-ghost:hover {
    background: rgba(var(--v-theme-primary));
    color: white;
}

.btn-danger {
    background: rgb(var(--v-theme-error));
    color: white;
}

.btn-danger:hover {
    filter: brightness(1.08);
}

.btn-success {
    background: rgb(var(--v-theme-success));
    color: white;
}

.btn-success:hover {
    filter: brightness(1.08);
}

.v-btn--disabled {
    opacity: .6;
}

.btn-sm {
  padding: 0 12px;
  min-height: 36px;
}

.btn-md {
  padding: 0 20px;
  min-height: 44px;
}

.btn-lg {
  padding: 0 32px;
  min-height: 52px;
}

.btn-active {
    background: rgb(var(--v-theme-primary));
    color: white;
    border-color: rgb(var(--v-theme-primary));
}
</style>