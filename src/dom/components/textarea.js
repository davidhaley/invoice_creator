import { dom } from "../../dom";

const elements = {
    create: {
        textArea: () => {
            const elem = addClasses({
                classes: dom.styles.textArea.textArea,
                elem: document.createElement('textarea')
            });
            elem.id = 'description';
            elem.setAttribute('rows', '1');

            return elem;
        },
        label: ({ labelText }) => {
            const elem = document.createElement('label');
            elem.setAttribute('for', 'description');
            elem.textContent = labelText;

            return elem;
        },
    }
}

export const components = {
    create: {
        textArea: ({ labelText }) => {

            const formGroup = addClasses({
                classes: dom.styles.textArea.formGroup,
                elem: document.createElement('div')
            });

            formGroup.appendChild(elements.create.label({ labelText }));
            formGroup.appendChild(elements.create.textArea());

            return formGroup;
        },
    }
}


const addClasses = ({ classes, elem }) => {
    for (const className of classes)  {
        elem.classList.add(className);
    }
    return elem;
}