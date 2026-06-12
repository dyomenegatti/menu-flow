import { getCart } from "../api/getCart";

export async function initializeCart() {
    try {
        const cart = await getCart();

        if (cart?.token) {
            localStorage.setItem(
                'cart_token',
                cart.token
            );
        }

        return cart;
    } catch (error) {
        console.error(error);

        return null;
    }
}