import { nextTick } from "vue";
import ProductDetailModal from "./ProductDetailModal.vue";

it('deve renderizar dados do produto', () => {
    const wrapper = mount(ProductDetailModal, {
        props: {
            dialog: true,
            product: {
                name: 'X-Burguer',
                description: 'Hambúrguer, queijo e salada', 
                price: 23, 
                image: 'img.jpg'
            }
        }
    });

    expect(wrapper.text()).toContain('X-Burguer');
    expect(wrapper.text()).toContain('Hambúrguer, queijo e salada');
});

it('deve formatar preço base corretamente', () => {
    const wrapper = mount(ProductDetailModal, {
        props: {
            dialog: true,
            product: {
                name: '',
                description: '',
                price: 10
            }
        }
    });

    expect(wrapper.text()).toContain('R$');
    expect(wrapper.text()).toContain('10');
});

it('deve cancular total com quantidade e adicionais', async () => {
    const wrapper = mount(ProductDetailModal, {
        props: {
            dialog: true,
            product: {
                price: 10
            }
        }
    });

    wrapper.vm.quantity = 2;

    await nextTick();

    expect(wrapper.text()).toContain('R$');
});

it('deve resetar formulário ao fechar modal', async () => {
    const wrapper = mount(ProductDetailModal, {
        props: {
            dialog: true,
            product: { price: 20 }
        }
    });

    wrapper.vm.quantity = 5;

    await wrapper.setProps({ dialog: false });

    expect(wrapper.vm.quantity).toBe(1);
    expect(wrapper.vm.selectedAddons).toEqual([]);
});