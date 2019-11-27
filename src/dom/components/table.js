import { dom } from "../../dom";

const elements = {
    create: {
        headerCell: () => {
            const elem = addClasses({
                classes: dom.styles.table.headerCell,
                elem: document.createElement('div')
            });
            return elem;
        },
        cell: ({ placeholderText }) => {
            const elem = addClasses({
                classes: dom.styles.table.cell,
                elem: document.createElement('div')
            });

            const row = addClasses({
                classes: dom.styles.table.bootStrapRow,
                elem: document.createElement('div')
            });

            const formGroup = addClasses({
                classes: dom.styles.table.formGroup,
                elem: document.createElement('div')
            });

            const form = addClasses({
                classes: dom.styles.table.form,
                elem: document.createElement('form')
            });

            const input = addClasses({
                classes: dom.styles.table.input,
                elem: document.createElement('input')
            });
            input.style.width = '100%';

            input.placeholder = placeholderText;

            form.appendChild(input);
            formGroup.appendChild(form);
            row.appendChild(formGroup);
            elem.appendChild(row);

            return elem;
        }
    }
}

export const components = {
    create: {
        table: () => {
            return addClasses({
                classes: dom.styles.table.table,
                elem: document.createElement('div')
            });
        },
        headerRow: ({ table, columns }) => {
            return columns.reduce((table, curr) => {
                if (table)  {
                    const headerCell = elements.create.headerCell();
                    headerCell.textContent = curr.name;
                    table.appendChild(headerCell);
                    return table;
                }
            }, table);
        },
        row: ({ table, columns }) => {
            return columns.reduce((table, curr) => {
                if (table)  {
                    const cell = elements.create.cell({ placeholderText: curr.placeholder });
                    table.appendChild(cell);
                    return table;
                }
            }, table);
        }
    }
}


const addClasses = ({ classes, elem }) => {
    for (const className of classes)  {
        elem.classList.add(className);
    }
    return elem;
}