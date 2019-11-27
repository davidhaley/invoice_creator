import { components } from './components/fields';

export const createBillingAmounts = () => {

    const billingAmounts = components.create.fieldGroup({
        fields: [
            {
                name: 'Sub Total',
                value: 'Value',
                editable: false
            },
            {
                name: 'Tax',
                value: 'Value',
                editable: false
            },
            {
                name: 'Total',
                value: 'Value',
                editable: false
            },
        ]
    });

    return billingAmounts;
}