import { describe, it, expect, vi, beforeEach } from 'vitest';

import api from '../../../shared/api';
import { addCartItem } from './addCartItem';

vi.mock('../../../shared/api', () => ({
    default: {
        post: vi.fn()
    }
}));

describe('addCartItem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should add cart item with cart token', async () => {
        const token = 'cart-token-123';

        localStorage.setItem('cartToken', token);

        const itemData = {
            productId: 1,
            quantity: 2
        };

        const responseMock = {
            id: 10,
            productId: 1,
            quantity: 2
        };

        api.post.mockResolvedValue({
            data: responseMock
        });

        const result = await addCartItem(itemData);

        expect(api.post).toHaveBeenCalledWith(
            '/cart/items',
            itemData,
            {
                headers: {
                    'X-Cart-Token': token
                }
            }
        );

        expect(result).toEqual(responseMock);
    });

    it('should add cart item without token when cartToken does exist', async () => {
        const itemData = {
            productId: 1, 
            quantity: 1
        };

        api.post.mockResolvedValue({
            data: {}
        });

        await addCartItem(itemData);

        expect(api.post).toHaveBeenCalledWith(
            `/cart/items`,
            itemData,
            {
                headers: {
                    'X-Cart-Token': null
                }
            }
        );
    })    ;
})