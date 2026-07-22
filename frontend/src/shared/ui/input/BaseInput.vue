<template>
    <v-text-field 
        :v-model="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :label="label"
        :placeholder="placeholder"
        :type="type"
        :variant="variant"
        :rounded="rounded"
        :density="density"
        :readonly="readonly"
        :loading="loading"
        :clearable="clearable"
        :rules="rules"
        :required="required"
        :error="error"
        :error-messages="errorMessages"
        :hint="hint"
        :prepend-inner-icon="prependInnerIcon"
        :append-inner-icon="appendInnerIcon"
        :maxlength="maxLength"
        :counter="counter"
        :autocomplete="autocomplete"
        :name="name"
        :id="id"
        :disabled="disabled"
        :color="color"
    ></v-text-field>
</template>

<script setup>
const props = defineProps({
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    type: {
        type: String,
        default: 'text'
    },
    variant: {
        type: String,
        default: 'outlined',
        validator: value =>
            ['outlined', 'filled', 'plain', 'solo', 'underlined'].includes(value)
    },
    rounded: {
        type: [Boolean, String],
        default: 'lg'
    },
    density: {
        type: String,
        default: 'comfortable',
        validator: value =>
            ['default', 'comfortable', 'compact'].includes(value)
    },
    disabled: Boolean,
    readonly: Boolean,
    loading: Boolean,
    clearable: Boolean,
    required: Boolean,
    error: Boolean,
    errorMessages: [String, Array],
    hint: String,
    prependInnerIcon: String,
    appendInnerIcon: String,
    maxLength: [String, Number],
    counter: [Boolean, Number],
    autocomplete: String,
    name: String,
    id: String,
    rules: {
        type: Array,
        default: () => []
    },
    color: String,
});
</script>