import { dom } from "../dom";
import { components as fieldComponents } from './components/fields';
import { components as textAreaComponents } from './components/textarea';
import { components as formComponents } from "./components/form";
import { components as buttonComponents } from "./components/button";

export const createBillingAmounts = ({ billingAmounts }) => fieldComponents.create.fieldGroup({ fields: billingAmounts });
export const createBillingInfo = ({ billingInfo }) => fieldComponents.create.fieldGroup({ fields: billingInfo });
export const createCompanyDetails = ({ companyDetails }) => fieldComponents.create.fieldGroup({ fields: companyDetails });
export const createCustomerDetails = ({ customerDetails }) => fieldComponents.create.fieldGroup({ fields: customerDetails });
export const createDescription = ({ description }) => textAreaComponents.create.textArea({ labelText: 'Description', textContent: description });


export const createForm = ({ form }) => {

    const formElem = formComponents.create.form();

    formComponents.create.headerRow({ formElem, columns: form.columns });

    const actionButtonsContainer = dom.select.actionButtons().appendChild(
        buttonComponents.create.buttonGroup()
    );

    actionButtonsContainer.appendChild(
        buttonComponents.create.buttonSecondary({
            name: 'Delete Line-Item',
            onClick: () => deleteRow({ formElem }),
        })
    );

    actionButtonsContainer.appendChild(
        buttonComponents.create.buttonPrimary({
            name: 'Add Line-Item',
            onClick: () => addRow({
                formElem,
                columns: form.columns
            }),
        })
    );

    actionButtonsContainer.appendChild(
        buttonComponents.create.buttonSubmit()
    );

    formElem.addEventListener('keyup', (e) => updateMoneyFields());

    // Optional: populate with data
    // console.log(getFormRows({ form, startIndex: 1, columnsCount: columns: form.columns.length }));

    updateMoneyFields();

    return formElem;
}

const aggregateAmounts = ({ rows = [] }) => {
    return rows.reduce((prev, curr) => {
        if (prev) {
            const cost = curr.querySelector(`input[name="cost"]`);
            const quantity = curr.querySelector(`input[name="quantity"]`);
            const amount = curr.querySelector(`input[name="amount"]`);
            if (cost && quantity && amount) {
                amount.value = (cost.value * quantity.value);
                prev.push(amount.value);
            }
        }
        return prev;
    }, []);
}

const calculateSubTotal = ({ amounts = [] }) => {
    return amounts.reduce((prev, curr) => {
        if (prev) {
            return (parseInt(prev) + parseInt(curr));
        }
        return prev;
    }, [0])
}

const calculateTax = ({ subTotal }) => {
    return Math.floor(subTotal * 0.05);
}

const calculateTotal = ({ subTotal, tax })  => {
    return (parseInt(subTotal) + tax);
}

const updateMoneyFields = () => {
    const rowElems = document.querySelectorAll('.form-row');
    if (rowElems) {
        const rows = Array.from(rowElems);

        const amounts = aggregateAmounts({ rows });
        console.log(amounts);

        const subTotal = calculateSubTotal({ amounts });
        console.log(subTotal);
        dom.select.subTotal().textContent = `${subTotal}`;

        const tax = calculateTax({ subTotal });
        dom.select.tax().textContent = `${tax}`;
        console.log(tax);

        const total = calculateTotal({ subTotal, tax });
        dom.select.total().textContent = `${total}`;
        console.log(total);
    }
}

const addRow = ({ formElem, columns }) => formComponents.create.row({ formElem, columns });

const deleteRow = ({ formElem }) => {
    console.log('hey');
    const rows = formElem.querySelectorAll('.form-row');
    console.log(rows);
    if (rows.length > 1) {
        rows[rows.length - 1].remove();
        updateMoneyFields();
    }
}

// const getFormRows = ({ formElem, columnsCount, startIndex = 1, endIndex }) => {
//     if (startIndex < 1) {
//         startIndex = 1;
//     }
//     if (!endIndex || endIndex > columnsCount) {
//         endIndex = columnsCount;
//     }
//     const cells = dom.select.tableCells(formElem);
//     const start = (startIndex * columnsCount); // cell count per column * rows
//     return [...cells ].slice(start, cells.length);
// }
