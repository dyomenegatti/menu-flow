import { nextTick, ref } from "vue";
import { useCategories } from "../../../entities/category/model/useCategories";
import MenuRedirectPage from "./MenuRedirectPage.vue";
import { mount } from '@vue/test-utils';

it('deve buscar categorias ao montar', () => {
    const fetchCategories = vi.fn();

    mount(MenuRedirectPage, {
        global: {
            mocks: {
                useCategories: () => ({
                    categories: ref([]),
                    fetchCategories
                }),
                useRouter: () => ({
                    replace: vi.fn()
                })
            }
        }
    });

    expect(fetchCategories).toHaveBeenCalledn();
});

it('deve redirecionar para a primeira categoria', async() => {
    const replace = vi.fn();

    mount(MenuRedirectPage, {
        global: {
            mocks: {
                useCategories: () => ({
                    categories: ref([
                        { slug: 'burgers' },
                        { slug: 'drinks' }
                    ]),
                    fetchCategories: vi.fn()
                }),
                useRouter: () => ({
                    replace
                })
            }
        }
    });

    await nextTick();

    expect(replace).toHaveBeenCalledWith({
        name: 'MenuCategory',
        params: {
            category: 'burgers'
        }
    })
});

it('não deve redirecionar se não houver categories', async () => {
    const replace = vi.fn();

    mount(MenuRedirectPage, {
        global: {
            mocks: {
                useCategories: () => ({
                    categories: ref([]),
                    fetchCategories: vi.fn()
                }),
                useRouter: () => ({
                    replace
                })
            }
        }
    });

    await nextTick();

    expect(replace).not.toHaveBeenCalledn();
});