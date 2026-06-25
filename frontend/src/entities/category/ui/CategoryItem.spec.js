import { expect, it } from "vitest";
import CategoryItem from "./CategoryItem.vue";

it('deve renderizar categoria no modo sidebar', () => {
    const wrapper = mount(CategoryItem, {
        props: {
            variant: 'sidebar',
            category: {
                name: 'Hambúrgueres',
                slug: 'hamburgueres',
                total_items: 10
            }
        }
    })

    expect(wrapper.text()).toContain('Hambúrgueres');
    expect(wrapper.text()).toContain('10');
});

it('deve renderizar categorias no modo tab', () => {
    const wrapper = mount(CategoryItem, {
        props: {
            variant: 'tab', 
            category: {
                name: 'Bebidas',
                slug: 'bebidas',
                total_items: 5
            }
        }
    });

    expect(wrapper.text()).toContain('Bebidas');
});

it('deve gerar a rota correta', () => {
    const wrapper = mount(CategoryItem, {
        props: {
            category: {
                name: 'Bebidas', 
                slug: 'bebidas', 
                total_items: 5
            }
        }
    });

    expect(wrapper.vm.route).toEqual({
        name: 'MenuCategory',
        params: {
            category: 'bebidas'
        }
    })
})