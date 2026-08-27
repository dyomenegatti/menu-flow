import api from '../../../shared/api/index';

export async function createOrder(order) {
    const response = await api.post('/orders', order);

    return response?.data ?? null;
}