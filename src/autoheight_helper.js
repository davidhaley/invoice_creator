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
    // element.style.height = '100%';
    element.style.minHeight = formConfig.lineItemDescription.minHeight;
    element.style.maxHeight = formConfig.lineItemDescription.maxHeight;

    // element.setAttribute('maxlength', formConfig.description.maxlength);

    element = wrapWithProgressBar({
        element,
        maxlength: formConfig.invoiceDescription.maxlength
    });

    // const progress = document.createElement('div');
    // progress.classList.add('progress');

    // const progressBar = document.createElement('div');
    // progressBar.role = 'progressbar';
    // progressBar.style.width = '25%';
    // progressBar.setAttribute('aria-valuenow', '25');
    // progressBar.setAttribute('aria-valuemin', '0');
    // progressBar.setAttribute('aria-valuemax', '100');
    // progressBar.textContent = '25%';

    // progress.appendChild(progressBar);

    // element.appendChild(progress);

    return element;
};