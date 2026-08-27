import { ref } from "vue";
import { createOrder } from "../api/createOrder";

export function useOrder() {
    const orderSnapshot = ref(null);
    const loading = ref(false);
    const error = ref(null);

    function createSnapshot(data) {
        orderSnapshot.value = structuredClone(data);

        return orderSnapshot.value;
    }

    async function submitOrder() {
        if(!orderSnapshot.value) {
            throw new Error('Nenhum pedido para enviar.');
        }

        loading.value = true;
        error.value = null;

        try {
            return await createOrder(orderSnapshot.value);
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function clearOrder() {
        orderSnapshot.value = null;
    }

    return {
        orderSnapshot,
        loading,
        error,
        createSnapshot,
        submitOrder,
        clearOrder
    };
}