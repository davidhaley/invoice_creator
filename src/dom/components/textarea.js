import { dom } from "../../dom";
import { exampleData } from "../example_data";

const elements = {
    create: {
        textArea: ({ textContent }) => {
            const elem = addClasses({
                classes: dom.styles.textArea.textArea,
                elem: document.createElement('textarea')
            });
            elem.setAttribute('rows', '1');
            elem.textContent = textContent || '';

            return elem;
        },
        label: ({ labelText }) => {
            const elem = document.createElement('label');
            elem.setAttribute('for', labelText.toLocaleLowerCase());
            elem.textContent = labelText;

            return elem;
        },
    }
}

export const components = {
    create: {
        textArea: ({ textContent, labelText }) => {

            const formGroup = addClasses({
                classes: dom.styles.textArea.formGroup,
                elem: document.createElement('div')
            });

            formGroup.appendChild(elements.create.label({ labelText }));
            formGroup.appendChild(elements.create.textArea({ textContent }));

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