import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProductByCategory } from "../api/getProductByCategory";
import { useProducts } from "./useProducts";

vi.mock('../api/getProductByCategory', () => ({
    getProductByCategory: vi.fn()
}));

describe('useProducts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve carregar produtos com sucesso', async() => {
        const mockProducts = [
            { id: 1, name: 'X-Burguer' },
            { id: 2, name: 'X-Salada' }
        ];

        getProductByCategory.mockProducts(mockProducts);

        const {
            products,
            loading,
            error,
            fetchProductByCategory
        } = useProducts();

        await fetchProductByCategory(1);

        expect(getProductByCategory).toHaveBeenCalledWith(1);
        expect(products.value).toEqual(mockProducts);
        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });
})