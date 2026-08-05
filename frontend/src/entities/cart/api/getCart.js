import api from "../../../shared/api";

export async function getCart() {
    const token = localStorage.getItem("cartToken");

    const response = await api.get("/cart", {
        headers: {
            "X-Cart-Token": token
        }
    });

    return response.data;
}