<template>
    <div>
        <v-card
            v-for="item in items"
            :key="item.id"
            variant="flat"
            rounded="xl"
            class="pa-5 mb-4"
        >
            <div class="d-flex justify-space-between mb-4">
                <div class="d-flex ga-4">
                    <v-img
                        height="100"
                        :width="100"
                        rounded="xl"
                        elevation="2"
                        cover
                        :src="item?.image"
                    />

                    <div>
                        <div class="font-weight-bold">
                            {{ item.name }}
                        </div>

                        <div class="text-medium-emphasis">
                            R$ {{ item.product_price }} cada
                        </div>
                    </div>
                </div>

                <div>
                    <v-btn
                        icon="mdi-pencil"
                        variant="text"
                        color="text-medium-emphasis"
                        :loading="loading.update"
                        @click="editItem(item)"
                    ></v-btn>
                    <v-btn
                        icon="mdi-delete-outline"
                        variant="text"
                        color="text-medium-emphasis"
                        :loading="loading.remove"
                        @click="removeItemCart(item.id)"
                    ></v-btn>
                </div>
            </div>

            <v-divider></v-divider>
            
            <div class="flex flex-column ga-4 my-4">
                <div class="mb-4 d-flex flex-column ga-2" v-if="item.addons.length">
                    <span class="font-weight-semibold">
                        Acréscimos
                    </span>
                    <span class="font-weight-light" v-for="addon in item.addons.filter(item => item.id)" :key="addon.id">
                        + {{ addon.name }}
                    </span>
                </div>

                <div class="mb-4 d-flex flex-column ga-2" v-if="item.options.length">
                    <span class="font-weight-semibold">
                        Opções
                    </span>
                    <span class="font-weight-light"  v-for="option in item.options.filter(item => item.id)" :key="option.id">
                        + {{ option.name }}
                    </span>
                </div>

                <div class="mb-4 d-flex flex-column ga-2" v-if="item.observation">
                    <span class="font-weight-semibold">
                        Observações
                    </span>
                    <span class="font-weight-light">
                        {{ item.observation }}
                    </span>
                </div>

                <v-divider v-if="item.addons.length || item.options.length || item.observation"/>
            </div>

            <div class="d-flex align-end justify-end mt-4">
                <div class="text-h6 text-primary font-weight-bold">
                    {{ formattedPrice(item.total) }}
                </div>
            </div>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProducts } from '../../product/model/useProducts';
import { useCart } from '../model/useCart';

const props = defineProps({
    items: Object
});

const emit = defineEmits(['edit-item']);

const {
    items,
    total,
    loading,
    updateItem,
    removeItemCart,
    clearCart
} = useCart();

const {
    selectedProduct,
    fetchProduct
} = useProducts();

function formattedPrice(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value || 0)
};

async function editItem(item) {
    await fetchProduct(item.product_id);

    emit('edit-item', {
        cartItem: item,
        product: selectedProduct.value
    })
};
</script>