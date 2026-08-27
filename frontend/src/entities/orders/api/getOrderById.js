import api from '../../../shared/api/index';

export async function getOrderById(id) {
    const response = await api.get(`/orders/${id}`);

    return response?.data ?? null;
}