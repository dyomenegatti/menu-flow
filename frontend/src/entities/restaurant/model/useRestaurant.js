import { ref } from 'vue';
import { getRestaurant } from '../api/getRestaurant';

const restaurant = ref(null);
const loading = ref(false);
const error = ref(null);

export function useRestaurant() {

    async function fetchRestaurant() {
        try {
            loading.value = true;
            error.value = null;

            const data = await getRestaurant();

            restaurant.value = data;
            console.log('oi', restaurant.value)
        } catch (err) {
            restaurant.value = null;
            error.value = err?.message || 'Erro ao carregar informações do restaurante';
        } finally {
            loading.value = false;
        }
    }

    return {
        restaurant,
        loading,
        error,
        fetchRestaurant
    };
}