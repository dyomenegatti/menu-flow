import api from '../../../shared/api/index';

export async function addCartItem(payload) {
    const cartToken = localStorage.getItem('cart_token');

    const { data } = await api.post(
        '/cart/items',
        payload,
        {
            headers: {
                'X-Cart-Token': cartToken
            }
        }
    );

    return data;
}