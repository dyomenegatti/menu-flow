import { ref } from 'vue';
import { getProductByCategory } from '../api/getProductByCategory';
import { getProduct } from '../api/getProduct';

const selectedProduct = ref(null);
const products = ref([]);
const loading = ref(false);
const error = ref(null);

export function useProducts() {
  async function fetchProductByCategory(categorySlug) {
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

  async function fetchProduct(id) {
    loading.value = true;
    error.value = null;

    try {
      const response = await getProduct(id);

      selectedProduct.value = response;
    } catch(err) {
       error.value = err?.message || 'Erro ao carregar produto';
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    loading,
    error,
    selectedProduct,
    fetchProductByCategory,
    fetchProduct
  };
}