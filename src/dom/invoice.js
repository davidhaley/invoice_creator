import { dom } from "../dom";
import { components as fieldComponents } from './components/fields';
import { components as textAreaComponents } from './components/textarea';
import { components as formComponents } from "./components/form";
import { components as buttonComponents } from "./components/button";

export const createBillingAmounts = ({ billingAmounts }) => fieldComponents.create.fieldGroup({ fields: billingAmounts });
export const createBillingInfo = ({ billingInfo }) => fieldComponents.create.fieldGroup({ fields: billingInfo });
export const createCompanyDetails = ({ companyDetails }) => fieldComponents.create.fieldGroup({ fields: companyDetails });
export const createCustomerDetails = ({ customerDetails }) => fieldComponents.create.fieldGroup({ fields: customerDetails });
export const createDescription = ({ description }) => textAreaComponents.create.textArea({ labelText: 'Invoice Description', textContent: description });

export const createForm = ({ form }) => {

    const formElem = formComponents.create.form();
    formComponents.create.headerRow({ formElem, columns: form.columns });

    formElem.addEventListener('keyup', (e) => updateMoneyFields());
    formElem.addEventListener('keydown', (e) => {
        if (e.key === "Tab") {
            if (e.srcElement.name === "cost") {
                // TODO: and no next row, or next row and it's not empty
                formComponents.create.row({ formElem, columns: form.columns });
            }
        }
    });



    const buttonsGroupForRowActions = createButtonsGroupForRowActions({
        addRowFn: () => addRow({ formElem, columns: form.columns }),
        deleteRowFn: () => deleteRow({ formElem })
    });

    dom.select.actionButtons().appendChild(buttonsGroupForRowActions);

    return formElem;
}

const createButtonsGroupForRowActions = ({ addRowFn, deleteRowFn }) => {
    const rowActionsButtonsGroup = buttonComponents.create.buttonGroup();
    rowActionsButtonsGroup.appendChild(
        buttonComponents.create.buttonSecondary({
            name: 'Delete Line-Item',
            onClick: deleteRowFn,
        })
    );
    rowActionsButtonsGroup.appendChild(
        buttonComponents.create.buttonPrimary({
            name: 'Add Line-Item',
            onClick: addRowFn,
        })
    );
    return rowActionsButtonsGroup;
}

const aggregateAmounts = ({ rows = [] }) => {
    return rows.reduce((prev, curr) => {
        if (prev) {
            const cost = currency(curr.querySelector(`input[name="cost"]`).value);
            const quantity = currency(curr.querySelector(`input[name="quantity"]`).value);
            const amountElem = curr.querySelector(`input[name="amount"]`);

            console.log(`
            cost: ${cost},
            quantity: ${quantity},
            `)

            if (cost && quantity && amountElem) {
                amountElem.value = `$${currency(cost).multiply(quantity)}`;
                prev.push(cost.multiply(quantity));
            }
        }
        return prev;
    }, []);
}

const calculateSubTotal = ({ amounts = [] }) => {
    console.log(amounts);
    return amounts.reduce((prev, curr) => {
        return currency(prev).add(currency(curr));
    }, 0)
}

const calculateTax = ({ subTotal }) => {
    return currency(subTotal).multiply(currency(0.05));
}

const calculateTotal = ({ subTotal, tax })  => {
    return currency(subTotal).add(currency(tax));
}

const updateMoneyFields = () => {
    const rowElems = document.querySelectorAll('.form-row');
    if (rowElems) {
        const rows = Array.from(rowElems);

        const amounts = aggregateAmounts({ rows });
        // console.log(amounts);
        if (amounts.length > 0) {
            const subTotal = calculateSubTotal({ amounts });
            // console.log(subTotal);
            dom.select.subTotal().textContent = `$${subTotal}`;

            const tax = calculateTax({ subTotal });
            dom.select.tax().textContent = `$${tax}`;
            // console.log(tax);

            const total = calculateTotal({ subTotal, tax });
            dom.select.total().textContent = `$${total}`;
            // console.log(total);
        }
    }
}

const addRow = ({ formElem, columns }) => {
    formComponents.create.row({ formElem, columns });
    updateMoneyFields();
};

const deleteRow = ({ formElem }) => {
    console.log('hey');
    const rows = formElem.querySelectorAll('.form-row');
    console.log(rows);
    if (rows.length > 1) {
        rows[rows.length - 1].remove();
        updateMoneyFields();
    }
}
