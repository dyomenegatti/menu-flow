<template>
    <div class="d-flex align-center ga-4">
        <v-btn
            class="quantity-btn pa-4 d-flex align-center"
            icon="mdi-minus"
            variant="text"
            size="20"
            @click="decrease"
        ></v-btn>

        <span class="text-h6 font-weight-medium">
            {{ modelValue }}
        </span>

        <v-btn
            class="quantity-btn pa-4 d-flex align-center"
            icon="mdi-plus"
            variant="text"
            size="20"
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
};

function decrease() {
    if (props.modelValue <= 1) return;

    emit('update:modelValue', props.modelValue - 1);
};
</script>

<style scoped>
.quantity-btn {
    border: 1px solid rgb(var(--v-theme-on-gray));
    border-radius: 12px;
}

.quantity-btn:hover {
  background-color: rgb(var(--v-theme-primary));
  color: white;
  border: transparent;
}
</style>