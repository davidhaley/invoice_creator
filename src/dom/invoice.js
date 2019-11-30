import { dom } from "../dom";
import { components as fieldComponents } from './components/fields';
import { components as textAreaComponents } from './components/textarea';
import { components as formComponents } from "./components/form";
import { components as buttonComponents } from "./components/button";
import { SignaturePad } from './components/signature_pad';

export const createBillingAmounts = ({ billingAmounts }) => fieldComponents.create.fieldGroup({ fields: billingAmounts });
export const createBillingInfo = ({ billingInfo }) => fieldComponents.create.fieldGroup({ fields: billingInfo });
export const createCompanyDetails = ({ companyDetails }) => fieldComponents.create.fieldGroup({ fields: companyDetails });
export const createCustomerDetails = ({ customerDetails }) => fieldComponents.create.fieldGroup({ fields: customerDetails });
export const createDescription = ({ description }) => textAreaComponents.create.textArea({ labelText: 'Invoice Description', textContent: description });

export const createForm = ({ form }) => {

    const formElem = formComponents.create.form();
    formComponents.create.headerRow({ formElem, columns: form.columns, isHeader: true });

    formElem.addEventListener('keyup', (e) => updateMoneyFields());
    formElem.addEventListener('keydown', (e) => {

        const currentElement = e.srcElement;
        const lastRow = getLastRowElement({ formElem });
        const lastRowFocused = isFocusingLastRow({ lastRow, currentElement });
        const lastRowHasAmount = lastRowHasMoneyAmount({ lastRow });

        if (e.key === "Tab"){
            if (!e.shiftKey) {
                if ((e.srcElement.name === "cost")) {
                    if (lastRowFocused) {
                        if (lastRowHasAmount) {
                            addRow({ formElem, columns: form.columns, isHeader: false });
                        } else {
                            e.preventDefault();
                        }
                    }
                }
            } else {
                if (e.srcElement.name === "title") {
                    if (lastRowFocused && !lastRowHasAmount) {
                        deleteRow({ formElem });
                    }
                }
            }
        }
    });

    const signatureContainer = document.getElementById('signature-pad-col');
    createSignaturePad({ containerElem: signatureContainer });

    dom.select.actionButtons().appendChild(
        createButtonsGroupForRowActions({
            buttons: [
                buttonComponents.create.buttonPrimary({
                    name: 'Append New Line-Item',
                    onClick: () => addRow({ formElem, columns: form.columns, isHeader: false }),
                }),
                buttonComponents.create.buttonSecondary({
                    name: 'Delete Last Line-Item',
                    onClick:  () => deleteRow({ formElem }),
                })
            ]
        })
    );

    dom.select.shareInvoiceButton().appendChild(
        createButtonsGroupForRowActions({
            buttons: [
                (() => {
                    let initial = true;
                    const button = buttonComponents.create.buttonSuccess({
                        name: 'Share Invoice',
                        onClick: function() {

                            const signatureButtonText = dom.select.signatureButtonText();
                            const notSigned = (this.textContent === 'Return Invoice' && signatureButtonText.textContent === 'Sign Here');
                            if (notSigned) {
                                alert('You must sign the invoice before you can return it!');
                            } else {
                                const signaturePad = dom.select.signaturePad();
                                signaturePad.style.outline = '3px solid rgb(181, 187, 193, 0.5)';
                                signatureContainer.style.display = 'initial';
                                const init = signaturePad.getAttribute('data-init');
                                console.log(initial)
                                if (!initial) {
                                    // signatureContainer.style.display = 'none';
                                    signaturePad.style.pointerEvents = 'none';
                                    dom.select.signatureButton().disabled = true;
                                } else {
                                    if (init === null || init === 'true') {
                                        console.log('initial');
                                        signatureContainer.style.display = 'initial';
                                        signaturePad.setAttribute('data-init', 'false');
                                        initial = false;
                                    }
                                }


                                dom.select.signatureButton().style.display = 'initial';
                                alert('Invoice Shared!');
                                this.textContent = 'Return Invoice';
                                window.scrollTo(0,document.body.scrollHeight);
                            }
                        },
                    });
                    button.style.display = 'none';
                    return button;
                })()
            ]
        })
    );

    const submitButtonCol = dom.select.submitButtonCol()
    const submitButtonContainer = document.getElementById('submit-button');
    const submitButton = buttonComponents.create.buttonSubmit({
        text: 'Save',
        onClick: () => {
            submitButtonCol.style.display = 'none';
            // signatureContainer.style.display = 'initial';
            hideShareInvoiceButton({ hideButton: false });
            disableRowActionButtons({ disableButtons: true });
            setFieldsReadOnly({ setReadOnly: true });
            window.scrollTo(0,document.body.scrollHeight);
        }
    });
    submitButtonContainer.appendChild(submitButton);


    return formElem;
}

const setFieldsReadOnly = ({ setReadOnly = false }) => {
    const formControls = Array.from(document.querySelectorAll('.form-control'));
    formControls.forEach((formControl) => {
        if (setReadOnly) {
            formControl.setAttribute('readonly', 'true');
        } else {
            formControl.removeAttribute('readonly');
        }
    });
}

