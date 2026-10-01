export function getOrderDateGroup(date) {
    const orderDate = new Date(date);
    const today = new Date();

    if (orderDate.toDateString() === today.toDateString()) {
        return "Hoje";
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (orderDate.toDateString() === yesterday.toDateString()) {
        return "Ontem";
    }

    return "Mais antigos";
}