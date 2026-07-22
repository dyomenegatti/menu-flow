import api from "../../../shared/api";

export async function getAddons() {
    const response = await api.get('/addons');

    return response?.data ?? [];
}