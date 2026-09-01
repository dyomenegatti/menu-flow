<template>
    <div>
        <v-app-bar
            :color="color"
            :elevation="elevation"
            :flat="flat"
            :density="density"
            :prominent="prominent"
            :extension-height="slots.bottom ? 48 : 0"
        >
            <template v-slot:prepend>
                <slot name="prepend"></slot>
            </template>

            <v-app-bar-title>
                <div class="d-flex align-center ga-3">
                    <img :src="image || '/menu-flow.svg'" alt="Logo do Restaurante" :width="40" class="rounded-lg">
    
                    <div class="d-flex flex-column align-start">
                        <slot name="title">
                            <div class="font-weight-semibold">{{ title }}</div>
                        </slot>
        
                        <slot name="subtitle">
                            <div class="text-caption">{{ subtitle }}</div>
                        </slot>
                    </div>
                </div>
            </v-app-bar-title>

            <template #append>
                <slot name="append"></slot>
            </template>

            <template #extension>
                <slot name="bottom" />
            </template>
        </v-app-bar>
    </div>
</template>

<script setup>
import { useSlots } from 'vue';

const slots = useSlots();

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
    image: {
        type: String,
        default: ''
    }
});
</script>

<style scoped>
.header-bottom {
    position: sticky;
    top: 64px;
    left: 0;
    right: 0;
    background: rgb(var(--v-theme-surface));
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}
</style>