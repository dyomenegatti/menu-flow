import { ref } from 'vue';
import { getCategories } from '../api/getCategories';

const categories = ref([]);
const loading = ref(false);
const error = ref(null);

export function useCategories() {

    async function fetchCategories() {
        try {
            loading.value = true;
            error.value = null;

            const data = await getCategories();

            categories.value = data;
        } catch (err) {
            categories.value = [];
            error.value = err?.message || 'Erro ao carregar categorias';
        } finally {
            loading.value = false;
        }
    }

    return {
        categories,
        loading,
        error,
        fetchCategories
    };
}