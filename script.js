const fileInput = document.querySelector('#file');
const copyText = document.querySelector('#copy-text');
const imgResult = document.querySelector('#img-result');
const convertedText = document.querySelector('#converted-text');
const browseFileContainer = document.querySelector('.header');
const resultSection = document.querySelector('.result');

copyText.onclick = () => {
    copyText.setAttribute('title', 'Copied.');
    setTimeout(() => {
        copyText.setAttribute('title', 'Copy text.');
    }, 2000);

    if (convertedText.value !== '') {
        navigator.clipboard.writeText(convertedText.value);
    }
};

fileInput.addEventListener('change', displayImage);

function displayImage() {
    const reader = new FileReader();

    reader.onload = () => {
        imgResult.src = reader.result;
        browseFileContainer.style.display = 'none'; // Hide the "Browse File" container
        resultSection.style.display = 'flex'; // Show the result section
    };

    if (this.files && this.files[0]) {
        reader.readAsDataURL(this.files[0]);
        recognizeText(this.files[0]);
    }
}

function recognizeText(file) {
    Tesseract.recognize(file)
        .then(result => {
            convertedText.value = result.text;
        })
        .catch(error => {
            console.error('Error recognizing text:', error);
        });
}
