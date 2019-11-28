import { dom } from "../dom";
import { components as fieldComponents } from './components/fields';
import { components as textAreaComponents } from './components/textarea';
import { components as formComponents } from "./components/form";
import { components as buttonComponents } from "./components/button";

export const createBillingAmounts = ({ billingAmounts }) => fieldComponents.create.fieldGroup({ fields: billingAmounts });
export const createBillingInfo = ({ billingInfo }) => fieldComponents.create.fieldGroup({ fields: billingInfo });
export const createCompanyDetails = ({ companyDetails }) => fieldComponents.create.fieldGroup({ fields: companyDetails });
export const createCustomerDetails = ({ customerDetails }) => fieldComponents.create.fieldGroup({ fields: customerDetails });
export const createDescription = ({ description }) => textAreaComponents.create.textArea({ labelText: 'Description', textContent: description });


export const createForm = ({ form }) => {

    const formElem = formComponents.create.form();

    formComponents.create.headerRow({ formElem, columns: form.columns });

    const actionButtonsContainer = dom.select.actionButtons().appendChild(
        buttonComponents.create.buttonGroup()
    );

    actionButtonsContainer.appendChild(
        buttonComponents.create.buttonSecondary({
            name: 'Delete Line-Item',
            onClick: () => () => deleteRow({
                formElem,
                columns: form.columns
            }),
        })
    );

    actionButtonsContainer.appendChild(
        buttonComponents.create.buttonPrimary({
            name: 'Add Line-Item',
            onClick: () => addRow({
                formElem,
                columns: form.columns
            }),
        })
    );

    // Optional: populate with data
    // console.log(getFormRows({ form, startIndex: 1, columnsCount: columns: form.columns.length }));

    return formElem;
}

const onRowChanged = () => {
    // add disabled to delete row if row is 1
}

const addRow = ({ formElem, columns }) => formComponents.create.row({ formElem, columns });

const deleteRow = ({ formElem, columns }) => {

}

const getFormRows = ({ formElem, columnsCount, startIndex = 1, endIndex }) => {
    if (startIndex < 1) {
        startIndex = 1;
    }
    if (!endIndex || endIndex > columnsCount) {
        endIndex = columnsCount;
    }
    const cells = dom.select.tableCells(formElem);
    const start = (startIndex * columnsCount); // cell count per column * rows
    return [...cells ].slice(start, cells.length);
}
