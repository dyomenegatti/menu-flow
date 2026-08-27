import api from '../../../shared/api/index';

export async function getOrder() {
    const response = await api.get('/orders');

    return response?.data ?? null;
}