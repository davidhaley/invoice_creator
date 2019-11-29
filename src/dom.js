export const dom = {
    select: {
        companyDetails: () => document.querySelector('#company-details'),
        customerDetails: () => document.querySelector('#customer-details'),
        billingInfo: () => document.querySelector('#billing-info'),
        billingAmounts: () => document.querySelector('#billing-amounts'),
        form: () => document.querySelector('#responsive-form'),
        description: () => document.querySelector(`#description`),
        actionButtons: () => document.querySelector(`#form-action-buttons`),
        shareInvoiceButton: () => document.getElementById('share-invoice-button'),
        submitButtonCol: () => document.getElementById('submit-button-col'),
        signaturePad: () => document.getElementById('signature-pad'),
        signatureButtonText: () => document.getElementById('signature-button-text'),
        signatureButton: () => document.getElementById('signature-button'),
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
                'form-field',
                'sr-only'
            ],
            formRow: [
                'form-row',
                'align-items-center',
                // 'mt-5'
            ],
            col1: [
                'col-sm-12',
                'col-md-2',
                'col-lg-2',
                'col-xl-2',
                'text-center',

                // 'd-none',
                // 'd-md-flex'
            ],
            col2: [
                'col-sm-12',
                'col-md-3',
                'col-lg-3',
                'col-xl-4',
                'text-center',

                // 'd-none',
                // 'd-md-flex'
            ],
            colHidden: [
                'col-hidden',
                'd-md-flex'
            ],
            input: [
                'form-control',
                'text-center',
                // 'col-sm-9'
            ],
            inputGroup: [
                'input-group',
                'mb-2'
            ],
            inputGroupPrepend: [
                'input-group-prepend',
                // 'd-none',
                // 'd-md-flex'
                // 'd-md-none',
                // 'd-lg-none',
                // 'd-xl-none'
            ],
            inputGroupPrependTextGroup: [
                'input-group-text',
                // 'col-sm-9',

                // visible-sm and down  (or hidden-md and up)
                'd-md-none',
                'd-lg-none',
                'd-xl-none'
            ],
            inputGroupPrependText: [
                'input-group-prepend-text'
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
            buttonSuccess: [
                'btn',
                'btn-success'
            ],
            buttonGroup: [
                'btn-group'
            ],
            label: [
                'control-label',

                // visible-md and up (hidden-sm and down)
                'd-none',
                'd-md-flex'
            ],
            labelText: [
                'label-text'
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
