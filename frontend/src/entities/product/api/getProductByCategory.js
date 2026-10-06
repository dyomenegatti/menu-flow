import api from '../../../shared/api/index';

export async function getProductByCategory(id, search = '') {
  const response = await api.get(`/categories/${id}/products`, {
    params: {
      search: search || undefined
    }
  });

  return response.data;
}