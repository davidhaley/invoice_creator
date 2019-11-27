import { components } from './components/fields';

export const createBillingInfo = () => {

    const billingInfo = components.create.fieldGroup({
        fields: [
            {
                name: 'Date',
                value: 'Value',
                editable: false
            },
            {
                name: 'Invoice No.',
                value: 'Value',
                editable: false
            },
            {
                name: 'CustomerId',
                value: 'Value',
                editable: false
            },
            {
                name: 'Due Date',
                value: 'Value',
                editable: false
            },
        ]
    });

    return billingInfo;
}