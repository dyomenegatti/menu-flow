<template>
    <v-select 
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :items="items"
        :label="label"
        :placeholder="placeholder"
        :variant="variant"
        :density="density"
        :rounded="rounded"
        :disabled="disabled"
        :loading="loading"
        :clearable="clearable"
        :rules="rules"
        :required="required"
        :error="error"
        :error-messages="errorMessages"
        :hint="hint"
        :prepend-inner-icon="prependInnerIcon"
        :color="color"
        :item-title="itemTitle"
        :item-value="itemValue"
    />
</template>

<script setup>
defineProps({
    modelValue: [String, Number, Object, null],
    items: {
        type: Array,
        default: () => []
    },
    itemTitle: {
        type: String,
        default: undefined
    },
    itemValue: {
        type: String,
        default: undefined
    },
    label: String,
    placeholder: String,
    variant: {
        type: String,
        default: 'outlined',
        validator: value =>
            ['outlined', 'filled', 'plain', 'solo', 'underlined'].includes(value)
    },
    density: {
        type: String,
        default: 'comfortable'
    },
    rounded: {
        type: [Boolean, String],
        default: 'lg'
    },
    disabled: Boolean,
    loading: Boolean,
    clearable: Boolean,
    required: Boolean,
    error: Boolean,
    errorMessages: [String, Array],
    hint: String,
    prependInnerIcon: String,
    color: String,
    rules: {
        type: Array,
        default: () => []
    },
});

defineEmits(['update:modelValue']);
</script>