import '../public/css/main.css';
import '../src/styles/responsive_table.less';
import { dom } from './dom';
import { createTable } from './dom/table';
import { createCompanyDetails } from './dom/company_details';
import { createBillingInfo } from './dom/billing_info';
import { createCustomerDetails } from './dom/customer_details';
import { createBillingAmounts } from './dom/billing_amounts';
import { createDescription } from './dom/description';

dom.select.companyDetails().appendChild(createCompanyDetails());
dom.select.billingInfo().appendChild(createBillingInfo());
dom.select.customerDetails().appendChild(createCustomerDetails());
dom.select.description().appendChild(createDescription());
dom.select.table().appendChild(createTable({ data: [] }));
dom.select.billingAmounts().appendChild(createBillingAmounts());




const autoSizeDescriptionTextArea = (() => {
    jQuery.fn.extend({
        autoHeight: function() {
            function autoHeight_(element) {
                return jQuery(element).css({
                    'height': 'auto',
                    'overflow-y': 'hidden'
                }).height(element.scrollHeight);
            }
            return this.each(function() {
                autoHeight_(this).on('input', function() {
                    autoHeight_(this);
                });
            });
        }
    });
    $('#description').autoHeight();
})();
