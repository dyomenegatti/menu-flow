import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from 'vitest';

import api from '../../../shared/api/index';
import { getOrderById } from './getOrderById';

vi.mock('../../../shared/api/index', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('getOrderById', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return order when api returns data', async () => {
        const orderId = 1;

        const orderMock = {
            id: orderId,
            customer_name: 'João',
            type: 'delivery',
            total: 50
        };

        api.get.mockResolvedValue({
            data: orderMock
        });

        const result = await getOrderById(orderId);

        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(
            `/orders/${orderId}`
        );

        expect(result).toEqual(orderMock);
    });

    it('should return null when api returns no data', async () => {
        const orderId = 1;

        api.get.mockResolvedValue({});

        const result = await getOrderById(orderId);

        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(
            `/orders/${orderId}`
        );

        expect(result).toBe(null);
    });

    it('should return null when api data is null', async () => {
        const orderId = 1;

        api.get.mockResolvedValue({
            data: null
        });

        const result = await getOrderById(orderId);

        expect(api.get).toHaveBeenCalledWith(
            `/orders/${orderId}`
        );

        expect(result).toBe(null);
    });

    it('should throw error when api request fails', async () => {
        const orderId = 1;

        const error = new Error(
            'Erro ao buscar pedido'
        );

        api.get.mockRejectedValue(error);

        await expect(
            getOrderById(orderId)
        ).rejects.toThrow('Erro ao buscar pedido');
    });
});