import AppHeader from "./AppHeader.vue";
import { mount } from '@vue/test-utils';

it('deve renderizar title e subtitle', () => {
    const wrapper = mount(AppHeader, {
        props: {
            title: 'Burger House', 
            subtitle: 'Peça agora'
        }
    });

    expect(wrapper.text()).toContain('Burger House');
    expect(wrapper.text()).toContain('Peça agora');
});

it('deve renderizar slot append', () => {
    const wrapper = mount(AppHeader, {
        props: {
            title: 'Teste'
        },
        slots: {
            append: '<button>Botão</button>'
        }
    });

    expect(wrapper.find('.btn').exists()).toBe(true);
});

it('deve renderizar slot bottom quando existir', () => {
    const wrapper = mount(AppHeader, {
        props: {
            title: 'Teste'
        },
        slots: {
            bottom: '<div class="bottom-content">Menu</div>'
        }
    });

    expect(wrapper.html()).toContain('bottom-content');
});

it('não deve renderizar bottom quando não houver slot', () => {
    const wrapper = mount(AppHeader, {
        props: {
            title: 'Teste'
        }
    });

    expect(wrapper.find('.header-bottom').exists()).toBe(false);
});