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

        const cartStore = useCart();

        cartStore.cart.value = null;
        cartStore.items.value = [];
        cartStore.total.value = 0;
        cartStore.loading.value = false;
        cartStore.error.value = null;
        cartStore.isCartOpen.value = false;
    });

    it('should create a new cart', async () => {
        const response = {
            id: 10,
            token: 'cart-token'
        };

        createCart.mockResolvedValue(response);

        const {
            createNewCart,
            cart,
            loading,
            error
        } = useCart();

        const promise = createNewCart();

        expect(loading.value).toBe(true);

        const result = await promise;

        expect(createCart).toHaveBeenCalledWith();
        expect(result).toEqual(response);
        expect(cart.value).toEqual(response);
        expect(localStorage.getItem('cartToken'))
            .toBe('cart-token');
        expect(localStorage.getItem('cartId'))
            .toBe('10');
        expect(error.value).toBe(null);
        expect(loading.value).toBe(false);
    });

    it('should set error when create cart fails', async () => {

        createCart.mockRejectedValue(
            new Error('Erro ao criar carrinho')
        );

        const {
            createNewCart,
            loading,
            error
        } = useCart();

        await createNewCart();

        expect(error.value)
            .toBe('Erro ao criar carrinho');

        expect(loading.value)
            .toBe(false);

    });

    it('should fetch cart successfully', async () => {

        const response = {
            items: [
                {
                    id: 1,
                    quantity: 2
                }
            ],
            total: 35.9
        };

        getCart.mockResolvedValue(response);

        const {
            fetchCart,
            items,
            total,
            loading,
            error
        } = useCart();

        const promise = fetchCart();

        expect(loading.value).toBe(true);

        const result = await promise;

        expect(getCart).toHaveBeenCalled();
        expect(result).toEqual(response);
        expect(items.value).toEqual(response.items);
        expect(total.value).toBe(35.9);
        expect(error.value).toBe(null);
        expect(loading.value).toBe(false);

    });

    it('should set empty items and zero total when response is empty', async () => {

        getCart.mockResolvedValue({});

        const {
            fetchCart,
            items,
            total
        } = useCart();

        await fetchCart();

        expect(items.value).toEqual([]);
        expect(total.value).toBe(0);

    });

    it('should throw error when fetch cart fails', async () => {

        getCart.mockRejectedValue(
            new Error('Erro ao buscar carrinho')
        );

        const {
            fetchCart,
            loading,
            error
        } = useCart();

        await expect(
            fetchCart()
        ).rejects.toThrow('Erro ao buscar carrinho');

        expect(error.value)
            .toBe('Erro ao buscar carrinho');
        expect(loading.value)
            .toBe(false);
    });

    it('should add item and refresh cart', async () => {

        const payload = {
            productId: 1,
            quantity: 2
        };

        addCartItem.mockResolvedValue({});

        getCart.mockResolvedValue({
            items: [
                {
                    id: 1,
                    quantity: 2
                }
            ],
            total: 50
        });

        const {
            addItem,
            items,
            total,
            loading,
            error
        } = useCart();

        await addItem(payload);

        expect(addCartItem).toHaveBeenCalledWith(payload);

        expect(getCart).toHaveBeenCalled();

        expect(items.value).toEqual([
            {
                id: 1,
                quantity: 2
            }
        ]);

        expect(total.value).toBe(50);

        expect(toast.success).toHaveBeenCalledWith(
            'Produto adicionado ao carrinho.'
        );

        expect(error.value).toBe(null);

        expect(loading.value).toBe(false);

    });

    it('should show error when add item fails', async () => {

        addCartItem.mockRejectedValue(
            new Error('Erro ao adicionar')
        );

        const {
            addItem,
            loading,
            error
        } = useCart();

        await addItem({
            productId: 1
        });

        expect(error.value)
            .toBe('Erro ao adicionar');

        expect(toast.error)
            .toHaveBeenCalledWith('Erro ao adicionar');

        expect(loading.value)
            .toBe(false);

    });

    it('should fetch cart when token exists', async () => {

        localStorage.setItem(
            'cartToken',
            'token'
        );

        getCart.mockResolvedValue({
            items: [],
            total: 0
        });

        const {
            initializeCart
        } = useCart();

        await initializeCart();

        expect(getCart)
            .toHaveBeenCalled();

        expect(createCart)
            .not.toHaveBeenCalled();

    });

    it('should create new cart when fetch cart fails', async () => {

        localStorage.setItem(
            'cartToken',
            'token'
        );

        getCart.mockRejectedValue(
            new Error()
        );

        createCart.mockResolvedValue({
            id: 1,
            token: 'novo-token'
        });

        const {
            initializeCart
        } = useCart();

        await initializeCart();

        expect(createCart)
            .toHaveBeenCalled();

        expect(localStorage.getItem('cartToken'))
            .toBe('novo-token');

    });

    it('should create cart when token does not exist', async () => {

        createCart.mockResolvedValue({
            id: 1,
            token: 'novo-token'
        });

        const {
            initializeCart
        } = useCart();

        await initializeCart();

        expect(createCart)
            .toHaveBeenCalled();

    });

    it('should open cart and fetch items', async () => {

        getCart.mockResolvedValue({
            items: [],
            total: 0
        });

        const {
            openCart,
            isCartOpen
        } = useCart();

        openCart();

        expect(isCartOpen.value)
            .toBe(true);

        await Promise.resolve();

        expect(getCart)
            .toHaveBeenCalled();

    });

    it('should close cart', () => {

        const {
            openCart,
            closeCart,
            isCartOpen
        } = useCart();

        openCart();

        closeCart();

        expect(isCartOpen.value)
            .toBe(false);

    });

    it('should update cart item', async () => {

        updateCartItem.mockResolvedValue({});

        getCart.mockResolvedValue({
            items: [
                {
                    id: 1,
                    quantity: 3
                }
            ],
            total: 90
        });

        const {
            updateItem,
            items,
            total,
            loading,
            error
        } = useCart();

        await updateItem({
            id: 1,
            quantity: 3
        });

        expect(updateCartItem).toHaveBeenCalledWith(
            1,
            {
                id: 1,
                quantity: 3
            }
        );

        expect(getCart).toHaveBeenCalled();

        expect(items.value).toEqual([
            {
                id: 1,
                quantity: 3
            }
        ]);

        expect(total.value).toBe(90);

        expect(toast.success).toHaveBeenCalledWith(
            'Produto atualizado com sucesso.'
        );

        expect(error.value).toBe(null);

        expect(loading.value).toBe(false);

    });

    it('should show error when update item fails', async () => {

        updateCartItem.mockRejectedValue(
            new Error('Erro ao atualizar')
        );

        const {
            updateItem,
            loading,
            error
        } = useCart();

        await updateItem({
            id: 1,
            quantity: 3
        });

        expect(error.value)
            .toBe('Erro ao atualizar');

        expect(toast.error)
            .toHaveBeenCalledWith('Erro ao atualizar');

        expect(loading.value)
            .toBe(false);

    });

    it('should delete item', async () => {

        deleteCartItem.mockResolvedValue({});

        const {
            deleteItem
        } = useCart();

        await deleteItem(10);

        expect(deleteCartItem)
            .toHaveBeenCalledWith(10);

    });

    it('should remove item from cart', async () => {

        deleteCartItem.mockResolvedValue({});

        getCart.mockResolvedValue({
            items: [],
            total: 0
        });

        const {
            removeItemCart,
            items,
            total,
            loading,
            error
        } = useCart();

        await removeItemCart(5);

        expect(deleteCartItem)
            .toHaveBeenCalledWith(5);

        expect(getCart)
            .toHaveBeenCalled();

        expect(items.value)
            .toEqual([]);

        expect(total.value)
            .toBe(0);

        expect(toast.success)
            .toHaveBeenCalledWith('Produto removido com sucesso.');

        expect(error.value)
            .toBe(null);

        expect(loading.value)
            .toBe(false);

    });

    it('should show error when remove item fails', async () => {

        deleteCartItem.mockRejectedValue(
            new Error('Erro ao remover')
        );

        const {
            removeItemCart,
            loading,
            error
        } = useCart();

        await removeItemCart(5);

        expect(error.value)
            .toBe('Erro ao remover');

        expect(toast.error)
            .toHaveBeenCalledWith('Erro ao remover');

        expect(loading.value)
            .toBe(false);

    });

    it('should clear cart', async () => {

        deleteCartItem.mockResolvedValue({});

        getCart.mockResolvedValue({
            items: [],
            total: 0
        });

        const cartStore = useCart();

        cartStore.items.value = [
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ];

        await cartStore.clearCart();

        expect(deleteCartItem)
            .toHaveBeenCalledTimes(3);

        expect(deleteCartItem)
            .toHaveBeenNthCalledWith(1, 1);

        expect(deleteCartItem)
            .toHaveBeenNthCalledWith(2, 2);

        expect(deleteCartItem)
            .toHaveBeenNthCalledWith(3, 3);

        expect(getCart)
            .toHaveBeenCalled();

        expect(toast.success)
            .toHaveBeenCalledWith('Carrinho limpo.');

    });

    it('should show error when clear cart fails', async () => {

        deleteCartItem.mockRejectedValue(
            new Error('Erro ao limpar')
        );

        const cartStore = useCart();

        cartStore.items.value = [
            {
                id: 1
            }
        ];

        await cartStore.clearCart();

        expect(cartStore.error.value)
            .toBe('Erro ao limpar');

        expect(toast.error)
            .toHaveBeenCalledWith('Erro ao limpar');

        expect(cartStore.loading.value)
            .toBe(false);

    });
});