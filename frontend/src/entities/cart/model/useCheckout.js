import { computed, reactive, watch } from "vue";

import { checkoutFields } from "./checkoutFields";
import {
    saveCheckout,
    getCheckout,
    clearCheckout
} from './checkoutStorage';


function createInitialForm(fields) {

    return fields.reduce((acc, field) => {

        acc[field.key] = '';

        return acc;

    }, {});

}



const checkout = reactive({

    deliveryType: 'delivery',

    delivery: createInitialForm(checkoutFields.delivery),

    pickup: createInitialForm(checkoutFields.pickup)

});


// carregar dados salvos
const saved = getCheckout();


if(saved){

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

        saveCheckout(checkout);

    },

    {
        deep:true
    }

);



const currentForm = computed(() => {

    return checkout[
        checkout.deliveryType
    ];

});


const currentFields = computed(() => {

    return checkoutFields[
        checkout.deliveryType
    ];

});


const isValid = computed(() => {

    return currentFields.value
        .filter(field => field.required)
        .every(field => {

            return currentForm.value[field.key]
                ?.trim();

        });

});



export function useCheckout(){

    return {
        checkout,
        currentForm,
        currentFields,
        isValid
    };

}