import { wrapWithProgressBar } from "./dom/components/progress_bar";

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
    console.log(element.tagName)

    // const progress = document.createElement('div');
    // progress.classList.add('progress');

    // const progressBar = document.createElement('div');

    // const maxLength = 100;
    // let progressAmount = 0;
    // let width = 0;

    // progressBar.role = 'progressbar';
    // progressBar.classList.add('progressbar');
    // progressBar.classList.add(`w-${progressAmount}`);
    // progressBar.style.width = `${width}%`;
    // progressBar.setAttribute('aria-valuenow', '0');
    // progressBar.setAttribute('aria-valuemin', '0');
    // progressBar.setAttribute('aria-valuemax', maxLength.toString());
    // progressBar.textContent = '0%';
    // progressBar.style.backgroundColor = 'aqua';

    // progress.appendChild(progressBar);
    // element.appendChild(progress);


    // const textArea =  element.querySelector('textarea');
    // if (textArea) {
    //     textArea.setAttribute('maxlength', maxLength);
    // }
    // element.addEventListener('keyup', (e) => {
    //     let length = textArea.value.length;
    //     // if (length >= maxLength) {
    //     //     valueNow = valueNow.slice(0, maxLength);
    //     //     length = maxLength;
    //     // }
    //     const remaining = maxLength-length;

    //     progressBar.textContent = `${length.toString()}`;
    //     progressBar.setAttribute('aria-valuenow', remaining.toString());
    //     progressBar.textContent = `${(remaining).toString()} chars remaining`;

    //     const lastProgress = progressAmount;
    //     progressAmount = Math.floor(remaining);
    //     progressBar.classList.replace(`w-${lastProgress}`, `w-${progressAmount}`);

    //     width = progressAmount
    //     progressBar.style.width = `${width}%`;

    //     console.log('sdasdas');

    //     return $(element);
    // });

    element = wrapWithProgressBar({ element });

    if (element.tagName === 'TEXTAREA') {
        $(element).autoHeight();
    } else {
        $(element.querySelector('textarea')).autoHeight();
    }
    element.style.height = '100%';
    element.style.maxHeight = '100px';
    element.setAttribute('maxlength', '100');

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