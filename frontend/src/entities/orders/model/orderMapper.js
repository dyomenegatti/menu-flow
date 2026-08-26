export function createOrderSnapshot({
    restaurantId,
    checkout,
    payment,
    items
}) {
    return {
        restaurant_id: restaurantId,

        type: checkout.type,

        customer_name: checkout.customerName,
        customer_phone: checkout.customerPhone,

        address: checkout.address,
        number: checkout.number,
        neighborhood: checkout.neighborhood,
        complement: checkout.complement,

        payment_method_id: payment.paymentMethodId,
        change: payment.change,

        observation: checkout.observation,

        items: items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            addons: item.addons?.map(addon => addon.id) ?? [],
            options: item.options?.map(option => option.id) ?? [],
            observation: item.observation ?? ''
        }))
    };
}