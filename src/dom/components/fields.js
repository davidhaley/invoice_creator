import { dom, addClasses } from "../../dom";

const elements = {
    create: {
        fieldName: ({ name }) => {
            const elem = addClasses({
                classes: dom.styles.fieldGroup.fieldName,
                elem: document.createElement('div')
            });
            elem.textContent = name;

            return elem;
        },
        fieldValue: ({ value }) => {
            const elem = addClasses({
                classes: dom.styles.fieldGroup.fieldValue,
                elem: document.createElement('div')
            });
            elem.textContent = value;

            return elem;
        },
    }
}

export const components = {
    create: {
        fieldGroup: ({ fields }) => {

            const fieldGroupElem = addClasses({
                classes: dom.styles.fieldGroup.fieldGroup,
                elem: document.createElement('div')
            });

            const fieldElems = fields.reduce((prev, curr) => {
                if (prev)  {
                    const field = components.create.field({
                        fieldName: elements.create.fieldName({ name: curr.name }),
                        fieldValue: elements.create.fieldValue({ value: curr.value }),
                    });

                    prev.push(field);

                    return prev;
                }
            }, []);

            for (const fieldElem of fieldElems) {
                fieldGroupElem.appendChild(fieldElem);
            }

            return fieldGroupElem;
        },
        field: ({ fieldName, fieldValue }) => {
            const elem = addClasses({
                classes: dom.styles.fieldGroup.field,
                elem: document.createElement('div')
            });

            elem.appendChild(fieldName);
            elem.appendChild(fieldValue);

            return elem;
        }
    }
}
