<template>
    <div class="d-flex flex-column ga-6 mt-3">
        <div class="d-flex flex-column ga-3">
            <div class="text-label-large font-weight-semibold">Endereço de retirada</div>

            <div class="text-center">
                {{ address }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    restaurant: {
        type: Object,
        default: null,
    },
});

const address = computed(() => {
    const address = props.restaurant?.address;

    if(!address) {
        return '-';
    }

    return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`;
});
</script>