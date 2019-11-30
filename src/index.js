import '../public/css/main.css';
import '../public/css/signature_pad.css';
import { dom } from './dom';
import { applyAutoHeight } from './autoheight_helper';
import './dom/components/signature_pad';
import { exampleData } from './dom/example_data';
import {
    createCompanyDetails,
    createBillingInfo,
    createCustomerDetails,
    createDescription,
    createBillingAmounts,
    createForm,
} from './dom/invoice';

// import * as bootstrapValidate from 'bootstrap-validate';
// window.bootstrapValidate = bootstrapValidate;

const handlers = {
    billingAmounts:     (data) => createBillingAmounts(data),
    billingInfo:        (data) => createBillingInfo(data),
    companyDetails:     (data) => createCompanyDetails(data),
    customerDetails:    (data) => createCustomerDetails(data),
    description:        (data) => applyAutoHeight({ element: createDescription(data) }),
    form:               (data) => createForm(data)
}

const populateInvoice = ({ data }) => {
    for (const [domContainerKey, domContainerSelectorFn] of Object.entries(dom.select)) {
        if (Object.keys(handlers).includes(domContainerKey)) {
            const containerElement = domContainerSelectorFn();
            const outputElement = handlers[domContainerKey](data);
            if (containerElement && outputElement) {
                containerElement.appendChild(outputElement);
            }
        }
    }
}

// separate form structure from form data
// only add next row if there is no next row, or there is a next row but it's filled in
// add tax rate input field, update amounts
// format cost/amount fields after unfocusing a cell, format the money to two decimal places
// format text field (shrink) after unfocusing a celll
// hide rows instead of deleting them (if someone wants to undo a deleted row)
// save all data in local storage onbeforeunload(),  retrieve and populate on page load


populateInvoice({ data: exampleData });

[
    exampleData.form.taxRateInput,
    exampleData.form.columns.quantity,
    exampleData.form.columns.cost,
].forEach((field) => field.validate());

