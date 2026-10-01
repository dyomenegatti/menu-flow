export function formattedPhone(phone) {
    if (!phone) {
        return 'Não informado';
    }

    const value = String(phone).replace(/\D/g, '');

    if (value.length === 11) {
        return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }

    if (value.length === 10) {
        return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    }

    return phone;
}

export function formatPhoneInput(phone) {
    const value = String(phone ?? '')
        .replace(/\D/g, '')
        .slice(0, 11);

    if (value.length <= 2) {
        return value ? `(${value}` : '';
    }

    if (value.length <= 6) {
        return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }

    if (value.length <= 10) {
        return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    }

    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
}