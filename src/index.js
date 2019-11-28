import '../public/css/main.css';
import { dom } from './dom';
import { applyAutoHeight } from './autoheight_helper';
import { exampleData } from './dom/example_data';
import {
    createCompanyDetails,
    createBillingInfo,
    createCustomerDetails,
    createDescription,
    createBillingAmounts,
    createForm
} from './dom/invoice';

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

// toggle control-label and sr-only for responsive form
// <label class="sr-only" for="inlineFormInputGroup">Amount</label>
// <label class="control-label" for="inlineFormInputGroup">Amount</label>

// create class for fields that will be calculated
// hide rows instead of deleting them (if someone wants to undo a deleted row)
// save all data in local storage onbeforeunload(),  retrieve and populate on page load


populateInvoice({ data: exampleData });

bootstrapValidate(
    '#cost',
    'numeric:Please only enter numeric characters!'
);

bootstrapValidate(
    '#tax',
    'numeric:Please only enter numeric characters!'
);

bootstrapValidate(
    '#total',
);

bootstrapValidate(
    '#quantity',
    'integer:Please fill out this input field!',
    'numeric:Please only enter numeric characters!'
);
