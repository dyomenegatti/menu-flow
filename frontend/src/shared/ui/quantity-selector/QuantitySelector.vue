<template>
    <div class="d-flex align-center ga-4">
        <v-btn
            class="quantity-btn"
            icon="mdi-minus"
            variant="text"
            border
            rounded="lg"
            size="30"
            @click="decrease"
        ></v-btn>

        <span class="text-h6 font-weight-medium">
            {{ modelValue }}
        </span>

        <v-btn
            class="quantity-btn"
            icon="mdi-plus"
            variant="text"
            border
            rounded="lg"
            size="30"
            @click="increase"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['update:modelValue']);

function increase() {
    emit('update:modelValue', props.modelValue + 1);
}

function decrease() {
    if (props.modelValue <= 1) return;

    emit('update:modelValue', props.modelValue - 1);
}
</script>

<style scoped>
.quantity-btn:hover {
  background-color: rgb(var(--v-theme-primary));
  color: white;
  border: transparent;
}
</style>