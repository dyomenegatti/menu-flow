import { ref } from 'vue';
import { addCartItem } from '../api/addCartItem';

const loading = ref(false);
const error = ref(null);

export function useAddCartItem() {

  async function execute(payload) {
    try {
      loading.value = true;
      error.value = null;

      return await addCartItem(payload);
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    execute
  };
}