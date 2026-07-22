import api from "../../../shared/api";

export async function getOptions() {
    const response = await api.get('/options');

    return response?.data ?? [];
}