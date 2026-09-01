<template>
    <AppHeader 
        :title="restaurant?.name" 
        :image="restaurant?.image"
        subtitle="Peça agora" 
        class="menu-header border-b-sm" 
        elevation="0" 
        :bottom="mobile"
    >
        <template v-slot:append>
            <div class="d-flex justify-center align-center ga-2">
                <BaseButton
                    v-if="!mobile"
                    variant="primary"
                    rounded="pill"
                    border="sm"
                    @click="openCart"
                >
                    <v-icon icon="mdi-cart-outline"></v-icon>
                    Carrinho
                </BaseButton>

                <BaseButton
                    variant="text"
                    size="sm"
                    @click="openInfoModal"
                >
                    <v-icon icon="mdi-information-outline"></v-icon>
                </BaseButton>

                <BaseButton
                    v-if="!mobile"
                    variant="text"
                    size="sm"
                    @click="toggleTheme"
                >
                    <v-icon icon="mdi-theme-light-dark"></v-icon>
                </BaseButton>

            </div>
        </template>

        <template #bottom v-if="mobile">
            <CategoryTabs :categories="categories" />
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
        :show-dialog="showModal"
        :restaurant="restaurant"
        @update:show-dialog="showModal = $event"
    />

    <CartModal 
        :dialog="isCartOpen"
        @update:dialog="closeCart"
    ></CartModal>

    <BaseButton
        v-if="mobile && !isCartOpen"
        class="floating-cart"
        variant="primary"
        @click="openCart"
    >
        <v-icon icon="mdi-cart-outline"></v-icon>
    </BaseButton>

    <main class="dashboard-content">
        <section class="pt-16">
            <router-view></router-view>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import { useDisplay } from 'vuetify';

import { useCategories } from '../../entities/category/model/useCategories';
import { useCart } from '../../entities/cart/model/useCart.js';
import { useRestaurant } from '../../entities/restaurant/model/useRestaurant.js';

import AppHeader from '../../widgets/app-header/AppHeader.vue';
import BaseButton from '../../shared/ui/button/BaseButton.vue';
import AppSidebar from '../../widgets/app-sidebar/AppSidebar.vue';
import CategoryItem from '../../entities/category/ui/CategoryItem.vue';
import CartModal from '../../entities/cart/ui/CartModal.vue';
import CategoryTabs from '../../entities/category/ui/CategoryTabs.vue';

const InfoModal = defineAsyncComponent(() => 
    import('../../widgets/info-modal/InfoModal.vue')
);

const { mobile } = useDisplay();

const router = useRouter();

const theme = useTheme();

const showModal = ref(false);

const {
  openCart,
  initializeCart,
  isCartOpen,
  closeCart
} = useCart();

const {
  categories,
  fetchCategories
} = useCategories();

const {
    restaurant,
    fetchRestaurant
} = useRestaurant();

function toggleTheme() {
    const newTheme = theme.global.current.value.dark
        ? 'lightTheme'
        : 'darkTheme'

    theme.global.name.value = newTheme

    localStorage.setItem('theme', newTheme)
};

function openInfoModal() {
    showModal.value = true;
};

onMounted(async () => {
    try {
        await Promise.all([
            fetchCategories(),
            initializeCart(),
            fetchRestaurant()
        ]);
    } catch (error) {
        console.error(error);
    }
});
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

.floating-cart {
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 2000;
    width: 64px !important;
    height: 64px !important;
    min-width: 64px !important;
    border-radius: 50% !important;
    padding: 0 !important;
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