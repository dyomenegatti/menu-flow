import { ref } from "vue";
import { useCategories } from "../../../entities/category/model/useCategories";
import MenuCategoryPage from "./MenuCategoryPage.vue";
import { useProducts } from "../../../entities/product/model/useProducts.js";
import { mount } from '@vue/test-utils';

it('deve buscar categorias ao montar', async () => {
    const fetchCategories = vi.fn();

    mount(MenuCategoryPage,  {
        global: {
            mocks: {
                useCategories: () => ({
                    categories: ref([]),
                    fetchCategories
                }),
                useProducts: () => ({
                    products: ref([]),
                    fetchProductByCategory: vi.fn()
                }),
                useRoute: () => ({
                    params: { category: 'burgers' }
                })
            }
        }
    });

    expect(fetchCategories).toHaveBeenCalled();
});

it('deve buscar produtos com base na categoria da rota', async() => {
    const fetchProductByCategory = vi.fn();

    mount(MenuCategoryPage, {
        global: {
            mocks: {
                useCategories: () => ({
                    categories: ref([
                        { slug: 'burgers', id: 1 }
                    ]),
                    fetchCategories: vi.fn()
                }),
                useProducts: () => ({
                    products: ref([]),
                    fetchProductByCategory
                }),
                useRoute: () => ({
                    params: { category: 'burgers' }
                })
            }
        }
    });

    expect(fetchProductByCategory).toHaveBeenCalledWith(1);
});

it('deve abrir modal ao selecionar produto', async() => {
    const wrapper = mount(MenuCategoryPage, {
        global: {
            mocks: {
                useCategories: () => ({
                    categories: ref([])
                }),
                useProducts: () => ({
                    products: ref([{ id: 1, name: 'X' }]),
                    fetchProductByCategory: vi.fn()
                }),
                useRoute: () => ({
                    params: { category: 'burgers' }
                })
            }
        }
    });

    wrapper.vm.openProduct({ id: 1 });

    expect(wrapper.vm.selectedProduct).toEqual({ id: 1 });
    expect(wrapper.vm.showProductModal).toBe(true);
});

it('deve mostrar mensagem quando não houver produto', () => {
    const wrapper = mount(MenuCategoryPage, {
        global: {
            mocks: {
                useCategories: () => ({
                    categories: ref([])
                }),
                useProducts: () => ({
                    products: ref([]),
                    fetchProductByCategory: vi.fn()
                }),
                useRoute: () => ({
                    params: { category: 'burgers' }
                })
            }
        }
    });

    expect(wrapper.text()).toContain('Nenhum produto encontrado');
})