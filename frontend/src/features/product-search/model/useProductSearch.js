import { ref } from "vue";
import { useProducts } from "../../../entities/product/model/useProducts";

export function useProductSearch() {
    const search = ref('');

    const {
        products,
        loading,
        error,
        fetchProductByCategory
    } = useProducts();

    async function searchProducts(categoryId) {
        await fetchProductByCategory(categoryId, search.value);
    }

    function clearSearch() {
        search.value = '';
    }

    return {
        search,
        products,
        loading,
        error,
        searchProducts,
        clearSearch
    };
}