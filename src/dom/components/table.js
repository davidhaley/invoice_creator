import { dom, addClasses } from "../../dom";

const elements = {
    create: {
        headerCell: ({ name }) => {
            const elem = addClasses({
                classes: dom.styles.table.headerCell,
                elem: document.createElement('div')
            });
            elem.textContent = name;
            return elem;
        },
        cell: ({ input }) => {
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

            form.appendChild(input);
            formGroup.appendChild(form);
            row.appendChild(formGroup);
            elem.appendChild(row);

            return elem;
        },
        input: ({ placeholderText, inputType }) => {
            const input = addClasses({
                classes: dom.styles.table.input,
                elem: document.createElement('input')
            });
            input.style.width = '100%';
            input.placeholder = placeholderText;
            input.type = inputType;

            return input;
        },
        radioInput: ({ groupName, selectorName }) => {
            const input = addClasses({
                classes: dom.styles.table.input,
                elem: document.createElement('input')
            });
            input.type = 'radio';
            input.name = groupName;
            input.value = selectorName;

            return input;
        },
        radioContainer: () => {
            const elem = document.createElement('div');
            elem.style.display = 'contents';
            return elem;
        },
        label: ({ radioOptionName }) => {
            const elem = document.createElement('label');
            elem.setAttribute('for', radioOptionName);
            elem.textContent = radioOptionName;

            return elem;
        },
        column: () => {
            const elem = document.createElement('div')
            elem.classList.add('col');
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
        headerRow: ({ tableElem, columns }) => {
            return columns.reduce((table, curr) => {
                if (table)  {
                    const headerCell = elements.create.headerCell({ name: curr.name });
                    table.appendChild(headerCell);
                    return table;
                }
            }, tableElem);
        },
        row: ({ tableElem, columns }) => {
            return columns.reduce((table, curr) => {
                if (table)  {
                    if (curr.inputType === 'radio') {

                        const container = elements.create.radioContainer();
                        const radioColumns = createRadioColumns({ columnData: curr });

                        for (const column of radioColumns) {
                            container.appendChild(column);
                        }

                        table.appendChild(
                            elements.create.cell({ input: container })
                        );
                    } else {
                        const input = elements.create.input({
                            placeholderText: curr.placeholder,
                            inputType: curr.inputType
                        });

                        table.appendChild(
                            elements.create.cell({ input })
                        );
                    }

                    return table;
                }
            }, tableElem);
        }
    }
}

const createRadioColumns = ({ columnData }) => {
    return columnData.values.reduce((prev, radioOptionName) => {
        if (prev) {

            const col = elements.create.column();

            col.appendChild(
                elements.create.radioInput({
                    groupName: columnData.name,
                    selectorName: radioOptionName
                }),
            );

            col.appendChild(
                elements.create.label({ radioOptionName })
            );

            prev.push(col);
        }
        return prev;
    }, []);
}
