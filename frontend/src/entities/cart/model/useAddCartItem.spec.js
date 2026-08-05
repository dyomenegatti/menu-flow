import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useAddCartItem } from './useAddCartItem';
import { addCartItem } from '../api/addCartItem';

vi.mock('../api/addCartItem', () => ({
    addCartItem: vi.fn()
}));

describe('useAddCartItem', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        const { loading } = useAddCartItem();

        loading.value = false;
    });

    it('should initialize with loading false', () => {
        const { loading } = useAddCartItem();

        expect(loading.value).toBe(false);
    });

    it('should execute add cart item successfully', async () => {
        const payload = {
            productId: 1,
            quantity: 2
        };

        const response = {
            id: 10
        };

        addCartItem.mockResolvedValue(response);

        const {
            execute,
            loading
        } = useAddCartItem();

        const promise = execute(payload);

        expect(loading.value).toBe(true);

        const result = await promise;

        expect(addCartItem).toHaveBeenCalledWith(payload);
        expect(result).toEqual(response);
        expect(loading.value).toBe(false);
    });

    it('should throw error when add cart item fails', async() => {
        const error = new Error('Erro na API');

        addCartItem.mockRejectedValue(error);

        const {
            execute, 
            loading
        } = useAddCartItem();

        await expect(
            execute({})
        ).rejects.toThrow('Erro na API');

        expect(loading.value).toBe(false);
    });

});