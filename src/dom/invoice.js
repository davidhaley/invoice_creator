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

    // Create form
    const formElem = formComponents.create.form({
        onKeyUp: handleKeyUp,
        onKeyDown: (e) => handleKeyDown({
            e,
            formElem,
            formColumns: form.columns
        })
    });

    // Create first row (header)
    formComponents.create.row({
        formElem,
        columns: form.columns,
        isHeader: true
    });

    // Create tax rate input
    const taxRateInputElem = dom.select.taxRateInput();
    taxRateInputElem.appendChild(
        formComponents.create.taxRateInput({
            taxRateInput: form.taxRateInput,
            onKeyUp: handleKeyUp,
            onKeyDown: (e) => handleKeyDown({ e, formElem, formColumns: form.columns })
        })
    );

    // Create signature pad
    const signatureContainer = document.getElementById('signature-pad-col');
    createSignaturePad({ containerElem: signatureContainer });

    // Create buttons
    createRowActionButtons({ formElem, formColumns: form.columns });
    createShareInvoiceButton({ signatureContainer });
    createSubmitButton();

    return formElem;
}

const handleKeyUp = () => updateMoneyFields();

const handleKeyDown = ({ e, formElem, formColumns }) => {
    const lastRow = getLastRowElement({ formElem });
    const lastRowFocused = isFocusingLastRow({ lastRow, currentElement: e.srcElement });

    if (e.key === "Tab" && lastRowFocused) {
        const lastRowHasAmount = lastRowHasMoneyAmount({ lastRow });
        const tabbedInLastCellOfLastRow = (!e.shiftKey && (e.srcElement.name === 'cost'));
        const shiftTabbedInFirstCellOfLastRow = (e.shiftKey && (e.srcElement.name === 'title'));

        if (tabbedInLastCellOfLastRow) {
            if (lastRowHasAmount) {
                formComponents.create.row({ formElem, columns: formColumns, isHeader: false });
                updateMoneyFields();
            } else {
                e.preventDefault();
            }
        } else if (shiftTabbedInFirstCellOfLastRow && !lastRowHasAmount) {
            deleteRow({ formElem });
            updateMoneyFields();
        }
    }
}

const createRowActionButtons = ({ formElem, formColumns }) => {
    dom.select.actionButtons().appendChild(
        createButtonsGroupForRowActions({
            buttons: [
                buttonComponents.create.buttonPrimary({
                    name: 'Append New Line-Item',
                    onClick: () => {
                        formComponents.create.row({ formElem, columns: formColumns, isHeader: false });
                        updateMoneyFields();
                    },
                }),
                buttonComponents.create.buttonSecondary({
                    name: 'Delete Last Line-Item',
                    onClick:  () => {
                        deleteRow({ formElem });
                        updateMoneyFields();
                    },
                })
            ]
        })
    );
}

const createShareInvoiceButton = ({ signatureContainer }) => {
    dom.select.shareInvoiceButton().appendChild(
        createButtonsGroupForRowActions({
            buttons: [
                (() => {
                    let invoiceReturned = false;
                    const button = buttonComponents.create.buttonSuccess({
                        name: 'Share Invoice',
                        onClick: function() {
                            const notSigned = (
                                this.textContent === 'Return Invoice' &&
                                dom.select.signatureButtonText().textContent === 'Sign Here'
                            );
                            if (notSigned) {
                                alert('You must sign the invoice before you can return it!');
                            } else {
                                styleSignaturePad({
                                    signatureContainer,
                                    signaturePad: dom.select.signaturePad(),
                                    invoiceReturned
                                });
                                if (!invoiceReturned) {
                                    invoiceReturned = true;
                                }
                                alert('Invoice Shared!');
                                this.textContent = 'Return Invoice';
                                scrollToBottomOfPage();
                            }
                        },
                    });
                    button.style.display = 'none';
                    return button;
                })()
            ]
        })
    );
}

const scrollToBottomOfPage = () => window.scrollTo(0,document.body.scrollHeight);

const styleSignaturePad = ({ signatureContainer, signaturePad, invoiceReturned }) => {
    signatureContainer.style.display = 'initial';
    signaturePad.style.outline = '3px solid rgb(181, 187, 193, 0.5)';
    if (invoiceReturned) {
        dom.select.signatureButton().disabled = true;
        signaturePad.style.pointerEvents = 'none';
    } else {
        signatureContainer.style.display = 'initial';
        signaturePad.setAttribute('data-init', 'false');
    }
    dom.select.signatureButton().style.display = 'initial';
}

