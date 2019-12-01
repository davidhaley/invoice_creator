import * as bootstrapValidate from 'bootstrap-validate';

const formatTwoDecimalPlaces = (elem) => {
    elem.addEventListener('change', function(e) {
        this.value = currency(this.value);
    });
};

export const exampleData = {
    companyDetails: [
        {
            name: 'Street Address',
            value: '123 Fake Street',
        },
        {
            name: 'City',
            value: 'Fake City',
        },
        {
            name: 'Postal Code',
            value: 'F4K-3D3',
        },
        {
            name: 'Phone',
            value: '000-000-0000',
        },
        {
            name: 'Website',
            value: 'example.com',
        },
    ],
    customerDetails: [
        {
            name: 'Street Address',
            value: '456 Fake Street',
        },
        {
            name: 'City',
            value: 'Fake City',
        },
        {
            name: 'Postal Code',
            value: 'F4K-3D3',
        },
        {
            name: 'Phone',
            value: '111-111-1111',
        },
        {
            name: 'Website',
            value: 'example2.com',
        }
    ],
    description: ``,
    // description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat tincidunt sagittis. Sed non cursus orci, imperdiet dictum ex. Etiam vel metus ac nulla sollicitudin ullamcorper sed id velit. Duis viverra neque sit amet dolor fermentum auctor.`,
    billingInfo: [
        {
            name: 'Date',
            value: new Date().toLocaleDateString(),
        },
        {
            name: 'Invoice No.',
            value: '534-12331212',
        },
        {
            name: 'CustomerId',
            value: '999',
        },
        {
            name: 'Due Date',
            value: new Date().toLocaleDateString(),
        },
    ],
    billingAmounts: [
        {
            name: 'Sub Total',
            value: '$0.00',
            id: 'sub-total'
        },
        {
            name: 'Tax',
            value: '$0.00',
            id: 'tax'
        },
        {
            name: 'Total (CAD)',
            value: '$0.00',
            id: 'total'
        },
    ],
    form: {
        data: [],
        columns: {
            title: {
                data: null,
                field: 'title',
                description: 'Title',
                name: 'title',
                placeholder: '',
                type: 'text',
                value: undefined,
            },
            description: {
                data: null,
                field: 'description',
                description: 'Description',
                name: 'description',
                placeholder: '',
                type: 'text',
                value: undefined,
            },
            quantity: {
                data: null,
                field: 'quantity',
                description: 'Quantity',
                name: 'quantity',
                placeholder: '0',
                step: '0',
                type: 'number',
                value: undefined,
                id: 'quantity',
                validate:  () => bootstrapValidate('#quantity', `regex:^[0-9]+$:Enter an positive integer`),
            },
            cost: {
                data: null,
                field: 'cost',
                description: 'Cost ($/Qty)',
                name: 'cost',
                placeholder: '$0.00',
                step: '0.01', // 2 Decimals
                type: 'number',
                value: undefined,
                id: 'cost',
                validate:  () => bootstrapValidate('#cost', 'regex:^^-?[0-9]+(\.[0-9]{1,2})?$:Enter a dollar amount (2 decimals)'),
                onCreate: (elem) => formatTwoDecimalPlaces(elem)
            },
            amount: {
                data: null,
                description: 'Line Amount',
                input: 'number',
                name: 'amount',
                placeholder: '$0.00',
                step: '0.01', // 2 Decimals
                type: 'text',
                value: undefined,
            },
        },
        taxRateInput: {
            name: 'taxrate',
            description: 'Tax Rate (%)',
            value: '5',
            placeholder: '5%',
            type: 'number',
            id: 'tax-rate',
            step: '0.01',
            validate:  () => bootstrapValidate('#tax-rate', 'regex:^[0-9]+(\.[0-9]{1,2})?$:Enter a positive tax rate (2 decimals)'),
            onCreate: (elem) => formatTwoDecimalPlaces(elem)
        },
    }
}

