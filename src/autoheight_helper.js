export const applyAutoHeight = ({ element }) => {
    // Source: https://mdbootstrap.com/snippets/jquery/piotr-glejzer/131442
    jQuery.fn.extend({
        autoHeight: function() {
            function autoHeight_(element) {
                return jQuery(element).css({
                    'height': 'auto',
                    'overflow-y': 'hidden',
                }).height(element.scrollHeight);
            }
            return this.each(function() {
                autoHeight_(this).on('input', function() {
                    autoHeight_(this);
                });
            });
        }
    });
    console.log(element.tagName)
    if (element.tagName === 'TEXTAREA') {
        $(element).autoHeight();
    } else {
        $(element.querySelector('textarea')).autoHeight();
    }
    element.style.height = '100%';
    element.style.maxHeight = '100px';
    return element;
};