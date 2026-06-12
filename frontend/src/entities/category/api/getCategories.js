import api from '../../../shared/api/index';

export async function getCategories() {
    const response = await api.get('/categories');

    return response?.data ?? [];
}