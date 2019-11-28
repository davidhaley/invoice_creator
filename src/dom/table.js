import { components } from "./components/table";
import { dom } from "../dom";


export const createTable = ({ table }) => {

    const tableElem = components.create.table();

    components.create.headerRow({ tableElem, columns: table.columns });
    addRow({ tableElem, columns: table.columns });


    // ADD ROW

    const addRowButton = addClasses({
        classes: [ 'btn',  'btn-primary'],
        elem: document.createElement('button')
    });

    addRowButton.textContent = 'Add Line-Item';

    addRowButton.onclick = (e) => addRow({ tableElem, columns: table.columns });
    // document.querySelector('#button-add-line-item').appendChild(addRowButton);



    // DELETE ROW

    const deleteRowButton = addClasses({
        classes: [ 'btn',  'btn-secondary'],
        elem: document.createElement('button')
    });

    deleteRowButton.style.margin = '0 10px 0 0';
    deleteRowButton.textContent = 'Delete Line-Item';

    deleteRowButton.onclick = (e) => deleteRow({ tableElem, columns: table.columns });
    // document.querySelector('#button-delete-line-item').appendChild(deleteRowButton);


    const actionButtonsContainer = document.querySelector('#table-action-buttons');
    actionButtonsContainer.classList.add('btn-group');

    actionButtonsContainer.appendChild(deleteRowButton);
    actionButtonsContainer.appendChild(addRowButton);

    // Optional: populate with data
    // console.log(getTableRows({ table, startIndex: 1, columnsCount: columns: table.columns.length }));

    return tableElem;
}

const onRowChanged = () => {
    // add disabled to delete row if row is 1
}

const addRow = ({ tableElem, columns }) => components.create.row({ tableElem, columns });

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