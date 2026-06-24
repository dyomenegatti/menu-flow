<template>
    <div>
        <v-app-bar
            :color="color"
            :elevation="elevation"
            :flat="flat"
            :density="density"
            :prominent="prominent"
        >
            <template v-slot:prepend>
                <slot name="prepend"></slot>
            </template>

            <v-app-bar-title class="d-flex flex-column align-start">
                <slot name="title">
                    <div class="font-weight-semibold">{{ title }}</div>
                </slot>

                <slot name="subtitle">
                    <div class="text-caption">{{ subtitle }}</div>
                </slot>
            </v-app-bar-title>

            <template #append>
                <slot name="append"></slot>
            </template>
        </v-app-bar>

        <div
            v-if="Boolean($slots.bottom)"
            class="header-bottom"
        >
            <slot name="bottom" />
        </div>
    </div>
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
    },
    color: {
        type: String,
        default: 'surface'
    },
    elevation: {
        type: [Number, String],
        default: 1
    },
    flat: {
        type: Boolean,
        default: false
    },
    prominent: {
        type: Boolean,
        default: false
    },
    density: {
        type: String,
        default: 'default'
    },
})
</script>

<style scoped>
.header-bottom {
    position: sticky;
    top: 64px;
    left: 0;
    right: 0;

    z-index: 999;

    background: rgb(var(--v-theme-surface));
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}
</style>