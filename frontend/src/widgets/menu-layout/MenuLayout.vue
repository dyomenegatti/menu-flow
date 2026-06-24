<template>
    <AppHeader title="Burger House" subtitle="Peça agora" class="menu-header border-b-sm" elevation="0" >
        <template v-slot:append>
            <div class="d-flex ga-2">
                <BaseButton
                    variant="primary"
                    rounded="pill"
                    border="sm"
                >   
                    <v-icon icon="mdi-cart-outline"></v-icon> Carrinho
                </BaseButton>
                <BaseButton
                    variant="text"
                    size="40"
                    @click="openInfoModal"
                >   
                    <v-icon icon="mdi-information-outline"></v-icon>
                </BaseButton>
                <BaseButton
                    variant="text"
                    size="40"
                    @click="toggleTheme"
                >   
                    <v-icon icon="mdi-theme-light-dark"></v-icon>
                </BaseButton>
            </div>
        </template>

        <template #bottom>
            <v-slide-group
                v-if="mobile"
                show-arrows
                class="px-4 py-2"
            >
                <v-slide-group-item
                v-for="category in categories"
                :key="category.id"
                >
                <CategoryItem
                    :category="category"
                    variant="tab"
                />
                </v-slide-group-item>
            </v-slide-group>
        </template>
    </AppHeader>

    <AppSidebar 
        :items="categories"
        variant="contained"
    >
        <template #before-list>
            <div class="text-caption text-medium-emphasis text-uppercase font-weight-semibold ml-5 mt-5">
               Categorias
            </div>
        </template>

        <template #item="{ item }">
            <CategoryItem 
                :category="item"
                variant="sidebar" 
            />
        </template>

        <template #footer>
            <v-divider></v-divider>

            <div class="d-flex justify-center mt-3 mb-3">
                <BaseButton
                    variant="text"
                    class="w-75"
                    @click="openInfoModal"
                >   
                    <v-icon icon="mdi-information-outline text-medium-emphasis"></v-icon>
                    <span class="text-medium-emphasis">Informações</span>
                </BaseButton>
            </div>
        </template>
    </AppSidebar>

    <InfoModal 
        v-if="showModal"
        :show-dialog="showModal"
        @update:showDialog="showModal = $event"
        :items="infoItems"
    />

    <main class="dashboard-content">
        <section class="pt-16">
            <router-view></router-view>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import { useDisplay } from 'vuetify';

import { useCategories } from '../../entities/category/model/useCategories';

import AppHeader from '../../widgets/app-header/AppHeader.vue';
import BaseButton from '../../shared/ui/button/BaseButton.vue';
import AppSidebar from '../../widgets/app-sidebar/AppSidebar.vue';
import CategoryItem from '../../entities/category/ui/CategoryItem.vue';

const InfoModal = defineAsyncComponent(() => 
    import('../../widgets/info-modal/InfoModal.vue')
);

const { mobile } = useDisplay();

const router = useRouter();

const theme = useTheme();

function toggleTheme() {
    const newTheme = theme.global.current.value.dark
        ? 'lightTheme'
        : 'darkTheme'

    theme.global.name.value = newTheme

    localStorage.setItem('theme', newTheme)
}

const {
  categories,
  fetchCategories
} = useCategories();

onMounted(async () => {
    try {
        await fetchCategories();
    } catch (error) {
        console.error(error);
    }
});

const infoItems = [
    {
        title: 'Localização',
        icon: 'mdi-map-marker-outline',
        lines: [
        'Rua dos Burgers, 123',
        'Centro - São Paulo, SP',
        'CEP: 01234-567'
        ]
    },
    {
        title: 'Telefone',
        icon: 'mdi-phone-outline',
        lines: [
            '(11) 99999-9999',
            '(11) 88888-8888',
            'WhatsApp disponível',
            'iFood disponível',
        ]
    },
    {
        title: 'Horário de Funcionamento',
        icon: 'mdi-clock-time-five-outline',
        lines: [
            'Segunda a Sexta: 11h - 23h',
            'Sábado e Domingo: 12h - 00h',
            'Feriados: Consultar'
        ]
    },
];

const showModal = ref(false);

function openInfoModal() {
    showModal.value = true;
}
</script>

<style scoped>
.dashboard-content {
    margin-left: 256px;
    height: 100vh;
    position: relative;
}

.menu-header {
    top: 0 !important;
    z-index: 1000;
    background: rgb(var(--v-theme-surface));
}

.dashboard-content section {
    background: rgb(var(--v-theme-background));
}

@media (max-width: 900px) {
    .dashboard-content {
        margin-left: 0;
    }

    .menu-header {
        left: 0;
        top: 64px;
    }

    .dashboard-body {
        padding: 152px 16px 16px;
    }
}
</style>