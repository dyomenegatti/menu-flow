const orderStatuses = {
    pending: {
        label: 'Pendente',
        color: 'warning',
    },

    preparing: {
        label: 'Em preparo',
        color: 'info',
    },

    out_for_delivery: {
        label: 'Saiu para entrega',
        color: 'primary',
    },

    delivered: {
        label: 'Entregue',
        color: 'success',
    },

    cancelled: {
        label: 'Cancelado',
        color: 'error',
    },
};

export function formatOrderStatus(status) {
    return orderStatuses[status] ?? {
        label: 'Status desconhecido',
        color: 'grey',
    };
}