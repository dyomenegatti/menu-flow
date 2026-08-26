export function buildOrderWhatsAppMessage(order, restaurant) {
    const lines = [
        'Boa noite! Gostaria de fazer um pedido. 😊',
        '',
        '👤 Dados do cliente',
        `Me chamo: ${order.customer_name}`,
        `Telefone para contato: ${formatPhone(order.customer_phone)}`,
        ''
    ];

    if (order.type === 'delivery' && order.delivery) {
        lines.push(
            '🛵 Delivery',
            `Taxa de entrega: ${formatPrice(restaurant.delivery_fee)}`,
            '',
            '🏠 Endereço',
            `${order.delivery.street}, Nº ${order.delivery.number}`
        );

        if (order.delivery.reference) {
            lines.push(order.delivery.reference);
        }

        if (order.delivery.neighborhood) {
            lines.push(order.delivery.neighborhood);
        }
    }

    if (order.type === 'pickup') {
        lines.push(
            '🏪 Retirada no local',
            ''
        );
    }

    lines.push(
        '🛒 Itens do Pedido:',
        ''
    );

    order.items.forEach((item) => {
        const price = Number(item.product_price);
        const subtotal = price * item.quantity;

        lines.push(
            `➡️ ${item.name}`,
            `   Quantidade: ${item.quantity}`,
            `   Valor unitário: ${formatPrice(price)}`,
            `   Subtotal: ${formatPrice(subtotal)}`
        );

        if (item.observation) {
            lines.push(
                `   Observação: ${item.observation}`
            );
        }

        lines.push('');
    });

    lines.push(
        `💰 Total do pedido: ${formatPrice(order.total)}`,
        '',
        `💵 Forma de pagamento: ${order.payment_method}`
    );

    const observation =
        order.type === 'delivery'
            ? order.delivery?.observation
            : order.pickup?.observation;

    if (observation) {
        lines.push(
            '',
            '📝 Observação',
            observation
        );
    }

    lines.push(
        '',
        'Aguardo a confirmação do pedido. Obrigada(o)! 😊'
    );

    return lines.join('\n');
}

function formatPhone(phone) {
    const numbers = String(phone || '').replace(/\D/g, '');

    if (numbers.length === 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }

    if (numbers.length === 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }

    return phone;
}

function formatPrice(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(value) || 0);
}