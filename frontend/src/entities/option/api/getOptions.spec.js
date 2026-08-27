import { describe, it, expect, vi, beforeEach } from 'vitest';

import api from '../../../shared/api';
import { getOptions } from './getOptions';

vi.mock('../../../shared/api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('getOptions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return options when api returns data', async () => {
        const optionsMock = [
            {
                id: 1,
                name: 'Pequeno'
            },
            {
                id: 2,
                name: 'Grande'
            }
        ];

        api.get.mockResolvedValue({
            data: optionsMock
        });

        const result = await getOptions();

        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith('/options');
        expect(result).toEqual(optionsMock);
    });

    it('should return empty array when api returns no data', async () => {
        api.get.mockResolvedValue({});

        const result = await getOptions();

        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith('/options');
        expect(result).toEqual([]);
    });

    it('should return empty array when api data is null', async () => {
        api.get.mockResolvedValue({
            data: null
        });

        const result = await getOptions();

        expect(result).toEqual([]);
    });

    it('should throw error when api request fails', async () => {
        const error = new Error('Erro na API');

        api.get.mockRejectedValue(error);

        await expect(getOptions()).rejects.toThrow(
            'Erro na API'
        );
    });
});