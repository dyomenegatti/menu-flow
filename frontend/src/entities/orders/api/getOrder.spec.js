import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from 'vitest';

import api from '../../../shared/api/index';
import { getOrder } from './getOrder';

vi.mock('../../../shared/api/index', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('getOrder', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return order data when api returns data', async () => {
        const ordersMock = [
            {
                id: 1,
                customer_name: 'João',
                type: 'delivery',
                total: 50
            },
            {
                id: 2,
                customer_name: 'Maria',
                type: 'pickup',
                total: 30
            }
        ];

        api.get.mockResolvedValue({
            data: ordersMock
        });

        const result = await getOrder();

        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith('/orders');

        expect(result).toEqual(ordersMock);
    });

    it('should return null when api returns no data', async () => {
        api.get.mockResolvedValue({});

        const result = await getOrder();

        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith('/orders');

        expect(result).toBe(null);
    });

    it('should return null when api data is null', async () => {
        api.get.mockResolvedValue({
            data: null
        });

        const result = await getOrder();

        expect(result).toBe(null);
    });

    it('should throw error when api request fails', async () => {
        const error = new Error('Erro ao buscar pedidos');

        api.get.mockRejectedValue(error);

        await expect(
            getOrder()
        ).rejects.toThrow('Erro ao buscar pedidos');
    });
});