import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useAddons } from './useAddons';
import { getAddons } from '../api/getAddons';

vi.mock('../api/getAddons', () => ({
    getAddons: vi.fn()
}));

describe('useAddons', () => {

    beforeEach(() => {
        vi.clearAllMocks();

        const {
            addons,
            loading,
            error
        } = useAddons();

        addons.value = [];
        loading.value = false;
        error.value = null;
    });
    
    it('should initialize with default values', () => {
        const {
            addons,
            loading,
            error
        } = useAddons();

        expect(addons.value).toEqual([]);
        expect(loading.value).toBe(false);
        expect(error.value).toBe(null);
    });

    it('should fetch addons successfully', async () => {
        const addonsMock = [
            {
                id: 1,
                name: 'Bacon'
            },
            {
                id: 2,
                name: 'Queijo'
            }
        ];

        getAddons.mockResolvedValue(addonsMock);
    
        const {
            addons,
            loading,
            error,
            fetchAddons
        } = useAddons();
    
        const promise = fetchAddons();
    
        expect(loading.value).toBe(true);
    
        await promise;
    
        expect(getAddons).toHaveBeenCalled();
        expect(addons.value).toEqual(addonsMock);
        expect(error.value).toBe(null);
        expect(loading.value).toBe(false);
    });

    it('should set error when fetching addons fails', async () => {
        getAddons.mockRejectedValue(
            new Error('Erro na API')
        );

        const {
            addons,
            loading,
            error,
            fetchAddons
        } = useAddons();

        await fetchAddons();

        expect(error.value).toBe('Erro na API');
        expect(addons.value).toEqual([]);
        expect(loading.value).toBe(false);
    });
});