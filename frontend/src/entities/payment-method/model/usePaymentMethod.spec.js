import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from 'vitest';

import api from '../../../shared/api';
import { usePaymentMethod } from './usePaymentMethod';

vi.mock('../../../shared/api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('usePaymentMethod', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with default values', () => {
        const {
            paymentMethods,
            loading,
            error
        } = usePaymentMethod();

        expect(paymentMethods.value).toEqual([]);
        expect(loading.value).toBe(false);
        expect(error.value).toBe(null);
    });

    it('should fetch payment methods successfully', async () => {
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
            data: {
                data: paymentMethodsMock
            }
        });

        const {
            paymentMethods,
            loading,
            error,
            getPaymentMethods
        } = usePaymentMethod();

        const promise = getPaymentMethods(restaurantId);

        expect(loading.value).toBe(true);

        const result = await promise;

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
        expect(paymentMethods.value).toEqual(paymentMethodsMock);
        expect(error.value).toBe(null);
        expect(loading.value).toBe(false);
    });

    it('should set loading to false after request finishes', async () => {
        api.get.mockResolvedValue({
            data: {
                data: []
            }
        });

        const {
            loading,
            getPaymentMethods
        } = usePaymentMethod();

        const promise = getPaymentMethods(1);

        expect(loading.value).toBe(true);

        await promise;

        expect(loading.value).toBe(false);
    });

    it('should set error when api request fails', async () => {
        const error = new Error(
            'Erro ao buscar formas de pagamento'
        );

        api.get.mockRejectedValue(error);

        const {
            paymentMethods,
            loading,
            error: errorState,
            getPaymentMethods
        } = usePaymentMethod();

        await expect(
            getPaymentMethods(1)
        ).rejects.toThrow(
            'Erro ao buscar formas de pagamento'
        );

        expect(errorState.value).toBe(error);
        expect(loading.value).toBe(false);
        expect(paymentMethods.value).toEqual([]);
    });

    it('should send the correct restaurant id', async () => {
        const restaurantId = 10;

        api.get.mockResolvedValue({
            data: {
                data: []
            }
        });

        const {
            getPaymentMethods
        } = usePaymentMethod();

        await getPaymentMethods(restaurantId);

        expect(api.get).toHaveBeenCalledWith(
            '/payment-methods',
            {
                params: {
                    restaurant_id: 10
                }
            }
        );
    });
});