<template>
    <v-container>
        <div class="d-flex flex-column mb-6">
            <h1 class="text-h4 font-weight-bold mb-1">
                {{ title }}
            </h1>

            <p class="text-body-2 text-grey-darken-1">
                {{ subtitle }}
            </p>
        </div>

        <slot />
    </v-container>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    }
});
</script>