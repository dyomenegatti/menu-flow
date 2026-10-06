<template>
    <BaseInput 
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :placeholder="placeholder"
        :label="label"
        prepend-inner-icon="mdi-magnify"
        :clearable="clearable"
        :disabled="disabled"
        :loading="loading"
        rounded="pill"
        color="primary"
    />
</template>

<script setup>
import BaseInput from '../input/BaseInput.vue';

defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: 'Buscar'
    },
    placeholder: {
        type: String,
        default: 'Buscar...'
    },
    clearable: {
        type: Boolean,
        default: true
    },
    disabled: Boolean,
    loading: Boolean,
});

defineEmits(['update:modelValue']);
</script>