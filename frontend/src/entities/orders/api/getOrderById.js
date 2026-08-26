import api from '../../../shared/api/index';

export async function getOrder() {
    const response = await api.get(`/orders/${id}`);

    return response?.data ?? null;
}