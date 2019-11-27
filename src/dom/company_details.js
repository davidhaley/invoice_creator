import { components } from './components/fields';

export const createCompanyDetails = () => {

    const companyDetails = components.create.fieldGroup({
        fields: [
            // {
            //     name: 'Company Name',
            //     value: 'Fake Company',
            //     editable: false
            // },
            {
                name: 'Street Address',
                value: '123 Fake Street',
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
                value: '000-000-0000',
                editable: false
            },
            {
                name: 'Website',
                value: 'example.com',
                editable: false
            },
        ]
    });

    return companyDetails;
}