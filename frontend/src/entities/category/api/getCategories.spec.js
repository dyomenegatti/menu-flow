import { describe, it, expect, vi } from 'vitest';
import { getCategories } from './getCategories';
import api from '../../../shared/api';

vi.mock('../../../shared/api/index', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('getCategories', () => {
    it('deve retornar os dados da API', async () => {
        const categories = [
            { id: 1, name: 'Hambúrgueres' },
            { id: 2, name: 'Bebidas' }
        ];

        api.get.mockResolvedValue({
            data: categories
        });

        const result = await getCategories();

        expect(api.get).toHaveBeenCalledWith('/categories');
        expect(result).toEqual(categories);
    });

    it('deve retornar array vazio quando data não existir', async() => {
        api.get.mockResolvedValue({});

        const result = await getCategories();

        expect(result).toEqual([]);
    })
})