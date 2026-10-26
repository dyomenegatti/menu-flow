<template>
    <AppSidebar 
        :items="menuGroups"
        variant="contained"
    >
        <template #before-list>
            <div class="d-flex align-center ga-4 ma-5">
                <v-avatar size="40" rounded="0">
                    <img
                        :src="image || '/menu-flow.svg'"
                        alt="Logo do Restaurante"
                        cover
                        class="rounded-lg cursor-pointer"
                        width="100%"
                        height="100%"
                        @click="emit('logo-click')"
                    />
                </v-avatar>
                <div class="d-flex flex-column align-start">
                    <slot name="title">
                        <div class="font-weight-semibold">{{ restaurant?.name }}</div>
                    </slot>
    
                    <slot name="subtitle">
                        <div class="text-caption">{{ restaurantStatus }}</div>
                    </slot>
                </div>
            </div>

            <v-divider></v-divider>
        </template>

        <template #item="{ item }">
            <SidebarMenuGroup
                :title="item.title"
                :items="item.items"
            />
        </template>

        <template #footer>
            <v-divider></v-divider>

            <v-list>
                <v-list-item
                    prepend-icon="mdi-weather-night"
                    title="Modo Escuro"
                    rounded="lg"
                    class="mx-3 my-1"
                    @click="theme.toggle()"
                />

                <v-list-item
                    prepend-icon="mdi-logout"
                    title="Logout"
                    rounded="lg"
                    class="mx-3 my-1"
                    base-color="error"
                    @click="toLoginPage"
                />
            </v-list>
        </template>
    </AppSidebar>

    <main class="dashboard-content">
        <section class="pt-10">
            <router-view></router-view>
        </section>
    </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import AppSidebar from '../app-sidebar/AppSidebar.vue';
import SidebarMenuGroup from '../app-sidebar/SidebarMenuGroup.vue';

import { useRestaurantStore } from '../../entities/restaurant/model/restaurantStore.js';
import { getAdminMenu } from '../admin-layout/config/adminMenu.js';

const emit = defineEmits(['logo-click']);

const restaurantStore = useRestaurantStore();

const {
    restaurant,
    restaurantStatus,
    isOpen
} = storeToRefs(restaurantStore);

const {
    fetchRestaurant
} = restaurantStore;

const menuGroups = getAdminMenu();

onMounted(async () => {
    try {
        await Promise.all([
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

.dashboard-content section {
    background: rgb(var(--v-theme-background));
}

.layout-full {
  display: flex;
}

.content-area {
  flex: 1;
}

@media (max-width: 900px) {
    .dashboard-content {
        margin-left: 0;
        padding-bottom: calc(80px + env(safe-area-inset-bottom));
    }
}
</style>
