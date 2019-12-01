import {
    components as formComponents
} from '../../../../src/dom/components/form';
import { exampleData } from '../../../../src/dom/example_data';

describe('Form', () => {
    describe('components', () => {
        describe('create', () => {
            describe('row', () => {
                it('Should create a row', () => {
                    const row = formComponents.create.row({
                        formElem: document.body,
                        columns: exampleData.form.columns,
                        isHeader: true
                    });
                    expect(document.body).toContainElement(row);
                });
            });
        });
    });
});