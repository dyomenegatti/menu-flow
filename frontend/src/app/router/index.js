import { createRouter, createWebHistory } from "vue-router";

import MenuLayout from "../../widgets/menu-layout/MenuLayout.vue";
import MenuCategoryPage from "../../pages/menu-category/MenuCategoryPage.vue";

const routes = [
    {
        path: '/menu',
        component: MenuLayout,
        children: [
            {
                path: ':category',
                name: 'MenuCategory',
                component: MenuCategoryPage
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;