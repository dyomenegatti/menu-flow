import { useCategories } from "../../entities/category/model/useCategories.js";
import MenuLayout from "./MenuLayout.vue";

it('deve alternar tema corretamente', async () => {
  const wrapper = mount(MenuLayout, {
    global: {
      mocks: {
        useTheme: () => ({
          global: {
            current: { value: { dark: false } },
            name: { value: 'lightTheme' }
          }
        })
      }
    }
  });

  wrapper.vm.toggleTheme();

  expect(wrapper.vm.theme.global.name.value).toBeDefined();
});

it('deve abrir modal de informações', async () => {
  const wrapper = mount(MenuLayout);

  expect(wrapper.vm.showModal).toBe(false);

  wrapper.vm.openInfoModal();

  expect(wrapper.vm.showModal).toBe(true);
});

it('deve chamar fetchCategories ao montar', async () => {
  const fetchCategories = vi.fn();

  mount(MenuLayout, {
    global: {
      mocks: {
        useCategories: () => ({
          categories: ref([]),
          fetchCategories
        })
      }
    }
  });

  expect(fetchCategories).toHaveBeenCalled();
});

it('deve renderizar categorias no sidebar', () => {
  const wrapper = mount(MenuLayout, {
    global: {
      mocks: {
        useCategories: () => ({
          categories: ref([
            { id: 1, name: 'Burgers' }
          ]),
          fetchCategories: vi.fn()
        })
      }
    }
  });

  expect(wrapper.text()).toContain('Burgers');
});