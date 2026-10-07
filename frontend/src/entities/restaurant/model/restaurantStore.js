import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { getRestaurantStatus } from '../../../shared/lib/restaurant/getRestaurantStatus';
import { isRestaurantOpen } from '../../../shared/lib/restaurant/isRestaurantOpen';
import { getRestaurant } from '../api/getRestaurant';

export const useRestaurantStore = defineStore('restaurant', () => {
    const restaurant = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const restaurantStatus = computed(() => {
        return getRestaurantStatus(restaurant.value);
    });

    const isOpen = computed(() => {
        return isRestaurantOpen(restaurant.value);
    });

    async function fetchRestaurant() {
        try {
            loading.value = true;
            error.value = null;

            const data = await getRestaurant();

            restaurant.value = data;
        } catch (err) {
            restaurant.value = null;

            error.value =
                err?.message ||
                'Erro ao carregar informações do restaurante.';
        } finally {
            loading.value = false;
        }
    }

    return {
        restaurant,
        loading,
        error,
        restaurantStatus,
        isOpen,
        fetchRestaurant
    };
});