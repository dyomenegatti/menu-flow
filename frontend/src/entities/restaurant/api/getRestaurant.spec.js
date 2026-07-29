import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../../shared/api';
import { getRestaurant } from './getRestaurant';

vi.mock('../../../shared/api', () => ({
    default: {
        get: vi.fn(),
    },
}));

describe('getRestaurant', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call the /restaurant endpoint', async () => {
        const mockResponse = {
            data: {
                id: 1,
                name: 'Marcelo Lanches',
            },
        };

        api.get.mockResolvedValue(mockResponse);

        const result = await getRestaurant();

        expect(api.get).toHaveBeenCalledWith('/restaurant');
        expect(result).toEqual(mockResponse.data);
    });

    it('should return null when there is no date', async () => {
        api.get.mockResolvedValue({});

        const result = await getRestaurant();

        expect(result).toBeNull();
    });
});