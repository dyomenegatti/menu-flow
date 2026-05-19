<template>
    <AppHeader title="Burger House" subtitle="Peça agora" class="menu-header border-b-sm" elevation="0" >
        <template v-slot:append>
            <div class="d-flex ga-2">
                <BaseButton
                    variant="outlined"
                    icon="mdi-cart-outline"
                    size="40"
                    rounded="lg"
                    border="sm"
                />
                <BaseButton
                    variant="outlined"
                    icon="mdi-information-outline"
                    size="40"
                    rounded="lg"
                    border="sm"
                    @click="openInfoModal"
                />
                <BaseButton
                    variant="text"
                    icon="mdi-theme-light-dark"
                    size="40"
                    rounded="lg"
                />
            </div>
        </template>
    </AppHeader>

    <AppSidebar 
        :items="categories"
        layout="contained"
    >
        <template #before-list>
            <div class="text-subtitle-2 text-medium-emphasis text-uppercase font-weight-semibold ml-5 mt-5">
               Categorias
            </div>
        </template>

          <template #item="{ item }">
            <CategoryItem :category="item" />
        </template>

        <template #after-list>
            <v-divider></v-divider>

            <div class="d-flex justify-center mt-3">
                <BaseButton
                    variant="outlined"
                    prepend-icon="mdi-information-outline"
                    title="Informações"
                    rounded="lg"
                    density="comfortable"
                    @click="openInfoModal"
                />
            </div>
        </template>
    </AppSidebar>

    <InfoModal 
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
import { ref } from 'vue';
import AppHeader from '../../widgets/app-header/AppHeader.vue';
import BaseButton from '../../shared/ui/button/BaseButton.vue';
import AppSidebar from '../../widgets/app-sidebar/AppSidebar.vue';
import InfoModal from '../../widgets/info-modal/InfoModal.vue';
import CategoryItem from '../../entities/category/ui/CategoryItem.vue';
import { onMounted } from 'vue'
import { useCategories } from '../../entities/category/model/useCategories'

const {
  categories,
  fetchCategories
} = useCategories();

onMounted(() => {
  fetchCategories()
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

function toLoginPage() {
  router.push({ name: "Login" });
}

const showModal = ref(false);

function openInfoModal() {
    showModal.value = true;
}
</script>

<style scoped>
.dashboard-content {
    margin-left: 300px;
    height: 100vh;
    overflow: hidden;
    position: relative;
}

.menu-header {
    top: 0 !important;
    z-index: 1000;
    background: rgb(var(--v-theme-surface));
}

.dashboard-body {
    height: 100vh;
    overflow-y: auto;
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