import { ref } from "vue";
import { createOrder } from "../api/createOrder";

function cloneOrder(source) {
    return JSON.parse(JSON.stringify(source));
}

function toId(value) {
    return typeof value === 'object' && value !== null ? value.id : value;
}

function normalizeItems(items = []) {
    return items.map(item => ({
        product_id: item.product_id ?? item.product?.id ?? item.id,
        quantity: item.quantity,
        addons: (item.addons || []).map(toId),
        options: (item.options || []).map(toId),
        observation: item.observation || null
    }));
}

function buildPayload(order) {
    return {
        ...order,
        items: normalizeItems(order.items)
    };
}

export function useOrder() {
    const orderSnapshot = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const isOrderOpen = ref(false);
    const selectedOrder = ref(null);

    function createSnapshot(checkout) {
        const { deliveryType, delivery, pickup, ...rest } = cloneOrder(checkout);

        const form = checkout[deliveryType];
        const isDelivery = deliveryType === 'delivery';

        const order = {
            ...rest,

            type: deliveryType,
            customer_name: form.name,
            customer_phone: form.phone,

            address: isDelivery ? form.street : null,
            number: isDelivery ? form.number : null,
            neighborhood: isDelivery ? form.neighborhood : null,
            complement: isDelivery ? form.reference : null,

            observation: form.observation || null
        };

        orderSnapshot.value = order;

        return order;
    }

    function createSnapshotFromOrder(previous) {
        orderSnapshot.value = cloneOrder(previous);

        return orderSnapshot.value;
    }

    function getClientId() {
        let clientId = localStorage.getItem('clientId');

        if (!clientId) {
            clientId = crypto.randomUUID();
            localStorage.setItem('clientId', clientId);
        }

        return clientId;
    }

    function getOrders() {
        return JSON.parse(localStorage.getItem('orders') || '[]');
    }

    function saveOrder(order) {
        const orders = getOrders();
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    function getOrderById(id) {
        return getOrders().find(
            order => String(order.data.id) === String(id)
        )?.data;
    }

    function openOrder(order) {
        selectedOrder.value = order;
        isOrderOpen.value = true;
    }

    function closeOrder() {
        selectedOrder.value = null;
        isOrderOpen.value = false;
    }

    async function submitOrder() {
        if (!orderSnapshot.value) {
            throw new Error('Nenhum pedido para enviar.');
        }

        loading.value = true;
        error.value = null;

        try {
            const order = await createOrder(buildPayload(orderSnapshot.value));

            saveOrder(order);

            return order;
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function reorder(id) {
        const previousOrder = getOrderById(id);

        if (!previousOrder) {
            throw new Error('Pedido não encontrado!');
        }

        createSnapshotFromOrder(previousOrder);

        return await submitOrder();
    }

    function clearOrder() {
        orderSnapshot.value = null;
    }

    return {
        orderSnapshot,
        loading,
        error,
        createSnapshot,
        createSnapshotFromOrder,
        submitOrder,
        getOrders,
        selectedOrder,
        isOrderOpen,
        openOrder,
        closeOrder,
        getOrderById,
        reorder,
        clearOrder
    };
}