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
populateInvoice({ data: exampleData });

[
    exampleData.form.taxRateInput,
    exampleData.form.columns.quantity,
    exampleData.form.columns.cost,
].forEach((field) => field.validate());

