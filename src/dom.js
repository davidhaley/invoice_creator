export const dom = {
    select: {
        companyDetails: () => document.querySelector('#company-details'),
        customerDetails: () => document.querySelector('#customer-details'),
        billingInfo: () => document.querySelector('#billing-info'),
        billingAmounts: () => document.querySelector('#billing-amounts'),
        taxRateInput: () => document.querySelector('#tax-rate-input'),
        taxRate: () => document.querySelector('#tax-rate'),
        form: () => document.querySelector('#responsive-form'),
        description: () => document.querySelector('#description'),
        actionButtons: () => document.querySelector('#form-action-buttons'),
        shareInvoiceButton: () => document.getElementById('share-invoice-button'),
        submitButtonCol: () => document.getElementById('submit-button-col'),
        signaturePad: () => document.getElementById('signature-pad'),
        signatureButtonText: () => document.getElementById('signature-button-text'),
        signatureButton: () => document.getElementById('signature-button'),
        subTotal: () => document.querySelector('#sub-total'),
        tax: () => document.querySelector('#tax'),
        total: () => document.querySelector('#total'),
    },
    create: {
        companyDetails: () => {
            const elem = document.createElement('div');
            elem.id = 'company-details';
            return elem;
        },
        customerDetails: () => {
            const elem = document.createElement('div');
            elem.id = 'customer-details';
            return elem;
        },
        billingInfo: () => {
            const elem = document.createElement('div');
            elem.id = 'billing-info';
            return elem;
        },
        billingAmounts: () => {
            const elem = document.createElement('div');
            elem.id = 'billing-amounts';
            return elem;
        },
        form: () => {
            const elem = document.createElement('div');
            elem.id = 'responsive-form';
            return elem;
        },
        description: () => {
            const elem = document.createElement('div');
            elem.id = 'description';
            return elem;
        },
        actionButtons: () => {
            const elem = document.createElement('div');
            elem.id = 'form-action-buttons';
            return elem;
        },
        shareInvoiceButton: () => {
            const elem = document.createElement('div');
            elem.id = 'share-invoice-button';
            return elem;
        },
        submitButtonCol: () => {
            const elem = document.createElement('div');
            elem.id = 'submit-button-col';
            return elem;
        },
        signaturePad: () => {
            const elem = document.createElement('canvas');
            elem.id = 'signature-pad';
            return elem;
        },
        signatureButtonText: () => {
            const elem = document.createElement('span');
            elem.id = 'signature-button-text';
            return elem;
        },
        signatureButton: () => {
            const elem = document.createElement('button');
            elem.id = 'signature-button';
            return elem;
        },
        subTotal: () => {
            const elem = document.createElement('div');
            elem.id = 'sub-total';
            return elem;
        },
        tax: () => {
            const elem = document.createElement('div');
            elem.id = 'tax';
            return elem;
        },
        total: () => {
            const elem = document.createElement('div');
            elem.id = 'total';
            return elem;
        },
        taxRateInput: () => {
            const elem = document.createElement('div');
            elem.id = 'tax-rate-input';
            return elem;
        },
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
            ],
            taxRateInput: [
                'input-group-text'
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
