<template>
    <BaseModal
        :dialog="dialog"
        @update:dialog="$emit('update:dialog', $event)"
        :title="product?.name"
        :subtitle="product?.description"
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

            <div class="d-flex flex-column">
                <div class="text-subtitle-1 font-weight-semibold">Acréscimos</div>

                <div class="d-flex flex-column ga-2">
                    <Checkbox 
                        v-for="item in addons.filter(addon => addon.active)"
                        :key="item.id"
                        v-model="selectedAddons"
                        :value="item.id"
                        :label="item.name"
                        :price="item.price"
                        :show-price="true"
                    />
                </div>
            </div>

            <div class="d-flex flex-column">
                <div class="text-subtitle-1 font-weight-semibold">Opções</div>

                <div>
                    <Checkbox 
                        v-for="item in options.filter(option => option.active)"
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
import { ref, computed, watch, onMounted } from 'vue';

import BaseModal from '../../../shared/ui/modal/BaseModal.vue';
import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import QuantitySelector from '../../../shared/ui/quantity-selector/QuantitySelector.vue';
import Checkbox from '../../../shared/ui/checkbox/Checkbox.vue';
import Textarea from '../../../shared/ui/textarea/Textarea.vue';

import { useAddons } from '../../../entities/addon/model/useAddons.js';
import { useOptions } from '../../../entities/option/model/useOptions.js';
import { useCart } from '../../../entities/cart/model/useCart.js';

const {
    addons,
    fetchAddons
} = useAddons();

const {
    options,
    fetchOptions
} = useOptions();

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
        addons.value
    );

    const optionsTotal = calculateSelectedTotal(
        selectedOptions.value,
        options.value
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
}

watch(
    () => [props.dialog, props.cartItem],
    async ([dialog]) => {
        if(!dialog) {
            resetForm();
            return;
        }

        await Promise.all([
            fetchAddons(),
            fetchOptions()
        ]);

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