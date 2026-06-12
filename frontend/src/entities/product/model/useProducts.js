import { ref } from 'vue';
import { getProductByCategory } from '../api/getProductByCategory';

export function useProducts() {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchProducts(categorySlug) {
    loading.value = true;
    error.value = null;

    try {
      const response = await getProductByCategory(categorySlug);

      products.value = response;
    } catch (error) {
      error.value = error;
      products.value= [];
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts
  };
}