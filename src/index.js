import '../public/css/main.css';
import '../src/styles/responsive_table.less';
import { dom } from './dom';
import { createTable } from './dom/table';
import { applyAutoHeight } from './autoheight_helper';
import { exampleData } from './dom/example_data';
import {
    createCompanyDetails,
    createBillingInfo,
    createCustomerDetails,
    createDescription,
    createBillingAmounts
} from './dom/invoice';

const handlers = {
    companyDetails: (data) => createCompanyDetails(data),
    billingInfo: (data) => createBillingInfo(data),
    customerDetails: (data) => createCustomerDetails(data),
    description: (data) => applyAutoHeight({ element: createDescription(data) }),
    table: (data) => {
        console.log(data);
        return createTable(data);
    },
    billingAmounts: (data) => createBillingAmounts(data)
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
    // dom.select.companyDetails().appendChild(createCompanyDetails(data));
    // dom.select.billingInfo().appendChild(createBillingInfo(data));
    // dom.select.customerDetails().appendChild(createCustomerDetails(data));
    // dom.select.description().appendChild(
    //     applyAutoHeight({ element: createDescription(data) })
    // );
    // dom.select.table().appendChild(createTable(data));
    // dom.select.billingAmounts().appendChild(createBillingAmounts(data));
}

populateInvoice({ data: exampleData });