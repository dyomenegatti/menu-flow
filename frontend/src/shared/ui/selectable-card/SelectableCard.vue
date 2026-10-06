<template>
    <v-card 
        v-for="item in items"
        :key="item.id"
        variant="outlined"
        rounded="xl"
        class="d-flex justify-center align-center pa-4 mb-3 w-50"
        :class="{ selected: model === item.id }"
        @click="model = item.id"
    >
        <div class="d-flex flex-column align-center justify-center text-center ga-1">
            <v-icon
                :icon="item.icon"
                size="30"
            />

            <div class="text-h6 font-weight-bold">
                {{ item.title }}
            </div>

            <div class="text-caption subtitle">
                {{ item.subtitle }}
            </div>
        </div>
    </v-card>
</template>

<script setup>
const { items } = defineProps({
    items: {
        type: [Array, Object],
        required: true
    }
});

const model = defineModel();
</script>

<style scoped>
.selected {
    background-color: rgba(var(--v-theme-primary), 0.15);
    border-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary));
}
</style>