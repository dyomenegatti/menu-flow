export function isRestaurantOpen(restaurant) {
    if (!restaurant?.opening_hours?.length) {
        return false;
    }

    const now = new Date();
    const currentDay = now.getDay();

    const currentTime =
        now.getHours() * 60 + now.getMinutes();

    const today = restaurant.opening_hours.find(
        day => day.week_day === currentDay
    );

    if (!today || today.is_closed) {
        return false;
    }

    const [openHour, openMinute] = today.opens_at
        .split(':')
        .map(Number);

    const [closeHour, closeMinute] = today.closes_at
        .split(':')
        .map(Number);

    const openingTime = openHour * 60 + openMinute;
    const closingTime = closeHour * 60 + closeMinute;

    if (closingTime <= openingTime) {
        return (
            currentTime >= openingTime ||
            currentTime < closingTime
        );
    }

    return (
        currentTime >= openingTime &&
        currentTime < closingTime
    );
}