import { describe, it, expect, vi, beforeEach } from 'vitest';

import api from '../../../shared/api';
import { getAddons } from './getAddons';

vi.mock('../../../shared/api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('getAddons', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return addons when api returns data', async () => {
        const addonsMock = [
            {
                id: 1,
                name: 'Ovo'
            },
            {
                id: 2,
                name: 'Bacon'
            }
        ];

        api.get.mockResolvedValue({
            data: addonsMock
        });

        const result = await getAddons();

        expect(api.get).toHaveBeenCalledWith('/addons');
        expect(result).toEqual(addonsMock);
    });

    it('should return empty array when api returns no data', async() => {
        api.get.mockResolvedValue({});

        const result = await getAddons();

        expect(api.get).toHaveBeenCalledWith('/addons');
        expect(result).toEqual([]);
    });
});