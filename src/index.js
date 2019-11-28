import '../public/css/main.css';
import '../src/styles/responsive_table.less';
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
    form:              (data) => {
        const form = createForm(data);

        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn-primary');
        btn.type = 'submit';
        btn.textContent = 'Submit Form';
        form.appendChild(btn)

        return form;
    },
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

populateInvoice({ data: exampleData });

// bootstrapValidate(
//     '#exampleFormControlTextarea1',
//     'email:Enter a valid E-Mail Address!'
// );