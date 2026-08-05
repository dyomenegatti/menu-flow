<template>
    <v-radio
        :model-value="modelValue"
        :value="value"
        color="primary"
        hide-details
        density="comfortable"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>

<script setup>
const props = defineProps({
    modelValue: [String, Number, Boolean],
    value: [String, Number, Boolean]
});

const emit = defineEmits(['update:modelValue']);
</script>