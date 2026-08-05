import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useRestaurant } from './useRestaurant';
import { getRestaurant } from '../api/getRestaurant';

vi.mock('../api/getRestaurant', () => ({
    getRestaurant: vi.fn(),
}));

describe('useRestaurant', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        const { restaurant, loading, error } = useRestaurant();

        restaurant.value = null;
        loading.value = false;
        error.value = null;
    });

    it('should successfully search for the restaurant', async () => {
        const restaurantMock = {
            id: 1,
            name: 'Marcelo Lanches',
        };

        getRestaurant.mockResolvedValue(restaurantMock);

        const { restaurant, loading, error, fetchRestaurant } = useRestaurant();

        await fetchRestaurant();

        expect(getRestaurant).toHaveBeenCalledTimes(1);
        expect(restaurant.value).toEqual(restaurantMock);
        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('should handle API erros', async () => {
        getRestaurant.mockRejectedValue(new Error('Erro na API'));

        const { restaurant, error, loading, fetchRestaurant } = useRestaurant();

        await fetchRestaurant();

        expect(restaurant.value).toBeNull();
        expect(error.value).toBe('Erro na API');
        expect(loading.value).toBe(false);
    });

    it('should use a default message when the error does not have a message', async () => {
        getRestaurant.mockRejectedValue({});

        const { error, fetchRestaurant } = useRestaurant();

        await fetchRestaurant();

        expect(error.value).toBe(
            'Erro ao carregar informações do restaurante'
        );
    });

    it('should manage the loading state during the request', async () => {
        let resolvePromise;

        getRestaurant.mockImplementation(
            () =>
                new Promise((resolve) => {
                    resolvePromise = resolve;
                })
        );

        const { loading, fetchRestaurant } = useRestaurant();

        const promise = fetchRestaurant();

        expect(loading.value).toBe(true);

        resolvePromise({
            id: 1,
            name: 'Marcelo Lanches',
        });

        await promise;

        expect(loading.value).toBe(false);
    });
});