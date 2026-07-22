<template>
    <div class="d-flex flex-column ga-4">
        <div class="d-flex justify-center align-center ga-4 w-100">
            <BaseButton
                variant="outlined"
                size="lg"
                rounded="pill"
                border="sm"
                :loading="loading"
                :active="deliveryType === 'delivery'"
                @click="deliveryType = 'delivery'"
            >
                <v-icon
                    icon="mdi-truck-delivery-outline"
                    size="20"
                    class="cursor-pointer mr-2"
                />
                Delivery
            </BaseButton>

            <BaseButton
                variant="outlined"
                size="lg"
                rounded="pill"
                border="sm"
                :loading="loading"
                :active="deliveryType === 'pickup'"
                @click="deliveryType = 'pickup'"
            >
                <v-icon
                    icon="mdi-home-outline"
                    size="20"
                    class="cursor-pointer mr-2"
                />
                Retirada
            </BaseButton>
        </div>

        <FormField 
            v-for="field in currentFields"
            :key="field.id"
            :field="field"
            v-model="form[field.key]"
        />
    </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';

import BaseButton from '../../../shared/ui/button/BaseButton.vue';
import FormField from '../../../shared/ui/form-field/FormField.vue';

import { checkoutFields } from '../model/checkoutFields';

const emit = defineEmits([
    'validation-change',
    'form-change'
]);

const deliveryType = ref('delivery');
const loading = ref(false);

const form = reactive(
    Object.values(checkoutFields)
        .flat()
        .reduce((acc, field) => {
            acc[field.key] = '';
            return acc;
        }, {})
);

const currentFields = computed(
    () => checkoutFields[deliveryType.value] ?? []
);

const isValid = computed(() => {
    return currentFields.value
        .filter(field => field.required)
        .every(field => form[field.key]?.trim());
});

watch(
    () => ({
        deliveryType: deliveryType.value,
        form: { ...form },
        valid: isValid.value
    }),
    value => {
        emit('validation-change', value.valid);

        emit('form-change', {
            deliveryType: value.deliveryType,
            form: value.form
        });
    },
    {
        immediate: true
    }
);
</script>