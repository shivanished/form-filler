document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');

    uploadButton.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0]; // Get the file object
            const fileName = file.name;
            fileNameDisplay.innerHTML = `<a href="#">${fileName}</a>`;
            console.log("prelog")
            console.log(file); // Log the file object
            console.log("logged")

            // Step 2: Prepare to send the file to the OCR API
            const formData = new FormData();
            formData.append('file', file); // 'file' is the key expected by the API

            // Example of sending the file to an API
            // fetch('https://your-ocr-api-endpoint.com/upload', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('OCR Response:', data);
            //     // Handle the response data from the API
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        }
    });
});
