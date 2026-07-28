import { describe, it, expect, vi, beforeEach } from "vitest";

import api from '../../../shared/api';
import { deleteCartItem } from "./deleteCartItem";

vi.mock('../../../shared/api', () => ({
    default: {
        delete: vi.fn()
    }
}));

describe('deleteCartItem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should delete cart item', async () => {
        const token = 'cart-token';

        localStorage.setItem('cartToken', token);

        api.delete.mockResolvedValue({
            data: {
                success: true
            }
        });

        const result = await deleteCartItem(10);

        expect(api.delete).toHaveBeenCalledWith(
            '/cart/items/10',
            {
                headers: {
                    'X-Cart-Token': token
                }
            }
        );

        expect(result).toEqual({
            success: true
        });
    });

    it('should send null token when cart token does not exist', async () => {
        api.delete.mockResolvedValue({
            data: {}
        });

        await deleteCartItem(5);

        expect(api.delete).toHaveBeenCalledWith(
            '/cart/items/5',
            {
                headers: {
                    'X-Cart-Token': null
                }
            }
        )
    });
});