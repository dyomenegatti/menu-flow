import api from '../../../shared/api/index';

export async function getRestaurant() {
    const response = await api.get('/restaurant');

    return response?.data ?? null;
}