const createSubmitButton = () => {
    const submitButtonCol = dom.select.submitButtonCol()
    const submitButtonContainer = document.getElementById('submit-button');
    const submitButton = buttonComponents.create.buttonSubmit({
        text: 'Save',
        onClick: () => {
            submitButtonCol.style.display = 'none';
            showShareInvoiceButton();
            disableRowActionButtons();
            disableFields();
            scrollToBottomOfPage();
        }
    });
    submitButtonContainer.appendChild(submitButton);
}

export const disableFields = () => {
    const formControls = Array.from(document.querySelectorAll('.form-control'));
    formControls.forEach((formControl) => {
        formControl.setAttribute('readonly', 'true');
        formControl.setAttribute('disabled', true);
    });
}

export const disableRowActionButtons = () => {
    Array.from(dom.select.actionButtons().querySelectorAll('button')).forEach((button) => {
        button.disabled = true;
        button.setAttribute('pointer-events', 'none');
    });
}

export const showShareInvoiceButton = () => {
    dom.select.shareInvoiceButton().querySelector('button').style.display = 'initial';
}

export const createButtonsGroupForRowActions = ({ buttons = [] }) => {
    return buttons.reduce((buttonGroup, curr) => {
        if (buttonGroup) {
            buttonGroup.appendChild(curr);
        }
        return buttonGroup;
    }, buttonComponents.create.buttonGroup())
}

export const createSignaturePad = ({ containerElem }) => {
    containerElem.style.display = 'none';
    const canvas = dom.select.signaturePad();
    const button = document.getElementById('signature-button');
    const sigButtonText = dom.select.signatureButtonText();
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)',
        velocityFilterWeight: 0.7,
        minWidth: 0.5,
        maxWidth: 2.5,
        throttle: 16,
        minPointDistance: 3,
        onBegin: () => {
            button.classList.remove('disabled');
            canvas.style.outline = '2px solid #28a745';
            canvas.setAttribute('data-init', 'true');
            sigButtonText.textContent = 'Clear Signature';
        }
    });
    button.addEventListener('click', function(e) {
        signaturePad.clear();
        sigButtonText.textContent = 'Sign Here';
    });
}

export const aggregateAmounts = ({ rows = [] }) => {
    console.log(rows);
    return rows.reduce((prev, curr) => {
        if (prev) {
            const cost = currency(curr.querySelector(`input[name="cost"]`).value);
            const quantity = currency(curr.querySelector(`input[name="quantity"]`).value);
            const amountElem = curr.querySelector(`input[name="amount"]`);

            if (cost && quantity && amountElem) {
                amountElem.value = currency(currency(cost).multiply(quantity), { formatWithSymbol: true }).format();

                prev.push(cost.multiply(quantity));
            }
        }
        return prev;
    }, []);
}

export const updateMoneyFields = () => {
    const rowElems = document.querySelectorAll('.form-row');
    if (rowElems) {
        const rows = Array.from(rowElems);

        const amounts = aggregateAmounts({ rows });
        if (amounts.length > 0) {
            const subTotal = calculateSubTotal({ amounts });
            dom.select.subTotal().textContent = currency(subTotal, { formatWithSymbol: true }).format();

            const tax = calculateTax({ subTotal });
            dom.select.tax().textContent = currency(tax, { formatWithSymbol: true }).format();

            const total = calculateTotal({ subTotal, tax });
            dom.select.total().textContent = currency(total, { formatWithSymbol: true }).format();
        }
    }
}

export const isFocusingLastRow = ({ lastRow, currentElement }) => lastRow.contains(currentElement);

export const lastRowHasMoneyAmount = ({ lastRow }) => {
    const lastRowAmount = lastRow.querySelector(`.form-control[name="amount"]`);
    return (currency(lastRowAmount.value).intValue !== 0);
}

export const getLastRowElement = ({ formElem }) => {
    const formRows = formElem.getElementsByClassName('form-row');
    return formRows[formRows.length - 1];
}

export const deleteRow = ({ formElem }) => {
    const rows = formElem.querySelectorAll('.form-row');
    if (rows.length > 1) {
        rows[rows.length - 1].remove();
    }
}

export const calculateSubTotal = ({ amounts = [] }) => {
    return amounts.reduce((prev, curr) => {
        return currency(prev).add(currency(curr));
    }, 0)
}

export const calculateTax = ({ subTotal }) => {
    console.log(dom.select.taxRate());
    const taxRate = (currency(dom.select.taxRate().value) / 100);
    return currency(subTotal).multiply(taxRate);
}

export const calculateTotal = ({ subTotal, tax })  => {
    return currency(subTotal).add(currency(tax));
}
