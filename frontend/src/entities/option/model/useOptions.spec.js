import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from 'vitest';

import { useOptions } from './useOptions';
import { getOptions } from '../api/getOptions';

vi.mock('../api/getOptions', () => ({
    getOptions: vi.fn()
}));

describe('useOptions', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        const {
            options,
            loading,
            error
        } = useOptions();

        options.value = [];
        loading.value = false;
        error.value = null;
    });

    it('should initialize with default values', () => {
        const {
            options,
            loading,
            error
        } = useOptions();

        expect(options.value).toEqual([]);
        expect(loading.value).toBe(false);
        expect(error.value).toBe(null);
    });

    it('should fetch options successfully', async () => {
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

        getOptions.mockResolvedValue(optionsMock);

        const {
            options,
            loading,
            error,
            fetchOptions
        } = useOptions();

        const promise = fetchOptions();

        expect(loading.value).toBe(true);

        await promise;

        expect(getOptions).toHaveBeenCalledTimes(1);
        expect(options.value).toEqual(optionsMock);
        expect(error.value).toBe(null);
        expect(loading.value).toBe(false);
    });

    it('should set error when fetching options fails', async () => {
        getOptions.mockRejectedValue(
            new Error('Erro na API')
        );

        const {
            options,
            loading,
            error,
            fetchOptions
        } = useOptions();

        await fetchOptions();

        expect(error.value).toBe('Erro na API');
        expect(options.value).toEqual([]);
        expect(loading.value).toBe(false);
    });

    it('should use default error message when error has no message', async () => {
        getOptions.mockRejectedValue({});

        const {
            options,
            loading,
            error,
            fetchOptions
        } = useOptions();

        await fetchOptions();

        expect(error.value).toBe(
            'Erro ao carregar as opções'
        );

        expect(options.value).toEqual([]);
        expect(loading.value).toBe(false);
    });
});