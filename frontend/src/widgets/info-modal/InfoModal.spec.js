import InfoModal from "./InfoModal.vue";
import { mount } from '@vue/test-utils';

it('deve renderizar itens do restaurante', () => {
    const wrapper = mount(InfoModal, {
        props: {
            showDialog: true,
            items: [
                {
                    title: 'Telefone', 
                    icon:'mdi-phone', 
                    lines: ['(11) 99999-9999']
                }
            ]
        }
    });

    expect(wrapper.text()).toContain('Telefone');
});

it('deve renderizar múltiplas linhas do item', () => {
  const wrapper = mount(InfoModal, {
    props: {
      showDialog: true,
      items: [
        {
          title: 'Horário',
          icon: 'mdi-clock',
          lines: ['Seg - Sex', '11h - 23h']
        }
      ]
    }
  });

  expect(wrapper.text()).toContain('Seg - Sex');
  expect(wrapper.text()).toContain('11h - 23h');
});

it('deve emitir update quando modal muda', async () => {
  const wrapper = mount(InfoModal, {
    props: {
      showDialog: true,
      items: []
    }
  });

  wrapper.vm.$emit('update:showDialog', false);

  expect(wrapper.emitted('update:showDialog')).toBeTruthy();
});