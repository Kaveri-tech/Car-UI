function handleFileUpload(event, previewId, errorMessageId, cameraIconClass) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const errorMessage = document.getElementById(errorMessageId);
    const preview = document.getElementById(previewId);
    const cameraIcon = fileInput.closest('.upload-container').querySelector(`.${cameraIconClass}`);

    if (file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            errorMessage.textContent = 'Please upload a valid picture file (JPEG, JPG, PNG).';
            preview.style.display = 'none';
            cameraIcon.style.display = 'block';
        } else {
            errorMessage.textContent = '';
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                cameraIcon.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    } else {
        errorMessage.textContent = 'Please select a file to upload.';
        preview.style.display = 'none';
        cameraIcon.style.display = 'block';
    }
}

function debounce(fn, delay) {
    let timeoutID;
    return function(...args) {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const debouncedHandleFileUpload1 = debounce(function(event) {
    handleFileUpload(event, 'preview1', 'errorMessage1', 'fa-camera');
}, 300);
const debouncedHandleFileUpload2 = debounce(function(event) {
    handleFileUpload(event, 'preview2', 'errorMessage2', 'fa-camera');
}, 300);
const debouncedHandleFileUpload3 = debounce(function(event) {
    handleFileUpload(event, 'preview3', 'errorMessage3', 'fa-camera');
}, 300);

document.getElementById('pictureUpload1').addEventListener('change', debouncedHandleFileUpload1);
document.getElementById('pictureUpload2').addEventListener('change', debouncedHandleFileUpload2);
document.getElementById('pictureUpload3').addEventListener('change', debouncedHandleFileUpload3);

document.querySelectorAll('.upload-container').forEach(container => {
    container.addEventListener('click', function() {
        container.querySelector('input[type="file"]').click();
    });
});

document.getElementById('captchaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const checkbox = document.getElementById('notRobot');
    const resultDiv = document.getElementById('captchaResult');
    
    if (checkbox.checked) {
        resultDiv.classList.remove('hidden');
    } else {
        alert('Please confirm you are not a robot!');
    }
});
