import { isRestaurantOpen } from './isRestaurantOpen';

export function getRestaurantStatus(restaurant) {
    if (!restaurant?.opening_hours?.length) {
        return '';
    }

    const now = new Date();
    const currentDay = now.getDay();

    const today = restaurant.opening_hours.find(
        day => day.week_day === currentDay
    );

    if (!today || today.is_closed) {
        return 'Fechado';
    }

    if (isRestaurantOpen(restaurant)) {
        return `Aberto agora - fecha às ${today.closes_at
            .slice(0, 5)
            .replace(':', 'h')}`;
    }

    return `Fechado - abre às ${today.opens_at
        .slice(0, 5)
        .replace(':', 'h')}`;
}