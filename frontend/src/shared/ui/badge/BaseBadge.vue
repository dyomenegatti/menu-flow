<template>
    <v-badge
        :location="location"
        :color="color"
        :content="content"
        inline
    >
        <slot />
    </v-badge>
</template>

<script setup>
defineProps({
    location: {
        type: String,
        default: 'top right'
    },
    color: {
        type: String,
        default: 'primary'
    },
    content: {
        type: String,
        default: ''
    }
})
</script>