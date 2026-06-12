<template>
    <v-navigation-drawer
        location="right"
        temporary
        :model-value="dialog"
        @update:model-value="$emit('update:dialog', $event)"
        width="500"
        class="pa-6 cart-content"
    >
        <div class="d-flex flex-column justify-space-between h-100">
            <div>
                <div class="d-flex justify-space-between align-start">
                    <div>
                        <h3>Carrinho de Compras</h3>
                        <span class="text-subtitle-2">{{ cart.items.length }} item(s) no carrinho</span>
                    </div>
        
                    <v-icon
                        icon="mdi-close"
                        size="20"
                        class="cursor-pointer"
                        @click="$emit('update:dialog', false)"
                    />
                </div>
        
                <v-card
                    variant="flat"
                    color="white"
                    class="pa-4"
                >
                    <div class="d-flex justify-space-between">
                        <div class="d-flex ga-4">
                            <v-sheet
                                color="primary"
                                width="100"
                                height="100"
                                rounded
                                elevation="2"
                            ></v-sheet>
        
                            <div>
                                <div class="font-weight-bold">
                                    {{ item.product.name }}
                                </div>
        
                                <div class="text-primary">
                                    {{ item.price }}
                                </div>
                            </div>
                        </div>
        
                        <v-btn
                            icon="mdi-delete-outline"
                            variant="text"
                            color="error"
                        ></v-btn>
                    </div>
        
                    <div class="mt-4">
                        <span class="font-weight-medium">
                            Maionese: Sim
                        </span>
                    </div>
        
                    <div class="d-flex justify-space-between align-center mt-4">
                        <div class="d-flex align-center ga-3">
                            <QuantitySelector
                                v-model="quantity"
                            ></QuantitySelector>
                        </div>
        
                        <div class="text-h6 text-orange font-weight-bold">
                            R$ 25.90
                        </div>
                    </div>
                </v-card>
            </div>

            <v-divider />
    
            <div class="d-flex flex-column">
                <div class="d-flex justify-space-between ma-2">
                    <span>Total</span>
        
                    <div class="text-h6 text-orange font-weight-bold">
                        R$ 25.90
                    </div>
                </div>
    
                <div class="d-flex flex-column ga-2">
                    <BaseButton
                        variant="primary"
                        rounded="lg"
                        border="sm"
                        class="w-100 bg-primary"
                        :loading="loading"
                    >
                        Finalizar Pedido
                    </BaseButton>
                    <BaseButton
                        variant="outlined"
                        rounded="lg"
                        border="sm"
                        class="w-100"
                        :loading="loading"
                    >
                        Limpar Carrinho
                    </BaseButton>
                </div>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import QuantitySelector from '../../../shared/ui/quantity-selector/QuantitySelector.vue';
import BaseButton from '../../../shared/ui/button/BaseButton.vue';

defineEmits(['update:dialog']);

defineProps({
    dialog: Boolean,
});

const quantity = ref(1);
</script>

<style scoped>
.cart-content {
    background: rgb(var(--v-theme-background));
}
</style>