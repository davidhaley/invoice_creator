import { dom, addClasses } from "../../dom";
import { applyAutoHeight } from "../../autoheight_helper";

export const components = {
    create: {
        form: ({ onKeyUp, onKeyDown }) => {
            const form = document.createElement('form');

            if (onKeyUp) form.addEventListener('keyup', onKeyUp);
            if (onKeyDown) form.addEventListener('keydown', onKeyDown);

            return form;
        },
        row: ({ formElem, columns, isHeader = false }) => {
            const formRow = elements.create.formRow();
            formElem.append(formRow);
            return Object.values(columns).reduce((row, field) => {
                if (row)  {
                    const column = createColumn({ field });
                    const label = createLabel({ field, isHeader });
                    const inputGroup = createInputGroup({ field });

                    row.appendChild(column);
                    column.appendChild(label);
                    column.appendChild(inputGroup);

                    return row;
                }
            }, formRow);
        },
        taxRateInput: ({ taxRateInput, onKeyUp, onKeyDown }) => {

            const inputGroup = addClasses({
                classes: [],
                elem: elements.create.inputGroup()
            });

            const prependTextGroup = addClasses({
                classes: dom.styles.form.inputGroup,
                elem: document.createElement('div')
            });

            const prependText = addClasses({
                classes: dom.styles.form.inputGroupPrependText,
                elem: document.createElement('div')
            });
            prependText.textContent = taxRateInput.description;

            const input = elements.create.input(taxRateInput);
            input.id = taxRateInput.id;

            if (taxRateInput.onCreate) taxRateInput.onCreate(input);
            if (onKeyUp) input.addEventListener('keyup', onKeyUp);
            if (onKeyDown) input.addEventListener('keydown', onKeyDown);

            prependTextGroup.appendChild(prependText);
            inputGroup.appendChild(prependTextGroup);
            inputGroup.appendChild(input);

            return inputGroup;
        },
        finalAuthAndPOInput: ({ taxRateInput, onKeyUp, onKeyDown }) => {
            const input = components.create.taxRateInput({ taxRateInput, onKeyUp, onKeyDown });
            input.classList.add('mb-4');
            return input;
        }
    }
}

const createColumn = ({ field }) => {
    return elements.create.column({
        classes: field.name === 'description' ? dom.styles.form.colWide : dom.styles.form.col
    });
}
const createLabel = ({ field, isHeader }) => {
    let label;
    if (isHeader) {
        label = elements.create.label({
            name: field.name,
            id: `${field.id}-label`,
            classes: []
        });
    } else {
        label = elements.create.label({
            name: field.name,
            id: `${field.id}-label`,
            classes: ['hide']
        });
    }
    return label;
}
const createInputGroup = ({ field }) => {
    const inputGroup = addClasses({
        classes: [
            ...dom.styles.form.inputGroup,
            ...dom.styles.form.inputGroupPrepend
        ],
        elem: elements.create.inputGroup()
    });
    const prependTextGroup = addClasses({
        classes: dom.styles.form.inputGroupPrependTextGroup,
        elem: document.createElement('div')
    });
    prependTextGroup.style.minWidth = '43%';

    const prependText = addClasses({
        classes: dom.styles.form.inputGroupPrependText,
        elem: document.createElement('div')
    });
    prependText.textContent = field.name;

    prependTextGroup.appendChild(prependText);
    inputGroup.appendChild(prependTextGroup);

    let input;
    if ((field.type === 'text') && (field.name !== 'amount')) {
        input = applyAutoHeight({
            element: elements.create.textArea({
                rows: '1',
                ...field
            })
        });
    } else {
        input = elements.create.input(field);
    }

    input.id = field.id

    if (field.onCreate) field.onCreate(input);

    inputGroup.appendChild(input);

    return inputGroup;
}

export const elements = {
    create: {
        headerField: ({ name }) => {
            const elem = addClasses({
                classes: dom.styles.form.header,
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
            elem.appendChild(formGroup);

            return elem;
        },
        input: ({ placeholder, type, name, step, value }) => {

            let input = addClasses({
                classes: dom.styles.form.input,
                elem: document.createElement('input')
            });
            input.placeholder = placeholder;
            input.type = type;
            input.name = name;
            input.step = step;

            if (value) {
                input.value = value;
            }

            if (name === 'amount') {
                input.setAttribute('readonly', true);
                input.disabled = true;
            }

            return input;
        },
        label: ({ name, id, classes }) => {
            const label = addClasses({
                classes: [
                    ...dom.styles.form.label,
                    ...classes
                ],
                elem: document.createElement('label')
            });
            label.id = id;
            label.for = id;

            const labelText = addClasses({
                classes: [
                    ...dom.styles.form.labelText,
                    ...classes
                ],
                elem: document.createElement('div')
            });
            labelText.textContent = name;

            label.appendChild(labelText);

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
        textArea: ({ rows, placeholder, name, value }) => {
            const elem = addClasses({
                classes: dom.styles.form.textArea,
                elem: document.createElement('textarea')
            });
            elem.rows = rows;
            elem.placeholder = placeholder;
            if (value) {
                elem.value = value;
            }
            elem.name = name;

            return elem;
        },
        footer: () => {
            const elem = document.createElement('div');
            elem.id = 'form-footer';
            return elem;
        },
    }
}