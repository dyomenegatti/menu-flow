import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from 'vitest';

import api from '../../../shared/api';
import { getPaymentMethods } from './getPaymentMethod';

vi.mock('../../../shared/api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('getPaymentMethods', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return payment methods', async () => {
        const restaurantId = 1;

        const paymentMethodsMock = [
            {
                id: 1,
                name: 'Pix'
            },
            {
                id: 2,
                name: 'Dinheiro'
            },
            {
                id: 3,
                name: 'Cartão'
            }
        ];

        api.get.mockResolvedValue({
            data: paymentMethodsMock
        });

        const result = await getPaymentMethods(restaurantId);

        expect(api.get).toHaveBeenCalledTimes(1);

        expect(api.get).toHaveBeenCalledWith(
            '/payment-methods',
            {
                params: {
                    restaurant_id: restaurantId
                }
            }
        );

        expect(result).toEqual(paymentMethodsMock);
    });

    it('should send the correct restaurant id', async () => {
        const restaurantId = 25;

        api.get.mockResolvedValue({
            data: []
        });

        await getPaymentMethods(restaurantId);

        expect(api.get).toHaveBeenCalledWith(
            '/payment-methods',
            {
                params: {
                    restaurant_id: 25
                }
            }
        );
    });

    it('should return empty array when api returns empty data', async () => {
        const restaurantId = 1;

        api.get.mockResolvedValue({
            data: []
        });

        const result = await getPaymentMethods(restaurantId);

        expect(result).toEqual([]);
    });

    it('should throw error when api request fails', async () => {
        const restaurantId = 1;

        const error = new Error(
            'Erro ao buscar formas de pagamento'
        );

        api.get.mockRejectedValue(error);

        await expect(
            getPaymentMethods(restaurantId)
        ).rejects.toThrow(
            'Erro ao buscar formas de pagamento'
        );
    });
});