import { dom, addClasses } from "../../dom";

const elements = {
    create: {
        button: ({ name, onClick, classes }) => {
            const elem = addClasses({
                classes,
                elem: document.createElement('button')
            });
            elem.textContent = name;
            elem.onclick = onClick;
            return elem;
        },
        buttonGroup: () => {
            return addClasses({
                classes: dom.styles.form.buttonGroup,
                elem: document.createElement('div')
            });
        },
    }
}

export const components = {
    create: {
        buttonPrimary: ({ name, onClick }) => elements.create.button({
            name,
            onClick,
            classes: dom.styles.form.buttonPrimary
        }),
        buttonSecondary: ({ name, onClick }) => elements.create.button({
            name,
            onClick,
            classes: dom.styles.form.buttonSecondary
        }),
        buttonGroup: () => elements.create.buttonGroup()
    }
}
