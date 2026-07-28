import ProductCard from "./ProductCard.vue";
import { mount } from '@vue/test-utils';

it('deve renderizar informações do produto', () => {
    const wrapper = mount(ProductCard, {
        props: {
            product: {
                name: 'X-Burguer', 
                description: 'Hambúrguer clássico', 
                price: 22.5,
                image: 'image.jpeg'
            }
        }
    });

    expect(wrapper.text()).toContain('X-Burguer');
    expect(wrapper.text()).toContain('Hambúrguer clássico');
});

it('deve formatar preço em BRL', () => {
    const wrapper = mount(ProductCard, {
        props: {
            product: {
                name: 'X-Burguer', 
                description: '',
                price: 10,
                image: ''
            }
        }
    });

    expect(wrapper.text()).toContain('R$');
});

it('deve emitir evento click ao clicar no card', async () => {
    const wrapper = mount(ProductCard, {
        props: {
            product: {
                name: 'X-Burguer',
                description: '',
                price: 10,
                image: ''
            }
        }
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')[0]).toEqual([
        expect.objectContaining({ name: 'X-Burguer' })
    ]);
});