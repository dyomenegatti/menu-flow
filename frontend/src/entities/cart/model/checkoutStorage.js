const STORAGE_KEY = 'checkout-data';

export function saveCheckout(data) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

export function getCheckout() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data
        ? JSON.parse(data)
        : null;
}

export function clearCheckout() {
    localStorage.removeItem(STORAGE_KEY);
}