import api from "../../../shared/api";

export async function getPaymentMethods(restaurantId) {
    const response = await api.get("/payment-methods", {
        params: {
            restaurant_id: restaurantId
        }
    });

    return response.data;
}