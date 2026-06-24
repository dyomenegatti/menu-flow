<template>
    <v-card
        :class="[
            'base-card',
            hover && 'base-card--hover',
            customClass
        ]"
        :elevation="elevation"
        :variant="variant"
        @click="$emit('click')"
    >
        <slot />
    </v-card>
</template>

<script setup>
defineEmits(['click']);

defineProps({
    elevation: {
        type: Number, 
        default: 0
    },
    variant: {
        type: String,
        default: 'flat'
    },
    hover: {
        type: Boolean,
        default: false
    },
    customClass: {
        type: String,
        default: ''
    }
});
</script>

<style scoped>
.base-card {
    border: 1px solid rgb(var(--v-theme-outline));
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: rgb(var(--v-theme-surface));
}

.base-card--hover {
    transition: all 0.3s ease;
    cursor: pointer;
}

.base-card--hover:hover {
    transform: translateY(-6px);
}
</style>