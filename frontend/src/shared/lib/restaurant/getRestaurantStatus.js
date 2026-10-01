export function getRestaurantStatus(restaurant) {
    if(!restaurant?.opening_hours?.length) {
        return ''
    }

    const now = new Date();
    const currentDay = now.getDay();

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const currentTime = currentHour * 60 + currentMinute;

    const today = restaurant.opening_hours.find(
        (day) => day.week_day === currentDay
    );

    if(!today || today.is_closed) {
        return 'Fechado';
    }

    const [openHour, openMinute] = today.opens_at.split(':').map(Number);
    const [closeHour, closeMinute] = today.closes_at.split(':').map(Number);

    const openingTime = openHour * 60 + openMinute;
    const closingTime = closeHour * 60 + closeMinute;

    if(currentTime >= openingTime && currentTime < closingTime) {
        return `Aberto agora - fecha às ${today.closes_at.slice(0, 5).replace(':', 'h')}`
    }

    return `Fechado - abre às ${today.opens_at.slice(0, 5).replace(':', 'h')}`
}