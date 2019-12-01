import { wrapWithProgressBar } from "./dom/components/progress_bar";
import { formConfig } from "./form_config";

export const applyAutoHeight = ({ element }) => {
    // Source: https://mdbootstrap.com/snippets/jquery/piotr-glejzer/131442
    jQuery.fn.extend({
        autoHeight: function() {
            function autoHeight_(element) {
                return jQuery(element).css({
                    'height': 'auto',
                    // 'overflow-y': 'hidden',
                }).height(element.scrollHeight);
            }
            return this.each(function() {
                autoHeight_(this).on('input', function() {
                    autoHeight_(this);
                });
            });
        },
    });

    if (element.tagName === 'TEXTAREA') {
        $(element).autoHeight();
    } else {
        $(element.querySelector('textarea')).autoHeight();
    }
    element.style.minHeight = formConfig.lineItemDescription.minHeight;
    element.style.maxHeight = formConfig.lineItemDescription.maxHeight;

    element = wrapWithProgressBar({
        element,
        maxlength: formConfig.invoiceDescription.maxlength
    });

    return element;
};