import api from '../../../shared/api/index';

export async function getCart() {
    const cartToken = localStorage.getItem('cart_token');

    const { data } = await api.get('/cart', {
        headers: {
            'X-Cart-Token': cartToken
        }
    });

    return data;
}