<template>
    <v-textarea
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :label="label"
        :placeholder="placeholder"
        bg-color="transparent"
        variant="outlined"
        auto-grow
    />
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
});

defineEmits(['update:modelValue']);
</script>