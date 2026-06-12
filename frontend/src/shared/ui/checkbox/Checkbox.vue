<template>
    <div class="d-flex justify-space-between align-center border-thin rounded-lg pr-3 pl-3">
        <div class="d-flex align-center ga-2">
            <v-checkbox 
                :model-value="isChecked"
                hide-details
                density="compact"
                color="primary"
                @click="toggle"
            ></v-checkbox>

            <span class="font-weight-semibold text-subtitle-1">
                {{ label }}
            </span>
        </div>

        <span v-if="showPrice" class="font-weight-semibold text-primary">
            + R$ {{ price }}
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    value: {
        type: [String, Number],
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: [String, Number],
        default: ''
    },
    showPrice: {
        type: Boolean,
        default: false
    }
});

const isChecked = computed(() =>
  props.modelValue.includes(props.value)
);

function toggle() {
  const updated = [...props.modelValue];

  if (isChecked.value) {
    emit('update:modelValue', updated.filter(v => v !== props.value));
  } else {
    updated.push(props.value);
    emit('update:modelValue', updated);
  }
}
</script>