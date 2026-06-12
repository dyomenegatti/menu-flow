<template>
    <v-card
        class="mx-auto border-thin product-card"
        max-width="400"
        height="350"
        variant="flat"
        @click="$emit('click', product)"
    >
        <v-img
            height="200"
            :src="product.image"
            cover
        ></v-img>

        <v-card-text class="d-flex flex-column ga-2">
            <div class="text-subtitle-1 font-weight-semibold">
                {{ product.name }}
            </div>

            <div class="text-caption text-medium-emphasis">
                {{ product.description }}
            </div>

            <div class="text-subtitle-1 font-weight-black text-primary">
                R$ {{ formattedPrice }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { computed } from 'vue';

defineEmits(['click']);

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const formattedPrice = computed(() =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(props.product.price)
);
</script>

<style scoped>
.product-card {
    transition: all 0.3s ease;
}

.product-card:hover {
    transform: translateY(-6px);
}
</style>