<template>
    <BaseCard
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

            <div class="text-subtitle-1 font-weight-semibold text-primary d-flex justify-space-between align-center">
                {{ formattedPrice }}

                <BaseButton
                    variant="ghost"
                    rounded="pill"
                    class="text-caption"
                    @click="addToCart"
                >
                    Adicionar
                </BaseButton>
            </div>
        </v-card-text>
    </BaseCard>
</template>

<script setup>
import { computed } from 'vue';
import BaseCard from '../../../shared/ui/card/BaseCard.vue';
import BaseButton from '../../../shared/ui/button/BaseButton.vue';

const emit = defineEmits(['click', 'add-to-cart']);

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

function addToCart(event) {
    event.stopPropagation();

    emit('add-to-cart', {
        product_id: props.product.id,
        quantity: 1,
        addons: [],
        options: [],
        observation: null
    });
}

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

.text-caption {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>