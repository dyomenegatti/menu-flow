<template>
    <v-container class="d-flex flex-column ga-6">
        <div>
            <span>olá pedidos</span>

            <BaseTabs
                :tabs="tabs"
                :inset="true"
                color="primary"
                tabs-class="mb-2"
            >
                <template #one>
                    <v-sheet class="pa-5" color="purple">
                        One
                    </v-sheet>
                </template>

                <template #two>
                    <v-sheet class="pa-5" color="secondary">
                        Two
                    </v-sheet>
                </template>
            </BaseTabs>
        </div>
    </v-container>
</template>

<script setup>
import BaseTabs from '../../../shared/ui/tabs/BaseTabs.vue';

const tabs = [
    { title: 'Item One', value: 'one' },
    { title: 'Item Two', value: 'two' }
];
</script>