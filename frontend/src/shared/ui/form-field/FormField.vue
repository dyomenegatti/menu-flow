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
            :model-value="modelValue"
            @update:model-value="emit('update:modelValue', $event)"
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

defineProps({

    field:{
        type:Object,
        required:true
    },

    modelValue:{
        type:[String, Number],
        default:''
    }

});


const emit = defineEmits([
    'update:modelValue'
]);
</script>