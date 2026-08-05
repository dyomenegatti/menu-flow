import { createRouter, createWebHistory } from "vue-router";

import MenuLayout from "../../widgets/menu-layout/MenuLayout.vue";

const routes = [
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
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;