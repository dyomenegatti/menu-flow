<template>
    <div class="d-flex flex-column ga-2">
        <div class="d-flex flex-column ga-4 w-100">
            <div class="text-title-medium font-weight-semibold mb-4">
                Seus dados
            </div>

            <v-row>
                <v-col cols="12" md="6" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
                        Nome completo (*)
                    </div>
        
                    <BaseInput
                        v-model="delivery.name"
                        placeholder="Seu nome"
                        type="text"
                        variant="outlined"
                        rounded="pill"
                        color="primary"
                    />
                </v-col>

                <v-col cols="12" md="6" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
                        Telefone/WhatsApp (*)
                    </div>
        
                    <BaseInput
                        v-model="phone"
                        placeholder="(11) 99999-9999"
                        type="tel"
                        variant="outlined"
                        rounded="pill"
                        color="primary"
                    />
                </v-col>
            </v-row>
        </div>

        <div class="d-flex flex-column ga-4 w-100">
            <div class="text-title-medium font-weight-semibold mb-4">
                Endereço de entrega
            </div>

            <v-row class="checkout-fields">
                <v-col cols="12" md="8" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
                        CEP (*)
                    </div>

                    <BaseInput
                        v-model="delivery.cep"
                        placeholder="00000-000"
                        type="number"
                        variant="outlined"
                        rounded="pill"
                        color="primary"
                        maxlength="9"
                        :loading="loadingCep"
                    />
                </v-col>

                <v-col cols="12" md="4" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
                        Número (*)
                    </div>

                    <BaseInput
                        v-model="delivery.number"
                        placeholder="123"
                        type="number"
                        variant="outlined"
                        rounded="pill"
                        color="primary"
                    />
                </v-col>

                <v-col cols="12" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
                        Rua (*)
                    </div>

                    <BaseInput
                        v-model="delivery.street"
                        placeholder="Rua ..."
                        type="text"
                        variant="outlined"
                        rounded="pill"
                        color="primary"
                    />
                </v-col>

                <v-col cols="12" md="6" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
                        Bairro (*)
                    </div>

                    <BaseInput
                        v-model="delivery.neighborhood"
                        placeholder="Bairro..."
                        type="text"
                        variant="outlined"
                        rounded="pill"
                        color="primary"
                    />
                </v-col>

                <v-col cols="12" md="6" class="py-1">
                    <div class="font-weight-light text-medium-emphasis mb-1">
                        Ponto de referência
                    </div>

                    <BaseInput
                        v-model="delivery.reference"
                        placeholder="Próximo ao..."
                        type="text"
                        variant="outlined"
                        rounded="pill"
                        color="primary"
                    />
                </v-col>
            </v-row>

            <div>
                <div class="font-weight-light text-medium-emphasis mb-1">
                    Observação
                </div>

                <BaseInput
                    v-model="delivery.observation"
                    placeholder="Alguma instrução?"
                    type="textarea"
                    variant="outlined"
                    rounded="pill"
                    color="primary"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

import BaseInput from '../../../shared/ui/input/BaseInput.vue'

import { getCep } from '../../../shared/api/cep.js';
import { formatPhoneInput } from '../../../utils/formatPhone.js';

const delivery = defineModel({
    type: Object,
    required: true
});

const loadingCep = ref(false);

watch(
    () => delivery.value.cep,
    async cep => {
        const cleanCep = cep.replace(/\D/g, '');

        if(cleanCep.length !== 8) {
            return;
        }

        loadingCep.value = true;

        try {
            const data = await getCep(cleanCep);

            delivery.value.street = data.logradouro || '';
            delivery.value.neighborhood = data.bairro || '';
        } finally {
            loadingCep.value = false;
        }
    }
);

const phone = computed({
    get: () => delivery.value.phone,
    set: (value) => {
        delivery.value.phone = formatPhoneInput(value);
    }
});
</script>