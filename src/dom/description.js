import { components } from './components/textarea';

export const createDescription = ({ description }) => {
    return components.create.textArea({
        labelText: 'Description',
        textContent: description
    });
}

export const applyAutoHeight = ({ element }) => {
    // Source: https://mdbootstrap.com/snippets/jquery/piotr-glejzer/131442
    jQuery.fn.extend({
        autoHeight: function() {
            function autoHeight_(element) {
                return jQuery(element).css({
                    'height': 'auto',
                    'overflow-y': 'hidden',
                    'min-height': '50px'
                }).height(element.scrollHeight);
            }
            return this.each(function() {
                autoHeight_(this).on('input', function() {
                    autoHeight_(this);
                });
            });
        }
    });
    $(element.querySelector('textarea')).autoHeight();
    return element;
};