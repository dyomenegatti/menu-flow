<template>
    <div class="d-flex flex-column ga-2">
        <div class="d-flex align-center ga-2">
            <v-icon
                :icon="field.icon"
                size="20"
            />
            {{ field.label }}
        </div>

        <BaseInput
            v-model="model"
            :placeholder="field.placeholder"
            :type="field.type"
            variant="outlined"
            rounded="pill"
            color="primary"
        />
    </div>
</template>


<script setup>
import BaseInput from '../input/BaseInput.vue';

const model = defineModel();

defineProps({
    field: {
        type: Object,
        required: true
    }
});
</script>