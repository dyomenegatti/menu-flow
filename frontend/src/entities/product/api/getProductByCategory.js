import api from '../../../shared/api/index';

export async function getProductByCategory(id) {
  const response = await api.get(`/categories/${id}/products`);

  return response.data;
}