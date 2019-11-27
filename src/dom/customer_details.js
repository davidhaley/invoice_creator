import { components } from './components/fields';

export const createCustomerDetails = () => {

    const customerDetails = components.create.fieldGroup({
        fields: [
            // {
            //     name: 'Company Name',
            //     value: 'Fake Customer',
            //     editable: false
            // },
            {
                name: 'Street Address',
                value: '456 Fake Street',
                editable: false
            },
            {
                name: 'City',
                value: 'Fake City',
                editable: false
            },
            {
                name: 'Postal Code',
                value: 'F4K-3D3',
                editable: false
            },
            {
                name: 'Phone',
                value: '111-111-1111',
                editable: false
            },
            {
                name: 'Website',
                value: 'example2.com',
                editable: false
            },
        ]
    });

    return customerDetails;
}