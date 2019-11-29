export const wrapWithProgressBar = ({ element }) => {

    const maxLength = 100;
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
    progressBar.setAttribute('aria-valuemax', maxLength.toString());
    progressBar.textContent = `${(maxLength).toString()} chars remaining`;
    progressBar.style.backgroundColor = '#007bff';
    progressBar.style.color = 'white';
    progressBar.style.paddingLeft = '12px';

    progress.appendChild(progressBar);
    element.appendChild(progress);

    const textArea = element.querySelector('textarea');
    if (textArea) {
        textArea.setAttribute('maxlength', maxLength);
    }

    const onInput = () => {
        if (textArea) {
            let length = textArea.value.length;
            const remaining = maxLength-length;

            progressBar.textContent = `${length.toString()}`;
            progressBar.setAttribute('aria-valuenow', remaining.toString());
            progressBar.textContent = `${(remaining).toString()} chars remaining`;

            const lastProgress = progressAmount;
            progressAmount = Math.floor(remaining);
            progressBar.classList.replace(`w-${lastProgress}`, `w-${progressAmount}`);

            width = progressAmount
            progressBar.style.width = `${width}%`;
        }
    }
    onInput();

    element.addEventListener('keyup', onInput);

    return element;
}