const disableRowActionButtons = ({ disableButtons = false }) => {
    Array.from(dom.select.actionButtons().querySelectorAll('button')).forEach((button) => {
        button.disabled = disableButtons;
    });
}

const hideShareInvoiceButton = ({ hideButton = false }) => {
    dom.select.shareInvoiceButton().querySelector('button').style.display = hideButton ? 'none' : 'initial';
}

const createButtonsGroupForRowActions = ({ buttons = [] }) => {
    return buttons.reduce((buttonGroup, curr) => {
        if (buttonGroup) {
            buttonGroup.appendChild(curr);
        }
        return buttonGroup;
    }, buttonComponents.create.buttonGroup())
}

const createSignaturePad = ({ containerElem }) => {

    containerElem.style.display = 'none';
    // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive:false });
    // const canvas = document.getElementById('signature-pad');
    const canvas = dom.select.signaturePad();
    // canvas.onwheel = (e) => e.preventDefault();
    const button = document.getElementById('signature-button');
    const sigButtonText = dom.select.signatureButtonText();
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)',
        velocityFilterWeight: .7,
        minWidth: 0.5,
        maxWidth: 2.5,
        throttle: 16, // max x milli seconds on event update, OBS! this introduces lag for event update
        minPointDistance: 3,
        onBegin: () => {
            button.classList.remove('disabled');
            canvas.style.outline = '2px solid #28a745';
            canvas.setAttribute('data-init', 'true');
            sigButtonText.textContent = 'Clear Signature';
            // dom.select.sa
            // hideShareInvoiceButton({ hideButton: false });
        }
    });
    button.addEventListener('click', function(e) {
        signaturePad.clear();
        // this.disabled = true;
        // const button = dom.select.signatureButton();
        sigButtonText.textContent = 'Sign Here';
        // button.classList.add('disabled');
        // canvas.style.outline = '3px solid #1A95FF';
        // button.style.boxShadow = '0 0 0 0.05rem rgba(23, 162, 184, 0.5)';
        // button.style.transition = 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out';
        // // hideShareInvoiceButton({ hideButton: true });
        // disableRowActionButtons({ disableButtons: false });
        // setFieldsReadOnly({ setReadOnly: false });

        // containerElem.style.display = 'none';
        // dom.select.submitButtonCol().style.display = 'initial';
    });
    // const container = document.getElementById('signature-container');
    // container.appendChild(clearPadButtonGroup);
}

const aggregateAmounts = ({ rows = [] }) => {
    return rows.reduce((prev, curr) => {
        if (prev) {
            const cost = currency(curr.querySelector(`input[name="cost"]`).value);
            const quantity = currency(curr.querySelector(`input[name="quantity"]`).value);
            const amountElem = curr.querySelector(`input[name="amount"]`);

            // console.log(`
            // cost: ${cost},
            // quantity: ${quantity},
            // `)

            if (cost && quantity && amountElem) {
                amountElem.value = `$${currency(cost).multiply(quantity)}`;
                prev.push(cost.multiply(quantity));
            }
        }
        return prev;
    }, []);
}

const calculateSubTotal = ({ amounts = [] }) => {
    // console.log(amounts);
    return amounts.reduce((prev, curr) => {
        return currency(prev).add(currency(curr));
    }, 0)
}

const calculateTax = ({ subTotal }) => {
    return currency(subTotal).multiply(currency(0.05));
}

const calculateTotal = ({ subTotal, tax })  => {
    return currency(subTotal).add(currency(tax));
}

const updateMoneyFields = () => {
    const rowElems = document.querySelectorAll('.form-row');
    if (rowElems) {
        const rows = Array.from(rowElems);

        const amounts = aggregateAmounts({ rows });
        // console.log(amounts);
        if (amounts.length > 0) {
            const subTotal = calculateSubTotal({ amounts });
            // console.log(subTotal);
            dom.select.subTotal().textContent = `$${subTotal}`;

            const tax = calculateTax({ subTotal });
            dom.select.tax().textContent = `$${tax}`;
            // console.log(tax);

            const total = calculateTotal({ subTotal, tax });
            dom.select.total().textContent = `$${total}`;
            // console.log(total);
        }
    }
}

const lastRowHasMoneyAmount = ({ lastRow }) => {
    const lastRowAmount = lastRow.querySelector(`.form-control[name="amount"]`);
    return (currency(lastRowAmount.value).intValue !== 0);
}

const isFocusingLastRow = ({ lastRow, currentElement }) => lastRow.contains(currentElement);

const getLastRowElement = ({ formElem }) => {
    const formRows = formElem.getElementsByClassName('form-row');
    return formRows[formRows.length - 1];
}

const addRow = ({ formElem, columns, isHeader }) => {
    formComponents.create.headerRow({ formElem, columns, isHeader });
    updateMoneyFields();
};

const deleteRow = ({ formElem }) => {
    console.log('hey');
    const rows = formElem.querySelectorAll('.form-row');
    console.log(rows);
    if (rows.length > 1) {
        rows[rows.length - 1].remove();
        updateMoneyFields();
    }
}
