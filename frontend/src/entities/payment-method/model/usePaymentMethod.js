import { ref } from "vue";
import api from "../../../shared/api";

export function usePaymentMethod() {
    const paymentMethods = ref([]);
    const loading = ref(false);
    const error = ref(null);

    async function getPaymentMethods(restaurantId) {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.get('/payment-methods', {
                params: {
                    restaurant_id: restaurantId
                }
            });

            paymentMethods.value = response.data.data;
            console.log(paymentMethods.value)

            return response.data.data;
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        paymentMethods,
        loading,
        error,
        getPaymentMethods
    };
}