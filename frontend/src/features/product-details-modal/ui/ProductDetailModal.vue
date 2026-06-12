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
                R$ {{ formattedPrice }}
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
                        v-for="item in addons"
                        :key="item.id"
                        v-model="selectedAddons"
                        :value="item.id"
                        :label="item.label"
                        :price="item.price"
                        :show-price="true"
                    />
                </div>
            </div>

            <div class="d-flex flex-column">
                <div class="text-subtitle-1 font-weight-semibold">Opções</div>

                <div>
                    <Checkbox 
                        v-model="selectedOptions"
                        :value="2"
                        label="Com maionese"
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
            @click="addToCart"
        >
            Adicionar ao carrinho
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

const emits = defineEmits(['update:dialog']);

const props = defineProps({
    dialog: {
        type: Boolean,
        default: false
    },
    product: {
        type: Object,
        default: () => ({})
    }
});
const quantity = ref(1);

const selectedAddons = ref([]);
const selectedOptions = ref([]);

const observation = ref('');

const addons = [
    { id: 1, label: 'Bacon', price: 4.00 },
    { id: 2, label: 'Queijo Extra', price: 3.00 },
    { id: 3, label: 'Ovo', price: 2.50 },
    { id: 4, label: 'Cebola Caramelizada', price: 3.50 },
    { id: 5, label: 'Catupiry', price: 4.50 },
];

async function addToCart() {
    console.log('em andamento')
}

const total = computed(() => {
    const productPrice = Number(props.product?.price || 0);

    const addonsTotal = selectedAddons.value.reduce((sum, selectedId) => {
        const addon = addons.find(
            item => item.id === Number(selectedId)
        );

        return sum + (addon?.price || 0);
    }, 0);

    return ((productPrice + addonsTotal) * quantity.value).toFixed(2);
});

function resetForm() {
    quantity.value = 1;
    selectedAddons.value = [];
    selectedOptions.value = [];
    observation.value = '';
}

watch(
    () => props.dialog,
    (isOpen) => {
        if (!isOpen) {
            resetForm();
        }
    }
);

const formattedPrice = computed(() =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(props.product?.price || 0)
);
</script>