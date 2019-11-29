export const exampleData = {
    companyDetails: [
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
    ],
    customerDetails: [
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
        }
    ],
    description: ``,
    // description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat tincidunt sagittis. Sed non cursus orci, imperdiet dictum ex. Etiam vel metus ac nulla sollicitudin ullamcorper sed id velit. Duis viverra neque sit amet dolor fermentum auctor.`,
    billingInfo: [
        {
            name: 'Date',
            value: new Date().toLocaleDateString(),
            editable: false
        },
        {
            name: 'Invoice No.',
            value: '534-12331212',
            editable: false
        },
        {
            name: 'CustomerId',
            value: '999',
            editable: false
        },
        {
            name: 'Due Date',
            value: new Date().toLocaleDateString(),
            editable: false
        },
    ],
    billingAmounts: [
        {
            name: 'Sub Total',
            value: 'Value',
            editable: false,
            id: 'sub-total'
        },
        {
            name: 'Tax',
            value: 'Value',
            editable: false,
            id: 'tax'
        },
        {
            name: 'Total',
            value: 'Value',
            editable: false,
            id: 'total'
        },
    ],
    form: {
        data: [],
        columns: [
            {
                name: 'Title',
                required: true,
                placeholder: '',
                data: null,
                inputType: 'text',
                field: 'title'
            },
            {
                name: 'Description',
                required: true,
                placeholder: '',
                data: null,
                inputType: 'text',
                field: 'description'
            },
            {
                name: 'Quantity',
                required: true,
                placeholder: '',
                data: null,
                inputType: 'number',
                field: 'quantity',
                step: '0'
            },
            {
                name: 'Cost (Per Unit)',
                required: true,
                placeholder: '',
                data: null,
                inputType: 'number',
                field: 'cost',
                step: '0.01' // 2 Decimals
            },
            {
                name: 'Amount',
                required: true,
                placeholder: '',
                data: null,
                field: 'amount',
                step: '0.01' // 2 Decimals
            },
        ]
    }
}