import { components } from "./components/table";
import { dom } from "../dom";


export const createTable = ({ tableData }) => {

    const table = components.create.table();

    const columns = [
        {
            name: 'Title',
            required: true,
            placeholder: '',
            data: null,
            fieldType: String,
            inputType: 'text'
        },
        {
            name: 'Description',
            required: true,
            placeholder: '',
            data: null,
            fieldType: String,
            inputType: 'text'
        },
        {
            name: 'Quantity',
            required: true,
            placeholder: '',
            data: null,
            fieldType: Number,
            inputType: 'number'
        },
        {
            name: 'Type',
            required: true,
            placeholder: '',
            data: null,
            fieldType: Array,
            inputType: 'radio',
            values: [
                'Part',
                'Labour'
            ]
        },
        {
            name: 'Cost Rate ($/Units)',
            required: true,
            placeholder: '',
            data: null,
            fieldType: Number,
            inputType: 'number'
        },
        {
            name: 'Amount',
            required: true,
            placeholder: '',
            data: null,
            fieldType: Number,
            inputType: 'number'
        },
    ];


    components.create.headerRow({ table, columns });
    addRow({ table, columns });


    // ADD ROW

    const addRowButton = addClasses({
        classes: [ 'btn',  'btn-primary'],
        elem: document.createElement('button')
    });

    addRowButton.textContent = 'Add Line-Item';

    addRowButton.onclick = (e) => addRow({ table, columns });
    // document.querySelector('#button-add-line-item').appendChild(addRowButton);



    // DELETE ROW

    const deleteRowButton = addClasses({
        classes: [ 'btn',  'btn-secondary'],
        elem: document.createElement('button')
    });

    deleteRowButton.style.margin = '0 10px 0 0';
    deleteRowButton.textContent = 'Delete Line-Item';

    deleteRowButton.onclick = (e) => deleteRow({ table, columns });
    // document.querySelector('#button-delete-line-item').appendChild(deleteRowButton);


    const actionButtonsContainer = document.querySelector('#table-action-buttons');
    actionButtonsContainer.classList.add('btn-group');

    actionButtonsContainer.appendChild(deleteRowButton);
    actionButtonsContainer.appendChild(addRowButton);

    // Optional: populate with data
    // console.log(getTableRows({ table, startIndex: 1, columnsCount: columns.length }));

    return table;
}

const onRowChanged = () => {
    // add disabled to delete row if row is 1
}

const addRow = ({ table, columns }) => components.create.row({ table, columns });

const deleteRow = ({ table, columns }) => {

}

const getTableRows = ({ table, columnsCount, startIndex = 1, endIndex }) => {
    if (startIndex < 1) {
        startIndex = 1;
    }
    if (!endIndex || endIndex > columnsCount) {
        endIndex = columnsCount;
    }
    const cells = dom.select.tableCells(table);
    const start = (startIndex * columnsCount); // cell count per column * rows
    return [...cells ].slice(start, cells.length);
}

const addClasses = ({ classes, elem }) => {
    for (const className of classes)  {
        elem.classList.add(className);
    }
    return elem;
}