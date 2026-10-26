<template>
    <div class="mb-4">
        <v-list-subheader class="text-uppercase">
            {{ title }}
        </v-list-subheader>

        <v-list-item 
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            :title="item.title"
            :prepend-icon="item.icon"
            rounded="pill"
            color="primary"
            exact
        />
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
});
</script>
