import { dom, addClasses } from "../../dom";
import { formConfig } from "../../form_config";

const elements = {
    create: {
        textArea: ({ textContent }) => {
            const elem = addClasses({
                classes: dom.styles.textArea.textArea,
                elem: document.createElement('textarea')
            });
            elem.setAttribute('rows', '1');
            elem.style.minHeight = formConfig.invoiceDescription.minHeight;
            elem.style.maxHeight = formConfig.invoiceDescription.maxHeight;
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
