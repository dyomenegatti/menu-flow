import { createRouter, createWebHistory } from "vue-router";

import MenuLayout from "../../widgets/menu-layout/MenuLayout.vue";

const routes = [
    {
        path: '/',
        component: () =>
            import("../../widgets/admin-layout/AdminLayout.vue"),
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () =>
                    import('../../pages/admin/orders/OdersPage.vue'),
                meta: {
                    sidebar: {
                        title: 'Pedidos',
                        icon: 'mdi-cart-outline',
                        group: 'Operações',
                        order: 1
                    }
                }
            },
            {
                path: 'products',
                name: 'Products',
                component: () =>
                    import('../../pages/admin/products/ProductsPage.vue'),
                meta: {
                    sidebar: {
                        title: 'Produtos',
                        icon: 'mdi-package-variant',
                        group: 'Cadastros',
                        order: 1
                    }
                }
            }
        ]
    },
    {
        path: '/menu',
        name: 'Menu',
        component: MenuLayout,
        children: [
            {
                path: '',
                name: 'MenuRedirect',
                component: () =>
                    import("../../pages/public/menu-redirect/MenuRedirectPage.vue")
            },
            {
                path: ':category',
                name: 'MenuCategory',
                component: () =>
                    import("../../pages/public/menu-category/MenuCategoryPage.vue")
            },
            {
                path: 'orders',
                name: 'OrdersViews',
                component: () =>
                    import("../../entities/orders/ui/OrdersView.vue")
            },
            {
                path: 'checkout',
                name: 'CheckoutView',
                component: () =>
                    import('../../entities/cart/ui/CheckoutView.vue')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;