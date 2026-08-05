import { describe, it, expect, vi, beforeEach } from "vitest";

import api from "../../../shared/api";
import { updateCartItem } from './updateCartItem';

vi.mock('../../../shared/api', () => ({
    default: {
        put: vi.fn()
    }
}));

describe('updateCartItem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should update cart item', async () => {
        const token = 'cart-token';

        localStorage.setItem('cartToken', token);

        const payload = {
            quantity: 3
        };

        const responseMock = {
            id: 1,
            quantity: 3
        };

        api.put.mockResolvedValue({
            data: responseMock
        });

        const result = await updateCartItem(1, payload);

        expect(api.put).toHaveBeenCalledWith(
            '/cart/items/1',
            payload,
            {
                headers: {
                    'X-Cart-Token': token
                }
            }
        );

        expect(result).toEqual(responseMock);
    });

    it('should send null token when cart token does not exist', async() => {
        api.put.mockResolvedValue({
            data: {}
        });

        await updateCartItem(5, {
            quantity: 2
        });

        expect(api.put).toHaveBeenCalledWith(
            '/cart/items/5',
            {
                quantity: 2
            },
            {
                headers: {
                    'X-Cart-Token': null
                }
            }
        );
    });
});