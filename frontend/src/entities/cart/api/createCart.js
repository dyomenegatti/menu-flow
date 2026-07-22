import api from "../../../shared/api";

export async function createCart() {
    const response = await api.post('/cart');

    return response.data;
}