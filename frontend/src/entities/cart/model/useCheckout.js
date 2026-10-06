import { computed, reactive, ref, watch } from "vue";

import {
    saveCheckout,
    getCheckout,
    clearCheckout
} from "./checkoutStorage";

export function useCheckout() {

    const checkout = reactive({
        deliveryType: 'delivery',

        delivery: {
            name: '',
            phone: '',
            cep: '',
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            reference: '',
            observation: ''
        },

        pickup: {
            name: '',
            phone: '',
            observation: ''
        }
    });

    const saved = getCheckout();

    const rememberCheckout = ref(!!saved);

    if (saved) {
        checkout.deliveryType = saved.deliveryType;

        Object.assign(
            checkout.delivery,
            saved.delivery
        );

        Object.assign(
            checkout.pickup,
            saved.pickup
        );
    }

    watch(
        checkout,
        () => {
            if (!rememberCheckout.value) {
                return;
            }

            saveCheckout(checkout);
        },
        {
            deep: true
        }
    );

    watch(
        rememberCheckout,
        value => {
            if (!value) {
                clearCheckout();
                return;
            }

            saveCheckout(checkout);
        }
    );

    const isValid = computed(() => {
        if (checkout.deliveryType === 'pickup') {
            return !!(
                checkout.pickup.name?.trim() &&
                checkout.pickup.phone?.trim()
            );
        }

        return !!(
            checkout.delivery.name?.trim() &&
            checkout.delivery.phone?.trim() &&
            checkout.delivery.cep?.trim() &&
            checkout.delivery.street?.trim() &&
            checkout.delivery.number?.trim() &&
            checkout.delivery.neighborhood?.trim()
        );
    });

    return {
        checkout,
        isValid,
        rememberCheckout
    };
}