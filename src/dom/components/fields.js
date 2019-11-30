import { dom, addClasses } from "../../dom";

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
                        fieldValue: elements.create.fieldValue({ value: curr.value, id: curr.id }),
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
        fieldValue: ({ id, value }) => {
            const elem = addClasses({
                classes: dom.styles.fieldGroup.fieldValue,
                elem: document.createElement('div')
            });
            elem.id = id;
            elem.textContent = value;

            return elem;
        },
    }
}