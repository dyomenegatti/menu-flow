import { describe, it, expect, vi, beforeEach } from 'vitest';

import api from '../../../shared/api';
import { createCart } from './createCart';

vi.mock('../../../shared/api', () => ({
    default: {
        post: vi.fn()
    }
}));

describe('createCart', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create a cart', async () => {
        const cartMock = {
            token: 'cart-token-123'
        };

        api.post.mockResolvedValue({
            data: cartMock
        });

        const result = await createCart();

        expect(api.post).toHaveBeenCalledWith('/cart');
        expect(result).toEqual(cartMock);
    });
});