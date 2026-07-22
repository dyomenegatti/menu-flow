import { ref } from "vue";
import { getOptions } from "../api/getOptions";

const options = ref([]);
const loading = ref(false);
const error = ref(null);

export function useOptions() {
    async function fetchOptions() {
        try {
            loading.value = true;
            error.value = null;

            const data = await getOptions();
            options.value = data;
        } catch(err) {
            error.value = err?.message || 'Erro ao carregar as opções'
        } finally {
            loading.value = false;
        }
    }

    return {
        options,
        loading,
        error,
        fetchOptions
    };
}