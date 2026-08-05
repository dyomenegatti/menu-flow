import { ref } from "vue";
import { getAddons } from "../api/getAddons";

const addons = ref([]);
const loading = ref(false);
const error = ref(null);

export function useAddons() {
    async function fetchAddons() {
        try {
            loading.value = true;
            error.value = null;

            const data = await getAddons();
            addons.value = data;
        } catch (err) {
            error.value = err?.message || 'Erro ao carregar os acréscimos'
        } finally {
            loading.value = false;
        }
    }

    return {
        addons,
        loading,
        error,
        fetchAddons
    };
}