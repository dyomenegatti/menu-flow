import ProductGrid from "./ProductGrid.vue";
import ProductCard from "../../entities/product/ui/ProductCard.vue";
import { mount } from '@vue/test-utils';

it('deve renderizar lista de produtos', () => {
    const wrapper = mount(ProductGrid, {
        props: {
            products: [
                { id: 1, name: 'X-Burguer' },
                { id: 2, name: 'Coca-cola' }
            ]
        },
        global: {
            stubs: {
                ProductCard: true
            }
        }
    });

    expect(wrapper.text()).toContain('X-Burguer');
});

it('deve emitir product-click ao clicar no produto', async() => {
    const wrapper = mount(ProductGrid, {
        props: {
            products: [
                { id: 1, name: 'X-Burguer' }
            ]
        },
        global: {
            stubs: {
                ProductCard: {
                    template: '<div @click="$emit(`click`)">card</div>'
                }
            }
        }
    });

    await wrapper.findComponent({ name: 'ProductCard' }).trigger('click');

    expect(wrapper.emitted('product-click')).toBeTruthy();
});

it('deve enviar o produto correto no evento', async() => {
    const wrapper = mount(ProductGrid, {
        props: {
            products: [
                { id: 1, name: 'X-Burguer' }
            ]
        },
        global: {
            stubs: {
                ProductGrid: {
                    template: '<div @click="$emit(`click`)"></div>'
                }
            }
        }
    });

    await wrapper.findComponent({ name: 'ProductCard' }).trigger('click');

    expect(wrapper.emitted('product-click')[0]).toEqual([
        { id: 1, name: 'X-Burguer' }
    ]);
});