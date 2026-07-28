import { ref } from "vue";

import { createCart } from "../api/createCart";
import { getCart } from "../api/getCart";
import { addCartItem } from "../api/addCartItem";
import { deleteCartItem } from "../api/deleteCartItem";
import { updateCartItem } from "../api/updateCartItem";
import { toast } from "vue3-toastify";

const cart = ref(null);
const items = ref([]);
const total = ref(0);
const isCartOpen = ref(false);

const loading = ref(false);
const error = ref(null);

export function useCart() {

    async function createNewCart() {
        loading.value = true;
        error.value = null;

        try {
            const data = await createCart();

            cart.value = data;

            localStorage.setItem('cartToken', data.token);
            localStorage.setItem('cartId', data.id);

            return data;
        } catch(err) {
            error.value = err?.message || 'Erro ao criar carrinho.';
        } finally {
            loading.value = false;
        }
    }
    
    async function fetchCart() {
        loading.value = true;
        error.value = null;

        try {
            const data = await getCart();

            items.value = data.items ?? [];
            total.value = data.total ?? 0;

            return data;
        } catch(err) {
            error.value = err?.message || 'Erro ao carregar carrinho.';

            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function addItem(data) {
        loading.value = true;
        error.value = null;

        try {
            await addCartItem(data);

            await fetchCart();
            
            toast.success('Produto adicionado ao carrinho.');
        } catch (err) {
            error.value = err?.message || 'Erro ao adicionar item.';

            toast.error(error.value);
        } finally {
            loading.value = false;
        }
    }

    async function initializeCart() {
        const token = localStorage.getItem('cartToken');

        if (token) {
            try {
                await fetchCart();
            } catch (err) {
                localStorage.removeItem('cartToken');
                localStorage.removeItem('cartId');

                await createNewCart();
            }
        } else {
            await createNewCart();
        }
    }

    function openCart() {
        isCartOpen.value = true;
        fetchCart();
    }

    function closeCart() {
        isCartOpen.value = false;
    }

    async function updateItem(data) {
        loading.value = true;
        error.value = null;

        try {
            await updateCartItem(data.id, data);

            await fetchCart();

            toast.success('Produto atualizado com sucesso.');
        } catch(err) {
            error.value = err?.message || 'Erro ao atualizar item do carrinho.'

            toast.error(error.value);
        } finally {
            loading.value = false;
        }
    }

    async function deleteItem(id) {
        await deleteCartItem(id);
    }

    async function removeItemCart(id) {
        loading.value = true;
        error.value = null;

        try {
            await deleteCartItem(id);

            await fetchCart();

            toast.success('Produto removido com sucesso.');
        } catch(err) {
            error.value = err?.message || 'Erro ao deletar item do carrinho.';
            
            toast.error(error.value);
        } finally {
            loading.value = false;
        }
    }

    async function clearCart() {
        loading.value = true;

        try {
            await Promise.all(
                items.value.map(item => deleteItem(item.id))
            );

            await fetchCart();

            toast.success('Carrinho limpo.');
        } catch(err) {
            error.value = err?.message || 'Erro ao limpar carrinho.';
            
            toast.error(error.value);
        } finally {
            loading.value = false;
        }
    }

    return {
        cart,
        items,
        total,
        isCartOpen,
        loading,
        error,

        createNewCart,
        fetchCart,
        addItem,
        updateItem,
        initializeCart,
        openCart,
        closeCart,
        deleteItem,
        removeItemCart,
        clearCart
    };
}