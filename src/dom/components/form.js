import { dom, addClasses } from "../../dom";
import { applyAutoHeight } from "../../autoheight_helper";

const elements = {
    create: {
        headerField: ({ name }) => {
            const elem = addClasses({
                classes: dom.styles.form.headerCell,
                elem: document.createElement('div')
            });
            elem.textContent = name;
            return elem;
        },
        field: ({ input }) => {
            const elem = addClasses({
                classes: dom.styles.form.cell,
                elem: document.createElement('div')
            });

            // const row = addClasses({
            //     classes: dom.styles.form.bootStrapRow,
            //     elem: document.createElement('div')
            // });

            const formGroup = addClasses({
                classes: dom.styles.form.formGroup,
                elem: document.createElement('div')
            });

            const form = addClasses({
                classes: dom.styles.form.form,
                elem: document.createElement('form')
            });

            form.appendChild(input);
            formGroup.appendChild(form);
            // row.appendChild(formGroup);
            elem.appendChild(formGroup);

            return elem;
        },
        input: ({ id, placeholderText, inputType, name, step }) => {
            const input = addClasses({
                classes: dom.styles.form.input,
                elem: document.createElement('input')
            });
            input.id = id;
            input.placeholder = placeholderText;
            input.type = inputType;
            input.name = name;
            input.step = step;
            input.value = "0";

            if (name === 'amount') {
                input.setAttribute('readonly', true);
                input.disabled = true;
            }

            return input;
        },
        label: ({ name, id }) => {
            // const elem = document.createElement('label');
            // elem.setAttribute('for', radioOptionName);
            // elem.textContent = radioOptionName;

            // return elem;

            const label = addClasses({
                classes: dom.styles.form.label,
                elem: document.createElement('label')
            });
            label.id = id;
            label.for = id;
            label.textContent = name;

            return label;
        },
        column: ({ classes }) => {
            return addClasses({
                classes,
                elem: document.createElement('div')
            });
        },
        formRow: () => {
            return addClasses({
                classes: dom.styles.form.formRow,
                elem: document.createElement('div')
            });
        },
        inputGroup: () => {
            return addClasses({
                classes: dom.styles.form.inputGroup,
                elem: document.createElement('div')
            });
        },
        textArea: ({ rows, placeholder }) => {
            const elem = addClasses({
                classes: dom.styles.form.textArea,
                elem: document.createElement('textarea')
            });
            elem.rows = rows;
            elem.placeholder = placeholder;

            return elem;
        },
        footer: () => {
            const elem = document.createElement('div');
            elem.id = 'form-footer';
            return elem;
        }
    }
}

export const components = {
    create: {
        form: () => {
            return document.createElement('form');
        },
        headerRow: ({ formElem, columns }) => {
            const formRow = elements.create.formRow();
            formElem.append(formRow);
            return columns.reduce((row, curr) => {
                if (row)  {

                    const column = elements.create.column({
                        classes: curr.name === 'Description' ? dom.styles.form.col2 : dom.styles.form.col1
                    });
                    const label = elements.create.label({
                        name: curr.name,
                        id: curr.id,
                    });
                    const inputGroup = elements.create.inputGroup();

                    let input;
                    if (curr.inputType === 'text') {
                        input = applyAutoHeight({
                            element: elements.create.textArea({
                                rows: '1',
                                placeholder: curr.placeholder
                            })
                        });
                    } else {
                        input = elements.create.input({
                            placeholderText: curr.placeholder,
                            inputType: curr.inputType,
                            id: curr.field,
                            name: curr.field,
                            step: curr.step
                        });
                    }

                    row.appendChild(column);
                    column.appendChild(label);
                    column.appendChild(inputGroup);
                    inputGroup.appendChild(input);

                    return row;

                    // const headerCell = elements.create.headerField({ name: curr.name });
                    // form.appendChild(headerCell);
                }
            }, formRow);
        },
        row: ({ formElem, columns }) => {
            const formRow = elements.create.formRow();
            formElem.append(formRow);
            return columns.reduce((row, curr) => {
                if (row)  {

                    const column = elements.create.column({
                        classes: curr.name === 'Description' ? dom.styles.form.col2 : dom.styles.form.col1
                    });
                    const inputGroup = elements.create.inputGroup();

                    let input;
                    if (curr.inputType === 'text') {
                        input = applyAutoHeight({
                            element: elements.create.textArea({
                                rows: '1',
                                placeholder: curr.placeholder
                            })
                        });
                    } else {
                        input = elements.create.input({
                            id: curr.id,
                            placeholderText: curr.placeholder,
                            inputType: curr.inputType,
                            name: curr.field,
                            step: curr.step
                        });
                    }

                    row.appendChild(column);
                    column.appendChild(inputGroup);
                    inputGroup.appendChild(input);

                    return row;
                }
            }, formRow);
        },
    }
}
