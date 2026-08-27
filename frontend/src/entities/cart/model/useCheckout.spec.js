import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach
} from 'vitest';

import { nextTick } from 'vue';

import { useCheckout } from './useCheckout';
import { checkoutFields } from './checkoutFields';
import {
    saveCheckout,
    getCheckout,
    clearCheckout
} from './checkoutStorage';

vi.mock('./checkoutStorage', () => ({
    saveCheckout: vi.fn(),
    getCheckout: vi.fn(),
    clearCheckout: vi.fn()
}));

describe('useCheckout', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        getCheckout.mockReturnValue(null);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('initial state', () => {
        it('should initialize with delivery as default type', () => {
            const {
                checkout,
                currentForm,
                currentFields
            } = useCheckout();

            expect(checkout.deliveryType).toBe('delivery');

            expect(currentForm.value).toBe(
                checkout.delivery
            );

            expect(currentFields.value).toEqual(
                checkoutFields.delivery
            );
        });

        it('should initialize delivery form fields with empty values', () => {
            const { checkout } = useCheckout();

            checkoutFields.delivery.forEach(field => {
                expect(
                    checkout.delivery[field.key]
                ).toBe('');
            });
        });

        it('should initialize pickup form fields with empty values', () => {
            const { checkout } = useCheckout();

            checkoutFields.pickup.forEach(field => {
                expect(
                    checkout.pickup[field.key]
                ).toBe('');
            });
        });
    });

    describe('currentForm', () => {
        it('should return delivery form when delivery type is selected', () => {
            const {
                checkout,
                currentForm
            } = useCheckout();

            checkout.deliveryType = 'delivery';

            expect(currentForm.value).toBe(
                checkout.delivery
            );
        });

        it('should return pickup form when pickup type is selected', () => {
            const {
                checkout,
                currentForm
            } = useCheckout();

            checkout.deliveryType = 'pickup';

            expect(currentForm.value).toBe(
                checkout.pickup
            );
        });
    });

    describe('currentFields', () => {
        it('should return delivery fields when delivery type is selected', () => {
            const {
                checkout,
                currentFields
            } = useCheckout();

            checkout.deliveryType = 'delivery';

            expect(currentFields.value).toEqual(
                checkoutFields.delivery
            );
        });

        it('should return pickup fields when pickup type is selected', () => {
            const {
                checkout,
                currentFields
            } = useCheckout();

            checkout.deliveryType = 'pickup';

            expect(currentFields.value).toEqual(
                checkoutFields.pickup
            );
        });
    });

    describe('isValid', () => {
        it('should be invalid when required delivery fields are empty', () => {
            const {
                checkout,
                isValid
            } = useCheckout();

            checkout.deliveryType = 'delivery';

            expect(isValid.value).toBe(false);
        });

        it('should be valid when all required delivery fields are filled', () => {
            const {
                checkout,
                isValid
            } = useCheckout();

            checkout.deliveryType = 'delivery';

            checkoutFields.delivery
                .filter(field => field.required)
                .forEach(field => {
                    checkout.delivery[field.key] = 'Valor preenchido';
                });

            expect(isValid.value).toBe(true);
        });

        it('should be invalid when a required delivery field is empty', () => {
            const {
                checkout,
                isValid
            } = useCheckout();

            checkout.deliveryType = 'delivery';

            const requiredFields = checkoutFields.delivery
                .filter(field => field.required);

            requiredFields.forEach(field => {
                checkout.delivery[field.key] = 'Valor preenchido';
            });

            checkout.delivery[
                requiredFields[0].key
            ] = '';

            expect(isValid.value).toBe(false);
        });

        it('should be invalid when a required field contains only spaces', () => {
            const {
                checkout,
                isValid
            } = useCheckout();

            checkout.deliveryType = 'delivery';

            checkoutFields.delivery
                .filter(field => field.required)
                .forEach(field => {
                    checkout.delivery[field.key] = 'Valor preenchido';
                });

            const requiredField = checkoutFields.delivery
                .find(field => field.required);

            checkout.delivery[
                requiredField.key
            ] = '   ';

            expect(isValid.value).toBe(false);
        });

        it('should be valid when only optional fields are empty', () => {
            const {
                checkout,
                isValid
            } = useCheckout();

            checkout.deliveryType = 'delivery';

            checkoutFields.delivery
                .filter(field => field.required)
                .forEach(field => {
                    checkout.delivery[field.key] = 'Valor preenchido';
                });

            checkoutFields.delivery
                .filter(field => !field.required)
                .forEach(field => {
                    checkout.delivery[field.key] = '';
                });

            expect(isValid.value).toBe(true);
        });

        it('should validate pickup fields when pickup type is selected', () => {
            const {
                checkout,
                isValid
            } = useCheckout();

            checkout.deliveryType = 'pickup';

            expect(isValid.value).toBe(false);

            checkoutFields.pickup
                .filter(field => field.required)
                .forEach(field => {
                    checkout.pickup[field.key] = 'Valor preenchido';
                });

            expect(isValid.value).toBe(true);
        });
    });

    describe('saved checkout', () => {
        it('should restore saved checkout data', () => {
            const savedCheckout = {
                deliveryType: 'pickup',
                delivery: {
                    name: 'Dyovana',
                    phone: '11999999999'
                },
                pickup: {
                    name: 'Dyovana'
                }
            };

            getCheckout.mockReturnValue(savedCheckout);

            const { checkout } = useCheckout();

            expect(checkout.deliveryType).toBe('pickup');

            expect(checkout.delivery).toMatchObject(
                savedCheckout.delivery
            );

            expect(checkout.pickup).toMatchObject(
                savedCheckout.pickup
            );
        });

        it('should keep default values when there is no saved checkout', () => {
            getCheckout.mockReturnValue(null);

            const { checkout } = useCheckout();

            expect(checkout.deliveryType).toBe('delivery');

            checkoutFields.delivery.forEach(field => {
                expect(
                    checkout.delivery[field.key]
                ).toBe('');
            });

            checkoutFields.pickup.forEach(field => {
                expect(
                    checkout.pickup[field.key]
                ).toBe('');
            });
        });
    });

    describe('checkout persistence', () => {
        it('should save checkout when its data changes', async () => {
            const { checkout } = useCheckout();

            checkout.deliveryType = 'pickup';

            await nextTick();

            expect(saveCheckout).toHaveBeenCalled();
        });

        it('should save checkout when a delivery field changes', async () => {
            const { checkout } = useCheckout();

            const field = checkoutFields.delivery[0];

            checkout.delivery[field.key] = 'Novo valor';

            await nextTick();

            expect(saveCheckout).toHaveBeenCalled();
        });

        it('should save the current checkout object', async () => {
            const { checkout } = useCheckout();

            checkout.deliveryType = 'pickup';

            await nextTick();

            expect(saveCheckout).toHaveBeenCalledWith(
                checkout
            );
        });
    });
});