import api from "."

export async function getCep(cep) {
    const response = await api.get(`/cep/${cep}`);

    return response.data;
}