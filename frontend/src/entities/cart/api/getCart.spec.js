import { describe, it, expect, vi, beforeEach } from 'vitest';

import api from '../../../shared/api';
import { getCart } from './getCart';

vi.mock('../../../shared/api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('getCart', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should get cart', async() => {
        const token = 'cart-token';

        localStorage.setItem('cartToken', token);

        const cartMock = {
            items: [
                {
                    id: 1
                }
            ]
        };

        api.get.mockResolvedValue({
            data: cartMock
        });

        const result = await getCart();

        expect(api.get).toHaveBeenCalledWith(
            '/cart', 
            {
                headers: {
                    'X-Cart-Token': token
                }
            }
        );

        expect(result).toEqual(cartMock);
    });

    it('should send null token when cart token does not exist', async () => {
        api.get.mockResolvedValue({
            data: {}
        });

        await getCart();

        expect(api.get).toHaveBeenCalledWith(
            '/cart',
            {
                headers: {
                    'X-Cart-Token': null
                }
            }
        );
    });
});