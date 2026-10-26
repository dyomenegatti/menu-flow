import router from '../../../app/router/index.js';

const groupOrder = [
    'Operações',
    'Cadastros',
    'Análise',
    'Configurações'
];

export function getAdminMenu() {
    const routes = router.getRoutes();

    const menuRoutes = routes.filter(
        route => route.meta?.sidebar
    );

    const groups = menuRoutes.reduce((acc, route) => {
        const { title, icon, group, order } = route.meta.sidebar;

        if (!acc[group]) {
            acc[group] = [];
        }

        acc[group].push({
            title,
            icon,
            to: { name: route.name },
            order
        });

        return acc;
    }, {});

    return groupOrder
        .filter(group => groups[group])
        .map(group => ({
            title: group,
            items: groups[group].sort(
                (a, b) => a.order - b.order
            )
        }));
}