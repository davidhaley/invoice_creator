import {
    isFocusingLastRow,
    lastRowHasMoneyAmount,
    getLastRowElement,
    aggregateAmounts,
    deleteRow,
    calculateSubTotal,
    calculateTax,
    calculateTotal,
    updateMoneyFields
} from '../../../src/dom/invoice';
import {
    elements as formElements,
    components as formComponents
} from '../../../src/dom/components/form';
import { exampleData } from '../../../src/dom/example_data';
import { dom } from '../../../src/dom';

describe('Invoice', () => {

    let lastRow;
    beforeEach(() => {
        document.body.innerHTML = '';
        lastRow = document.createElement('div');
    });

    describe('isFocusingLastRow()', () => {

        let currentElement;
        beforeEach(() => {
            currentElement = document.createElement('div');
        });

        it('Should return true if the current HTML element is included in the last row', () => {
            lastRow.appendChild(currentElement);
            expect(isFocusingLastRow({ lastRow, currentElement })).toBeTrue();
        });
        it('Should return false if the current HTML element is not included in the last row', () => {
            expect(isFocusingLastRow({ lastRow, currentElement })).toBeFalse();
        });
    });
    describe('lastRowHasMoneyAmount()', () => {

        let amountFieldSampleData;
        beforeEach(() => {
            amountFieldSampleData = exampleData.form.columns.amount;
        })

        it(`Should return true if the amount value in the last row
            of the last row is greater than zero`, () => {
            amountFieldSampleData.value = '50';
            lastRow.appendChild(formElements.create.input(amountFieldSampleData));
            expect(lastRowHasMoneyAmount({ lastRow })).toBeTrue();
        });
        it(`Should return false if the amount value in the last row
            of the last row is less than zero`, () => {
            amountFieldSampleData.value = '0';
            lastRow.appendChild(formElements.create.input(amountFieldSampleData));
            expect(lastRowHasMoneyAmount({ lastRow })).toBeFalse();
        });
    });
    describe('getLastRowElement()', () => {
        it('Should return the last row', () => {
            const row1 = formComponents.create.row({
                formElem: document.body,
                columns: exampleData.form.columns,
                isHeader: true
            });
            const row2 = formComponents.create.row({
                formElem: document.body,
                columns: exampleData.form.columns,
                isHeader: false
            });
            expect(getLastRowElement({ formElem: document.body })).not.toStrictEqual(row1);
            expect(getLastRowElement({ formElem: document.body })).toStrictEqual(row2);
        });
    });
    describe('deleteRow()', () => {
        it('Should delete a row, only if there are more than one rows', () => {
            const row = formComponents.create.row({
                formElem: document.body,
                columns: exampleData.form.columns,
                isHeader: false
            });
            expect(document.body).toContainElement(row);
            deleteRow({ formElem: document.body });
            expect(document.body).toContainElement(row);
        });
        it('Should delete a row, only if there are more than one', () => {
            const row1 = formComponents.create.row({
                formElem: document.body,
                columns: exampleData.form.columns,
                isHeader: false
            });
            const row2 = formComponents.create.row({
                formElem: document.body,
                columns: exampleData.form.columns,
                isHeader: false
            });
            expect(document.body).toContainElement(row1);
            expect(document.body).toContainElement(row2);
            deleteRow({ formElem: document.body });
            expect(document.body).toContainElement(row1);
            expect(document.body).not.toContainElement(row2);
        });
    });
    describe('calculateSubTotal()', () => {
        it('Should calculate a subtotal', () => {
            expect(calculateSubTotal({
                amounts: [5, '2', -7, 20, undefined, null, {}]
            }).value).toEqual(20);
        });
    });
    describe('calculateTax()', () => {
        it('Should calculate tax from a subtotal and return the value in cents', () => {
            document.body.appendChild(
                formComponents.create.taxRateInput({
                    taxRateInput: exampleData.form.taxRateInput
                })
            );
            expect(calculateTax({
                subTotal: 100,
            }).value).toEqual(5);
        });
    });
    describe('calculateTotal()', () => {
        it('Should calculate a total from a subtotal and tax', () => {
            expect(calculateTotal({
                subTotal: 100,
                tax: 5,
            }).value).toEqual(105);
        });
    });
    describe('Row Money', () => {

        let row1;
        let row2;
        beforeEach(() => {

            document.body.innerHTML = '';

            const row1Columns = Object.assign({}, exampleData.form.columns);
            row1Columns.quantity.value = 1;
            row1Columns.cost.value = 100;

            row1 = formComponents.create.row({
                formElem: document.body,
                columns: row1Columns,
                isHeader: true
            });

            const row2Columns = Object.assign({}, exampleData.form.columns);
            row2Columns.quantity.value = 2;
            row2Columns.cost.value = 200;

            row2 = formComponents.create.row({
                formElem: document.body,
                columns: row2Columns,
                isHeader: false
            });
        })

        describe('updateMoneyFields()', () => {
            it(`Should update the subtotal, tax, and total fields in the DOM,
                when given form rows`, () => {
                document.body.appendChild(dom.create.subTotal());
                document.body.appendChild(dom.create.tax());
                document.body.appendChild(dom.create.total());


                document.body.appendChild(
                    dom.create.taxRateInput().appendChild(
                        formComponents.create.taxRateInput({
                            taxRateInput: exampleData.form.taxRateInput
                        })
                    )
                );

                updateMoneyFields();

                expect(dom.select.subTotal().textContent).toBe('$500.00');
                expect(dom.select.tax().textContent).toBe('$25.00');
                expect(dom.select.total().textContent).toBe('$525.00');
            });
        });
        describe('aggregateAmounts()', () => {
            it('Should return the amounts of every row (after calulating (cost * quantity) from each row)', () => {
                const amounts = aggregateAmounts({ rows: [ row1, row2 ] });
                const total = amounts.reduce((prev, curr) => currency(prev).add(currency(curr)));
                expect(total.value).toBe(500);
            });
        });
    });
});