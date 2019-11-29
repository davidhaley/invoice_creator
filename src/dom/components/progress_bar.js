export const wrapWithProgressBar = ({ element, maxlength }) => {

    let progressAmount = 0;
    let width = 0;

    const progress = document.createElement('div');
    progress.classList.add('progress');

    const progressBar = document.createElement('div');
    progressBar.classList.add(`w-${progressAmount}`);
    progressBar.style.width = `${width}%`;

    progressBar.role = 'progressbar';
    progressBar.classList.add('progressbar');
    progressBar.setAttribute('aria-valuenow', '0');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', maxlength.toString());
    progressBar.textContent = `${(maxlength).toString()} chars remaining`;
    progressBar.style.backgroundColor = '#007bff';
    progressBar.style.color = 'white';
    progressBar.style.paddingLeft = '12px';

    progress.appendChild(progressBar);
    element.appendChild(progress);

    const textArea = element.querySelector('textarea');
    if (textArea) {
        textArea.setAttribute('maxlength', maxlength);
    }

    const onInput = () => {
        if (textArea) {
            let length = textArea.value.length;
            const remaining = maxlength-length;

            progressBar.textContent = `${length.toString()}`;
            progressBar.setAttribute('aria-valuenow', remaining.toString());
            progressBar.textContent = `${(remaining).toString()} chars remaining`;

            const lastProgress = progressAmount;
            progressAmount = Math.floor(remaining);
            progressBar.classList.replace(`w-${lastProgress}`, `w-${progressAmount}`);

            width = (((progressAmount * 100)) / maxlength);
            progressBar.style.width = `${width}%`;
        }
    }
    onInput();

    element.addEventListener('keyup', onInput);
    element.addEventListener('keydown', onInput);

    return element;
}