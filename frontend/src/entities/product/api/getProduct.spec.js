import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from 'vitest';

import api from '../../../shared/api';
import { getProduct } from './getProduct';

vi.mock('../../../shared/api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('getProduct', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return product when api returns data', async () => {
        const productId = 1;

        const productMock = {
            id: productId,
            name: 'X-Bacon',
            price: 25.90
        };

        api.get.mockResolvedValue({
            data: productMock
        });

        const result = await getProduct(productId);

        expect(api.get).toHaveBeenCalledTimes(1);

        expect(api.get).toHaveBeenCalledWith(
            `/products/${productId}`
        );

        expect(result).toEqual(productMock);
    });

    it('should return product with all its data', async () => {
        const productId = 10;

        const productMock = {
            id: productId,
            name: 'X-Tudo',
            price: 32.50,
            description: 'Hambúrguer completo',
            category_id: 2
        };

        api.get.mockResolvedValue({
            data: productMock
        });

        const result = await getProduct(productId);

        expect(result).toEqual(productMock);
    });

    it('should return null when api returns null', async () => {
        const productId = 1;

        api.get.mockResolvedValue({
            data: null
        });

        const result = await getProduct(productId);

        expect(api.get).toHaveBeenCalledWith(
            `/products/${productId}`
        );

        expect(result).toBe(null);
    });

    it('should throw error when api request fails', async () => {
        const productId = 1;

        const error = new Error(
            'Erro ao buscar produto'
        );

        api.get.mockRejectedValue(error);

        await expect(
            getProduct(productId)
        ).rejects.toThrow(
            'Erro ao buscar produto'
        );

        expect(api.get).toHaveBeenCalledWith(
            `/products/${productId}`
        );
    });
});