import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from 'vitest';

import api from '../../../shared/api/index';
import { createOrder } from './createOrder';

vi.mock('../../../shared/api/index', () => ({
    default: {
        post: vi.fn()
    }
}));

describe('createOrder', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create an order and return the response data', async () => {
        const orderMock = {
            customer_name: 'João',
            type: 'delivery',
            items: [
                {
                    product_id: 1,
                    quantity: 2
                }
            ]
        };

        const responseMock = {
            id: 10,
            ...orderMock,
            total: 30
        };

        api.post.mockResolvedValue({
            data: responseMock
        });

        const result = await createOrder(orderMock);

        expect(api.post).toHaveBeenCalledTimes(1);
        expect(api.post).toHaveBeenCalledWith(
            '/orders',
            orderMock
        );

        expect(result).toEqual(responseMock);
    });

    it('should return null when api returns no data', async () => {
        const orderMock = {
            customer_name: 'João',
            type: 'pickup',
            items: []
        };

        api.post.mockResolvedValue({});

        const result = await createOrder(orderMock);

        expect(api.post).toHaveBeenCalledTimes(1);
        expect(api.post).toHaveBeenCalledWith(
            '/orders',
            orderMock
        );

        expect(result).toBe(null);
    });

    it('should return null when api data is null', async () => {
        const orderMock = {
            customer_name: 'João',
            type: 'delivery'
        };

        api.post.mockResolvedValue({
            data: null
        });

        const result = await createOrder(orderMock);

        expect(result).toBe(null);
    });

    it('should throw error when api request fails', async () => {
        const orderMock = {
            customer_name: 'João',
            type: 'delivery'
        };

        const error = new Error('Erro ao criar pedido');

        api.post.mockRejectedValue(error);

        await expect(
            createOrder(orderMock)
        ).rejects.toThrow('Erro ao criar pedido');
    });
});