import api from "../../../shared/api";

export async function addCartItem(data) {
    const token = localStorage.getItem("cartToken");

    const response = await api.post("/cart/items", data, {
        headers: {
            "X-Cart-Token": token
        }
    });

    return response.data;
}