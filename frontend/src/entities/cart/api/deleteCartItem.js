import api from "../../../shared/api";

export async function deleteCartItem(id) {
    const token = localStorage.getItem("cartToken");

    const response = await api.delete(`/cart/items/${id}`, {
        headers: {
            "X-Cart-Token": token
        }
    });

    return response.data;
}