import { ref } from 'vue';

import { getProductsByCategory } from '../api/getProductByCategory';

const products = ref([]);
const loading = ref(false);

export function useProducts() {

  async function fetchProducts(categorySlug) {
    loading.value = true;

    try {
      const response = await getProductsByCategory(categorySlug);

      products.value = response;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    loading,
    fetchProducts
  };
}