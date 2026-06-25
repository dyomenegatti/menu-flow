import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCategories } from "../api/getCategories";
import { useCategories } from "./useCategories";

vi.mock('../api/getCategories', () => ({
    getCategories: vi.fn()
}));

describe('useCategories', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve carregar categorias com sucesso', async () => {
        const mockCategories = [
            { id: 1, name: 'Hambúrgueres' },
            { id: 2, name: 'Bebidas' }
        ];

        getCategories.mockResolvedValue(mockCategories);

        const {
            categories, 
            loading,
            error, 
            fetchCategories
        } = useCategories();

        await fetchCategories();

        expect(getCategories).toHaveBeenCalledTimes(1);
        expect(categories.value).toEqual(mockCategories);
        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('deve tratar error ao carregar categories', async () => {
        getCategories.mockRejectedValue(
            new Error('Erro na API')
        );

        const {
            categories,
            loading,
            error,
            fetchCategories
        } = useCategories();

        await fetchCategories();

        expect(getCategories).toHaveBeenCalledTimes(1);
        expect(categories.value).toEqual([]);
        expect(error.value).toBe('Erro na API');
        expect(loading.value).toBe(false);
    });
})