export const dom = {
    select: {
        companyDetails: () => document.querySelector('#company-details'),
        customerDetails: () => document.querySelector('#customer-details'),
        billingInfo: () => document.querySelector('#billing-info'),
        billingAmounts: () => document.querySelector('#billing-amounts'),
        form: () => document.querySelector('#responsive-form'),
        description: () => document.querySelector(`#description`),
        actionButtons: () => document.querySelector(`#form-action-buttons`),
        subTotal: () => document.querySelector(`#sub-total`),
        tax: () => document.querySelector(`#tax`),
        total: () => document.querySelector(`#total`),
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
        form: {
            header: [

            ],
            formRow: [
                'form-row',
                'align-items-center'
            ],
            col1: [
                'col-sm-12',
                'col-md-2',
                'col-lg-2',
                'col-xl-2',
                'text-center'
            ],
            col2: [
                'col-sm-12',
                'col-md-3',
                'col-lg-3',
                'col-xl-4',
                'text-center'
            ],
            input: [
                'form-control',
                'text-center'
            ],
            inputGroup: [
                'input-group',
                'mb-2'
            ],
            textArea: [
                'form-control'
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
            ],
            label: [
                'control-label'
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

export const addClasses = ({ classes, elem }) => {
    for (const className of classes)  {
        elem.classList.add(className);
    }
    return elem;
}
