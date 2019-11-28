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
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat tincidunt sagittis. Sed non cursus orci, imperdiet dictum ex. Etiam vel metus ac nulla sollicitudin ullamcorper sed id velit. Duis viverra neque sit amet dolor fermentum auctor. Fusce eget ipsum a enim scelerisque ultricies eget nec odio. Mauris nec nisi ut elit ultrices mattis ut nec odio. Ut vestibulum maximus ipsum vel sodales. Etiam imperdiet sem id fermentum varius. Sed maximus nulla tempor nulla consectetur auctor. Praesent facilisis ligula in nibh sollicitudin, ac sollicitudin lacus convallis. Vestibulum dignissim ipsum id est consectetur tincidunt. In ut leo nunc. Fusce imperdiet commodo ipsum, at maximus purus eleifend et. Mauris id odio nec dolor lobortis pulvinar quis quis dolor.`,
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
    ],
    table: {
        data: [],
        columns: [
            {
                name: 'Title',
                required: true,
                placeholder: '',
                data: null,
                fieldType: String,
                inputType: 'text'
            },
            {
                name: 'Description',
                required: true,
                placeholder: '',
                data: null,
                fieldType: String,
                inputType: 'text'
            },
            {
                name: 'Quantity',
                required: true,
                placeholder: '',
                data: null,
                fieldType: Number,
                inputType: 'number'
            },
            {
                name: 'Type',
                required: true,
                placeholder: '',
                data: null,
                fieldType: Array,
                inputType: 'radio',
                values: [
                    'Part',
                    'Labour'
                ]
            },
            {
                name: 'Cost Rate ($/Units)',
                required: true,
                placeholder: '',
                data: null,
                fieldType: Number,
                inputType: 'number'
            },
            {
                name: 'Amount',
                required: true,
                placeholder: '',
                data: null,
                fieldType: Number,
                inputType: 'number'
            },
        ]
    }
}