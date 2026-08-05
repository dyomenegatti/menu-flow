import { describe, it, expect, vi, beforeEach } from "vitest";

import { useCart } from "./useCart";

import { createCart } from "../api/createCart";
import { getCart } from "../api/getCart";
import { addCartItem } from "../api/addCartItem";
import { toast } from "vue3-toastify";
import { updateCartItem } from "../api/updateCartItem";
import { deleteCartItem } from "../api/deleteCartItem";

vi.mock('../api/createCart', () => ({
    createCart: vi.fn()
}));

vi.mock('../api/getCart', () => ({
    getCart: vi.fn()
}));

vi.mock('../api/addCartItem', () => ({
    addCartItem: vi.fn()
}));

vi.mock('../api/deleteCartItem', () => ({
    deleteCartItem: vi.fn()
}));

vi.mock('../api/updateCartItem', () => ({
    updateCartItem: vi.fn()
}));

vi.mock('vue3-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

describe('useCart', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();

        const {
            cart,
            items,
            total,
            loading,
            error,
            isCartOpen,
        } = useCart();

        cart.value = null;
        items.value = [];
        total.value = 0;
        loading.value = false;
        error.value = null;
        isCartOpen.value = false;
    });

    //createNewCart
    it('should create a new cart successfully', async () => {
        const cartMock = {
            id: 1,
            token: 'abc123'
        };

        createCart.mockResolvedValue(cartMock);

        const {
            cart,
            loading,
            error,
            createNewCart,
        } = useCart();

        const result = await createNewCart();

        expect(createCart).toHaveBeenCalledTimes(1);
        expect(result).toEqual(cartMock);
        expect(cart.value).toEqual(cartMock);
        expect(localStorage.getItem('cartId')).toBe('1');
        expect(localStorage.getItem('cartToken')).toBe('abc123');
        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('should set error when createCart fails', async () => {
        createCart.mockRejectedValue(new Error('create cart failed'));

        const {
            cart,
            error,
            loading,
            createNewCart
        } = useCart();

        const result = await createNewCart();

        expect(result).toBeUndefined();
        expect(cart.value).toBeNull();
        expect(error.value).toBe('create cart failed');
        expect(localStorage.getItem('cartId')).toBeNull();
        expect(localStorage.getItem('cartToken')).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('should set loading state correctly while creating a cart', async () => {
        let resolvePromise;

        createCart.mockImplementation(() => 
            new Promise(resolve => {
                resolvePromise = resolve;
            })
        );

        const { loading, createNewCart } = useCart();

        const promise = createNewCart();

        expect(loading.value).toBe(true);

        resolvePromise({
            id: 1,
            token: 'abc123'
        });

        await promise;

        expect(loading.value).toBe(false);
    });

    //fetchCart
    it('should fetch cart successfully', async () => {
        const cartResponse = {
            items: [
                {
                    id: 1,
                    name: 'Pizza', 
                    quantity: 2
                }
            ],
            total: 89.9
        };

        getCart.mockResolvedValue(cartResponse);

        const {
            items,
            total,
            loading,
            error,
            fetchCart
        } = useCart();

        const result = await fetchCart();

        expect(getCart).toHaveBeenCalledTimes(1);
        expect(result).toEqual(cartResponse);
        expect(items.value).toEqual(cartResponse.items);
        expect(total.value).toBe(cartResponse.total);
        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('should throw an error when fetch cart fails', async () => {
        const apiError = new Error('Failed to fetch cart');

        getCart.mockRejectedValue(apiError);

        const { error, loading, fetchCart } = useCart();

        await expect(fetchCart()).rejects.toThrow('Failed to fetch cart');

        expect(error.value).toBe('Failed to fetch cart');
        expect(loading.value).toBe(false);
    });

    it('should set loading state correctly while fetching cart', async () => {
        let resolvePromise;

        getCart.mockImplementation(
            () =>
                new Promise(resolve => {
                    resolvePromise = resolve;
                })
        );

        const { loading, fetchCart } = useCart();

        const promise = fetchCart();

        expect(loading.value).toBe(true);

        resolvePromise({
            items: [],
            total: 0,
        });

        await promise;

        expect(loading.value).toBe(false);
    });

    //addItem
    it('should add an item successfully', async () => {
        const payload = {
            product_id: 1,
            quantity: 2,
        };

        addCartItem.mockResolvedValue();

        getCart.mockResolvedValue({
            items: [
                {
                    id: 1,
                    product_id: 1,
                    quantity: 2,
                },
            ],
            total: 50,
        });

        const {
            items,
            total,
            error,
            loading,
            addItem,
        } = useCart();

        await addItem(payload);

        expect(addCartItem).toHaveBeenCalledTimes(1);
        expect(addCartItem).toHaveBeenCalledWith(payload);

        expect(getCart).toHaveBeenCalledTimes(1);

        expect(items.value).toEqual([
            {
                id: 1,
                product_id: 1,
                quantity: 2,
            },
        ]);

        expect(total.value).toBe(50);

        expect(toast.success).toHaveBeenCalledWith(
            'Produto adicionado ao carrinho.'
        );

        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('should set error when add item fails', async () => {
        const payload = {
            product_id: 1,
            quantity: 2
        };

        addCartItem.mockRejectedValue(new Error('Failed to add item'));

        const {
            error,
            loading,
            addItem
        } = useCart();

        await addItem(payload);

        expect(addCartItem).toHaveBeenCalledWith(payload);
        expect(getCart).not.toHaveBeenCalled();
        expect(error.value).toBe('Failed to add item');
        expect(toast.error).toHaveBeenCalledWith('Failed to add item');
        expect(loading.value).toBe(false);
    });

    it('should set loading state correctly while adding an item', async () => {
        let resolvePromise;

        addCartItem.mockImplementation(
            () =>
                new Promise(resolve => {
                    resolvePromise = resolve;
                })
        );

        const { loading, addItem } = useCart();

        const promise = addItem({
            product_id: 1,
            quantity: 2
        });

        expect(loading.value).toBe(true);

        resolvePromise();

        getCart.mockResolvedValue({
            items: [],
            total: 0
        });

        await promise;

        expect(loading.value).toBe(false);
    });

    //initializeCart
    it('should fetch cart when cart token exists', async () => {
        localStorage.setItem('cartToken', 'token-123');

        getCart.mockResolvedValue({
            items: [],
            total: 0
        });

        const { initializeCart } = useCart();

        await initializeCart();

        expect(getCart).toHaveBeenCalledTimes(1);
        expect(createCart).not.toHaveBeenCalled();
    });

    it('should create a new cart when fetch cart fails', async () => {
        localStorage.setItem('cartToken', 'token-123');
        localStorage.setItem('cartId', '1');

        getCart.mockRejectedValue(new Error('Cart not found'));

        createCart.mockResolvedValue({
            id: 2,
            token: 'new-token'
        });

        const { initializeCart } = useCart();

        await initializeCart();

        expect(getCart).toHaveBeenCalledTimes(1);
        expect(createCart).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem('cartId')).toBe('2');
        expect(localStorage.getItem('cartToken')).toBe('new-token');
    });

    it('should create a new cart when cart token does not exist', async () => {
        createCart.mockResolvedValue({
            id: 1, 
            token: 'token-123'
        });
        
        const { initializeCart } = useCart();

        await initializeCart();

        expect(createCart).toHaveBeenCalledTimes(1);
        expect(getCart).not.toHaveBeenCalled();
        expect(localStorage.getItem('cartId')).toBe('1');
        expect(localStorage.getItem('cartToken')).toBe('token-123');
    });

    //openCart / closeCart
    it('should open the cart', async () => {
        getCart.mockResolvedValue({
            items: [],
            total: 0
        });

        const {
            isCartOpen,
            openCart
        } = useCart();

        expect(isCartOpen.value).toBe(false);

        openCart();

        expect(isCartOpen.value).toBe(true);

        await Promise.resolve();

        expect(getCart).toHaveBeenCalledTimes(1);
    });

    it('should close the cart', () => {
        const {
            isCartOpen,
            openCart,
            closeCart
        } = useCart();

        isCartOpen.value = true;

        closeCart();

        expect(isCartOpen.value).toBe(false);
    });

    //updateItem
    it('should update an item successfully', async () => {
        const payload = {
            id: 1,
            quantity: 3,
        };

        updateCartItem.mockResolvedValue();

        getCart.mockResolvedValue({
            items: [
                {
                    id: 1,
                    quantity: 3,
                },
            ],
            total: 75,
        });

        const {
            items,
            total,
            error,
            loading,
            updateItem,
        } = useCart();

        await updateItem(payload);

        expect(updateCartItem).toHaveBeenCalledTimes(1);
        expect(updateCartItem).toHaveBeenCalledWith(1, payload);

        expect(getCart).toHaveBeenCalledTimes(1);

        expect(items.value).toEqual([
            {
                id: 1,
                quantity: 3,
            },
        ]);

        expect(total.value).toBe(75);

        expect(toast.success).toHaveBeenCalledWith(
            'Produto atualizado com sucesso.'
        );

        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('should set error when update item fails', async () => {
        const payload = {
            id: 1,
            quantity: 3,
        };

        updateCartItem.mockRejectedValue(
            new Error('Failed to update item')
        );

        const {
            error,
            loading,
            updateItem,
        } = useCart();

        await updateItem(payload);

        expect(updateCartItem).toHaveBeenCalledWith(1, payload);
        expect(getCart).not.toHaveBeenCalled();

        expect(error.value).toBe('Failed to update item');

        expect(toast.error).toHaveBeenCalledWith(
            'Failed to update item'
        );

        expect(loading.value).toBe(false);
    });

    it('should set loading state correctly while updating an item', async () => {
        let resolvePromise;

        updateCartItem.mockImplementation(
            () =>
                new Promise(resolve => {
                    resolvePromise = resolve;
                })
        );

        getCart.mockResolvedValue({
            items: [],
            total: 0,
        });

        const { loading, updateItem } = useCart();

        const promise = updateItem({
            id: 1,
            quantity: 3,
        });

        expect(loading.value).toBe(true);

        resolvePromise();

        await promise;

        expect(loading.value).toBe(false);
    });

    //deleteItem
    it('should delete an item successfully', async () => {
        deleteCartItem.mockResolvedValue();

        const { deleteItem } = useCart();

        await deleteItem(1);

        expect(deleteCartItem).toHaveBeenCalledTimes(1);
        expect(deleteCartItem).toHaveBeenCalledWith(1);
    });

    //removeItemCart
    it('should remove an item successfully', async () => {
        deleteCartItem.mockResolvedValue();

        getCart.mockResolvedValue({
            items: [],
            total: 0,
        });

        const {
            items,
            total,
            error,
            loading,
            removeItemCart,
        } = useCart();

        await removeItemCart(1);

        expect(deleteCartItem).toHaveBeenCalledTimes(1);
        expect(deleteCartItem).toHaveBeenCalledWith(1);

        expect(getCart).toHaveBeenCalledTimes(1);

        expect(items.value).toEqual([]);
        expect(total.value).toBe(0);

        expect(toast.success).toHaveBeenCalledWith(
            'Produto removido com sucesso.'
        );

        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('should set error when remove item fails', async () => {
        deleteCartItem.mockRejectedValue(
            new Error('Failed to remove item')
        );

        const {
            error,
            loading,
            removeItemCart,
        } = useCart();

        await removeItemCart(1);

        expect(deleteCartItem).toHaveBeenCalledWith(1);
        expect(getCart).not.toHaveBeenCalled();

        expect(error.value).toBe('Failed to remove item');

        expect(toast.error).toHaveBeenCalledWith(
            'Failed to remove item'
        );

        expect(loading.value).toBe(false);
    });

    it('should set loading state correctly while removing an item', async () => {
        let resolvePromise;

        deleteCartItem.mockImplementation(
            () =>
                new Promise(resolve => {
                    resolvePromise = resolve;
                })
        );

        getCart.mockResolvedValue({
            items: [],
            total: 0,
        });

        const { loading, removeItemCart } = useCart();

        const promise = removeItemCart(1);

        expect(loading.value).toBe(true);

        resolvePromise();

        await promise;

        expect(loading.value).toBe(false);
    });

    //clearCart
    it('should clear the cart successfully', async () => {
        const {
            items,
            total,
            error,
            loading,
            clearCart,
        } = useCart();

        items.value = [
            { id: 1 },
            { id: 2 },
        ];

        deleteCartItem.mockResolvedValue();

        getCart.mockResolvedValue({
            items: [],
            total: 0,
        });

        await clearCart();

        expect(deleteCartItem).toHaveBeenCalledTimes(2);
        expect(deleteCartItem).toHaveBeenNthCalledWith(1, 1);
        expect(deleteCartItem).toHaveBeenNthCalledWith(2, 2);

        expect(getCart).toHaveBeenCalledTimes(1);

        expect(items.value).toEqual([]);
        expect(total.value).toBe(0);

        expect(toast.success).toHaveBeenCalledWith('Carrinho limpo.');

        expect(error.value).toBeNull();
        expect(loading.value).toBe(false);
    });

    it('should set error when clear cart fails', async () => {
        const { items, error, loading, clearCart } = useCart();

        items.value = [
            { id: 1 },
        ];

        deleteCartItem.mockRejectedValue(
            new Error('Failed to clear cart')
        );

        await clearCart();

        expect(deleteCartItem).toHaveBeenCalledWith(1);
        expect(getCart).not.toHaveBeenCalled();

        expect(error.value).toBe('Failed to clear cart');

        expect(toast.error).toHaveBeenCalledWith(
            'Failed to clear cart'
        );

        expect(loading.value).toBe(false);
    });

    it('should set loading state correctly while clearing the cart', async () => {
        const { items, loading, clearCart } = useCart();

        items.value = [
            { id: 1 },
        ];

        let resolvePromise;

        deleteCartItem.mockImplementation(
            () =>
                new Promise(resolve => {
                    resolvePromise = resolve;
                })
        );

        getCart.mockResolvedValue({
            items: [],
            total: 0,
        });

        const promise = clearCart();

        expect(loading.value).toBe(true);

        resolvePromise();

        await promise;

        expect(loading.value).toBe(false);
    });
});