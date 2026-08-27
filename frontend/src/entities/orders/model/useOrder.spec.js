import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from 'vitest';

import { useOrder } from './useOrder';
import { createOrder } from '../api/createOrder';

vi.mock('../api/createOrder', () => ({
    createOrder: vi.fn()
}));

describe('useOrder', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with default values', () => {
        const {
            orderSnapshot,
            loading,
            error
        } = useOrder();

        expect(orderSnapshot.value).toBe(null);
        expect(loading.value).toBe(false);
        expect(error.value).toBe(null);
    });

    it('should create an order snapshot', () => {
        const {
            orderSnapshot,
            createSnapshot
        } = useOrder();

        const order = {
            restaurant_id: 1,
            customer_name: 'Dyovana',
            items: [
                {
                    product_id: 10,
                    quantity: 2
                }
            ]
        };

        const result = createSnapshot(order);

        expect(result).toEqual(order);
        expect(orderSnapshot.value).toEqual(order);
    });

    it('should create a copy of the order data', () => {
        const {
            orderSnapshot,
            createSnapshot
        } = useOrder();

        const order = {
            customer_name: 'Dyovana',
            items: [
                {
                    product_id: 1,
                    quantity: 2
                }
            ]
        };

        const result = createSnapshot(order);

        expect(result).not.toBe(order);
        expect(result.items).not.toBe(order.items);
        expect(result.items[0]).not.toBe(order.items[0]);
    });

    it('should submit the order successfully', async () => {
        const order = {
            restaurant_id: 1,
            customer_name: 'Dyovana',
            items: []
        };

        const response = {
            id: 123,
            ...order
        };

        createOrder.mockResolvedValue(response);

        const {
            orderSnapshot,
            loading,
            error,
            createSnapshot,
            submitOrder
        } = useOrder();

        createSnapshot(order);

        const promise = submitOrder();

        expect(loading.value).toBe(true);

        const result = await promise;

        expect(createOrder).toHaveBeenCalledTimes(1);
        expect(createOrder).toHaveBeenCalledWith(
            orderSnapshot.value
        );

        expect(result).toEqual(response);
        expect(error.value).toBe(null);
        expect(loading.value).toBe(false);
    });

    it('should throw error when there is no order snapshot', async () => {
        const {
            submitOrder,
            loading,
            error
        } = useOrder();

        await expect(
            submitOrder()
        ).rejects.toThrow(
            'Nenhum pedido para enviar.'
        );

        expect(loading.value).toBe(false);
        expect(error.value).toBe(null);
        expect(createOrder).not.toHaveBeenCalled();
    });

    it('should set error when submit order fails', async () => {
        const order = {
            restaurant_id: 1,
            customer_name: 'Dyovana',
            items: []
        };

        const error = new Error('Erro ao criar pedido');

        createOrder.mockRejectedValue(error);

        const {
            createSnapshot,
            submitOrder,
            loading,
            error: errorState
        } = useOrder();

        createSnapshot(order);

        await expect(
            submitOrder()
        ).rejects.toThrow('Erro ao criar pedido');

        expect(errorState.value).toBe(error);
        expect(loading.value).toBe(false);
    });

    it('should clear the order snapshot', () => {
        const {
            orderSnapshot,
            createSnapshot,
            clearOrder
        } = useOrder();

        createSnapshot({
            customer_name: 'Dyovana',
            items: []
        });

        expect(orderSnapshot.value).not.toBe(null);

        clearOrder();

        expect(orderSnapshot.value).toBe(null);
    });
});