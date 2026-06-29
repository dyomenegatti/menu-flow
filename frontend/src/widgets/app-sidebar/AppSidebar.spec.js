import { useDisplay } from "vuetify/lib/composables/display.mjs"
import AppSidebar from "./AppSidebar.vue"

it('deve iniciar drawer fechado no mobile', () => {
    const wrapper = mount(AppSidebar, {
        props: {
            items: []
        },
        global: {
            mocks: {
                useDisplay: () => ({ mobile: true })
            }
        }
    });

    expect(wrapper.vm.drawer).toBe(false);
});

it('deve iniciar drawer aberto no desktop', () => {
    const wrapper = mount(AppSidebar, {
        props: {
            items: []
        },
        global: {
            mocks: {
                useDisplay: () => ({ mobile: false })
            }
        }
    });

    expect(wrapper.vm.drawer).toBe(true);
})