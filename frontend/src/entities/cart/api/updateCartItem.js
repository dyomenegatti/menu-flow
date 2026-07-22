import api from "../../../shared/api";

export async function updateCartItem(id, data) {
    const token = localStorage.getItem("cartToken");

    const response = await api.put(
        `/cart/items/${id}`,
        data,
        {
            headers: {
                "X-Cart-Token": token
            }
        }
    );

    return response.data;
}