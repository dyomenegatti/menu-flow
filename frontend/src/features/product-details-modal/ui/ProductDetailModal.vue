<template>
    <BaseModal
        :dialog="dialog"
        @update:dialog="$emit('update:dialog', $event)"
        :title="product?.name"
        :subtitle="product?.description"
        :max-width="600"
    >
        <v-img
            height="250"
            cover
            :src="product?.image"
        />

        <div class="d-flex justify-space-between align-center py-4">
            <span class="text-body-2">Preço base </span>
            <span class="text-h6 text-primary font-weight-semibold">
                {{ formattedPrice }}
            </span>
        </div>

        <v-divider />

        <div class="d-flex flex-column ga-6">
            <div class="d-flex flex-column">
                <div class="text-subtitle-1 font-weight-semibold">Quantidade</div>

                <QuantitySelector
                    v-model="quantity"
                ></QuantitySelector>
            </div>

            <div class="d-flex flex-column" v-if="productAddons.length > 0">
                <div class="text-subtitle-1 font-weight-semibold">Acréscimos</div>

                <div class="d-flex flex-column ga-2">
                    <Checkbox 
                        v-for="item in productAddons.filter(addon => addon.active)"
                        :key="item.id"
                        v-model="selectedAddons"
                        :value="item.id"
                        :label="item.name"
                        :price="item.price"
                        :show-price="true"
                    />
                </div>
            </div>

            <div class="d-flex flex-column" v-if="productOptions.length > 0">
                <div class="text-subtitle-1 font-weight-semibold">Opções</div>

                <div class="d-flex flex-column ga-2">
                    <Checkbox 
                        v-for="item in productOptions.filter(option => option.active)"
                        :key="item.id"
                        v-model="selectedOptions"
                        :value="item.id"
                        :label="item.name"
                        :price="item.price"
                        :show-price="true"
                    />
                </div>
            </div>

            <div class="d-flex flex-column">
                <div class="text-subtitle-1 font-weight-semibold">Observações</div>

                <div>
                    <Textarea 
                        v-model="observation"
                        placeholder="Ex: Sem cebola, ponto da carne mal passado..."
                    />
                </div>
            </div>

            <v-divider></v-divider>

            <div class="d-flex justify-space-between align-center py-4">
                <span class="text-body-2 font-weight-semibold">
                    Total
                </span>
                <span class="text-h6 text-primary font-weight-semibold">
                    R$ {{ total }}
                </span>
            </div>
        </div>

        <BaseButton
            variant="primary"
            rounded="lg"
            border="sm"
            class="w-100"
            :loading="loading"
            :disabled="!product"
            @click="save"
        >
            {{ isEditing ? 'Salvar alterações' : 'Adicionar ao carrinho' }}
        </BaseButton>
    </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

import BaseModal from '../../../shared/ui/modal/BaseModal.vue';
import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import QuantitySelector from '../../../shared/ui/quantity-selector/QuantitySelector.vue';
import Checkbox from '../../../shared/ui/checkbox/Checkbox.vue';
import Textarea from '../../../shared/ui/textarea/Textarea.vue';

import { getProduct } from '../../../entities/product/api/getProduct.js';
import { useCart } from '../../../entities/cart/model/useCart.js';

const {
    addItem,
    updateItem,
    loading
} = useCart();

const emits = defineEmits(['update:dialog', 'add-to-cart', 'update-cart-item']);

const props = defineProps({
    dialog: {
        type: Boolean,
        default: false
    },
    product: {
        type: Object,
        default: () => ({})
    },
    cartItem: {
        type: Object,
        default: null
    }
});

const productDetails = ref(null);
const productAddons = computed(() => productDetails.value?.addons ?? []);
const productOptions = computed(() => productDetails.value?.options ?? []);

const quantity = ref(1);
const selectedAddons = ref([]);
const selectedOptions = ref([]);
const observation = ref('');

const formattedPrice = computed(() =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(props.product?.price || 0)
);

const total = computed(() => {
    const productPrice = Number(props.product?.price || 0);

    const addonsTotal = calculateSelectedTotal(
        selectedAddons.value,
        productAddons.value
    );

    const optionsTotal = calculateSelectedTotal(
        selectedOptions.value,
        productOptions.value
    );

    return (
        (productPrice + addonsTotal + optionsTotal) *
        quantity.value
    ).toFixed(2);
});

const formattedTotal = computed(() => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(total.value)
});

const isEditing = computed(() => !!props.cartItem);

function calculateSelectedTotal(selectedId, list) {
    return selectedId.reduce((sum, selectedId) => {
        const item = list.find(
            option => option.id === Number(selectedId)
        );

        return sum + Number(item?.price || 0);
    }, 0);
}

function save() {
    const payload = {
        product_id: props.product.id,
        quantity: quantity.value,
        addons: selectedAddons.value,
        options: selectedOptions.value,
        observation: observation.value
    };

    if(isEditing.value) {
        emits('update-cart-item', {
            id: props.cartItem.id,
            ...payload
        });
    } else {
        emits('add-to-cart', payload);
    } 
    emits('update:dialog', false);
}

function resetForm() {
    quantity.value = 1;
    selectedAddons.value = [];
    selectedOptions.value = [];
    observation.value = '';
    productDetails.value = null;
}

watch(
    () => [props.dialog, props.cartItem],
    async ([dialog]) => {
        if(!dialog) {
            resetForm();
            return;
        }

        const data = await getProduct(props.product.id);
        productDetails.value = data;

        if(!props.cartItem) {
            return;
        }

        quantity.value = props.cartItem.quantity;
        selectedAddons.value = props.cartItem.addons.map(addon => addon.id);
        selectedOptions.value = props.cartItem.options.map(option => option.id);
        observation.value = props.cartItem.observation ?? '';
    },
    { immediate: true }
);
</script>