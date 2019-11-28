export const dom = {
    select: {
        companyDetails: () => document.querySelector('#company-details'),
        customerDetails: () => document.querySelector('#customer-details'),
        billingInfo: () => document.querySelector('#billing-info'),
        billingAmounts: () => document.querySelector('#billing-amounts'),
        table: () => document.querySelector('#responsive-table'),
        tableCells: (table) => {
            if (table) {
                return table.querySelectorAll(`.'Rtable-cell`)
            }
        },
        description: () => document.querySelector(`#description`),
        actionButtons: () => document.querySelector(`#table-action-buttons`)
    },
    styles: {
        fieldGroup: {
            fieldGroup: [
                'fields-group'
            ],
            field: [
                'field'
            ],
            fieldName: [
                'field-name'
            ],
            fieldValue: [
                'field-value'
            ],
            bootStrapRow: [
                'row',
            ]
        },
        table: {
            table: [
                'Rtable',
                'Rtable--head',
                'Rtable--6cols',
                'Rtable--collapse'
            ],
            header: [

            ],
            headerCell: [
                'Rtable-cell',
                'Rtable-cell--head'
            ],
            cell: [
                'Rtable-cell',
            ],
            form: [
                'form-inline'
            ],
            formGroup: [
                'form-group',
            ],
            input: [
                'form-control',
                'input-lg'
                // 'mb-2',
                // 'mr-sm-2'
            ],
            bootStrapRow: [
                'row',
            ],
            buttonPrimary: [
                'btn',
                'btn-primary'
            ],
            buttonSecondary: [
                'btn',
                'btn-secondary'
            ],
            buttonGroup: [
                'btn-group'
            ]
        },
        textArea: {
            textArea: [
                'form-control',
                'rounded-0'
            ],
            formGroup: [
                'form-group',
                'textarea'
            ],
        }
    }
}
