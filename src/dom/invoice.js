import { dom } from "../dom";
import { components as fieldComponents } from './components/fields';
import { components as textAreaComponents } from './components/textarea';
import { components as tableComponents } from "./components/table";
import { components as buttonComponents } from "./components/button";

export const createBillingAmounts = ({ billingAmounts }) => fieldComponents.create.fieldGroup({ fields: billingAmounts });
export const createBillingInfo = ({ billingInfo }) => fieldComponents.create.fieldGroup({ fields: billingInfo });
export const createCompanyDetails = ({ companyDetails }) => fieldComponents.create.fieldGroup({ fields: companyDetails });
export const createCustomerDetails = ({ customerDetails }) => fieldComponents.create.fieldGroup({ fields: customerDetails });
export const createDescription = ({ description }) => textAreaComponents.create.textArea({ labelText: 'Description', textContent: description });


export const createTable = ({ table }) => {

    const tableElem = tableComponents.create.table();


    tableComponents.create.headerRow({
        tableElem,
        columns: table.columns
    });
    addRow({ tableElem, columns: table.columns });


    const actionButtonsContainer = dom.select.actionButtons().appendChild(
        buttonComponents.create.buttonGroup()
    );

    actionButtonsContainer.appendChild(
        buttonComponents.create.button({
            name: 'Delete Line-Item',
            onClick: () => () => deleteRow({
                tableElem,
                columns: table.columns
            }),
        })
    );

    actionButtonsContainer.appendChild(
        buttonComponents.create.button({
            name: 'Add Line-Item',
            onClick: () => addRow({
                tableElem,
                columns: table.columns
            }),
        })
    );

    // Optional: populate with data
    // console.log(getTableRows({ table, startIndex: 1, columnsCount: columns: table.columns.length }));

    return tableElem;
}

const onRowChanged = () => {
    // add disabled to delete row if row is 1
}

const addRow = ({ tableElem, columns }) => tableComponents.create.row({ tableElem, columns });

const deleteRow = ({ tableElem, columns }) => {

}

const getTableRows = ({ tableElem, columnsCount, startIndex = 1, endIndex }) => {
    if (startIndex < 1) {
        startIndex = 1;
    }
    if (!endIndex || endIndex > columnsCount) {
        endIndex = columnsCount;
    }
    const cells = dom.select.tableCells(tableElem);
    const start = (startIndex * columnsCount); // cell count per column * rows
    return [...cells ].slice(start, cells.length);
}

const addClasses = ({ classes, elem }) => {
    for (const className of classes)  {
        elem.classList.add(className);
    }
    return elem;
}