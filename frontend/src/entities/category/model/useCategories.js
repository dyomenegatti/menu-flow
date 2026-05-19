// controla o estado categories, chama a api, guarda os dados, loading, erro, fetch...

import { ref } from 'vue';

const categories = ref([]);

export function useCategories() {
    function fetchCategories() {
        categories.value = [
            {
                id: 1,
                name: 'Hambúrgueres',
                slug: 'hambuergueres',
                total_items: 3
            },
            {
                id: 2,
                name: 'Porções',
                slug: 'porcoes',
                total_items: 5
            },
            {
                id: 3,
                name: 'Bebidas',
                slug: 'bebidas',
                total_items: 2
            },
        ]
    }

    return {
        categories,
        fetchCategories
    }
}