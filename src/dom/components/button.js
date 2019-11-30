import { dom, addClasses } from "../../dom";

export const components = {
    create: {
        buttonPrimary: ({ name, onClick }) => elements.create.button({
            name,
            onClick,
            classes: dom.styles.form.buttonPrimary,
        }),
        buttonSecondary: ({ name, onClick }) => elements.create.button({
            name,
            onClick,
            classes: dom.styles.form.buttonSecondary,
        }),
        buttonSuccess: ({ name, onClick }) => elements.create.button({
            name,
            onClick,
            classes: dom.styles.form.buttonSuccess,
        }),
        buttonSubmit: ({ text, onClick }) => {
            const button = elements.create.button({
                name: text,
                onClick,
                classes: dom.styles.form.buttonPrimary,
            });
            button.type = 'submit';
            return button;
        },
        buttonGroup: () => elements.create.buttonGroup()
    }
}

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