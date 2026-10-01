<template>
    <BaseModal
        :dialog="dialog"
        @update:dialog="$emit('update:dialog', $event)"
        :title="product?.name"
        :subtitle="product?.description"
        :max-width="750"
    >
        <v-img height="250" cover :src="product?.image">
            <template #placeholder>
                <v-skeleton-loader type="image" height="250" />
            </template>
        </v-img>

        <div class="d-flex justify-space-between align-center py-4">
            <span class="text-body-2">Preço base </span>
            <span class="text-h6 text-primary font-weight-semibold">
                {{ formatCurrency(product.price) }}
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

            <div v-if="loadingDetails" class="d-flex flex-column ga-2">
                <v-skeleton-loader type="heading" />
                <v-skeleton-loader v-for="n in 3" :key="n" type="list-item" />
            </div>

            <template v-else>
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
            </template>

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
                    {{ formatCurrency(total) }}
                </span>
            </div>
        </div>

        <BaseButton
            variant="primary"
            rounded="lg"
            border="sm"
            class="w-100"
            :loading="saving"
            :disabled="!product || loadingDetails"
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

import { formatCurrency } from '../../../utils/formatCurrency.js';

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
const loadingDetails = ref(false);
const saving = ref(false);

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

const isEditing = computed(() => !!props.cartItem);

function calculateSelectedTotal(selectedId, list) {
    return selectedId.reduce((sum, selectedId) => {
        const item = list.find(
            option => option.id === Number(selectedId)
        );

        return sum + Number(item?.price || 0);
    }, 0);
}

async function save() {
    if(saving.value) return;

    saving.value = true;

    const payload = {
        product_id: props.product.id,
        quantity: quantity.value,
        addons: selectedAddons.value,
        options: selectedOptions.value,
        observation: observation.value
    };

    try {
        if (isEditing.value) {
            await updateItem({ id: props.cartItem.id, ...payload });
        } else {
            await addItem(payload);
        }

        emits('update:dialog', false);
    } catch (err) {
        console.error(err);
    } finally {
        saving.value = false;
    }
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

        loadingDetails.value = true;

        try {
            productDetails.value = await getProduct(props.product.id);
        } catch (err) {
            console.error(err);
        } finally {
            loadingDetails.value = false;
        }

        if (!props.cartItem) {
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