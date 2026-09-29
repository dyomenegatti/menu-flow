<template>
    <div class="d-flex flex-column ga-2">
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-account"
                    size="20"
                />
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
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-phone"
                    size="20"
                />
                Telefone/WhatsApp (*)
            </div>

            <BaseInput
                v-model="delivery.phone"
                placeholder="(11) 99999-9999"
                type="tel"
                variant="outlined"
                rounded="pill"
                color="primary"
            />
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-map-marker"
                    size="20"
                />
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
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-home"
                    size="20"
                />
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
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-home"
                    size="20"
                />
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
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-home"
                    size="20"
                />
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
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-map-marker-outline"
                    size="20"
                />
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
        </div>
        <div>
            <div class="d-flex align-center ga-2">
                <v-icon
                    icon="mdi-note-text-outline"
                    size="20"
                />
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
</template>

<script setup>
import BaseInput from '../../../shared/ui/input/BaseInput.vue'

import { getCep } from '../../../shared/api/cep.js';
import { ref, watch } from 'vue';

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

            console.log('oi', delivery.value)
        } finally {
            loadingCep.value = false;
        }
    }
);
</script>