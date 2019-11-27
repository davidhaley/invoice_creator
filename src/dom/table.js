import { components } from "./components/table";
import { dom } from "../dom";


export const createTable = ({ data = [] }) => {

    const table = components.create.table();

    const columns = [
        {
            name: 'Title',
            required: true,
            placeholder: '',
            data: null,
            fieldType: String
        },
        {
            name: 'Description',
            required: true,
            placeholder: '',
            data: null,
            fieldType: String
        },
        {
            name: 'Quantity',
            required: true,
            placeholder: '',
            data: null,
            fieldType: Number
        },
        {
            name: 'Type',
            required: true,
            placeholder: '',
            data: null,
            fieldType: Array
        },
        {
            name: 'Cost Rate ($/Units)',
            required: true,
            placeholder: '',
            data: null,
            fieldType: Number
        },
        {
            name: 'Amount',
            required: true,
            placeholder: '',
            data: null,
            fieldType: Number
        },
    ];


    components.create.headerRow({ table, columns });
    components.create.row({ table, columns });

    // Optional: populate with data
    // console.log(getTableRows({ table, startIndex: 1, columnsCount: columns.length }));

    return table;
}

const getTableRows = ({ table, startIndex = 1, columnsCount }) => {
    if (startIndex < 1) {
        startIndex = 1;
    }
    const cells = dom.select.tableCells({ table });
    const start = (startIndex * columnsCount); // cell count per column * rows
    return [...cells ].slice(start, cells.length);
}
