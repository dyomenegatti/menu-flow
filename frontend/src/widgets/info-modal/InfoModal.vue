<template>
    <BaseModal 
        :dialog="showDialog"
        @update:dialog="emit('update:showDialog', $event)"
        title="Informações do Restaurante"
        subtitle="Confira nosso endereço, telefone e horário de funcionamento"
        :card-props="{
            variant: 'elevated',
            rounded: 'lg'
        }"
        :max-width="450"
    >
        <div class="d-flex flex-column ga-5">
            <div class="d-flex ga-3" v-for="(item, index) in items" :key="index">
                <v-avatar color="primary" size="48" variant="tonal">
                    <v-icon :icon="item.icon"></v-icon>
                </v-avatar>
                
                <div class="d-flex flex-column">
                    <div class="text-h6 font-weight-semibold">{{ item.title }}</div>
                    <span class="text-medium-emphasis text-body-2" v-for="(line, index) in item.lines" :key="index">
                        {{ line }}
                    </span>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import BaseModal from '../../shared/ui/modal/BaseModal.vue';

const emit = defineEmits(['update:showDialog']);

const propts = defineProps({
    showDialog: {
        type: Boolean,
        default: false
    },  
    items: {
        type: Array,
        default: () => [],
    },
});
</script>