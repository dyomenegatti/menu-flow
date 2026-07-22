import api from "../../../shared/api";

export async function getProduct(id) {
    const response = await api.get(`/products/${id}`);

    return response.data;
}