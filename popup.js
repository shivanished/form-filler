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
            console.log("prelog");
            console.log(file); // Log the file object
            console.log("logged");

            // Prepare to send the file to the OCR API
            const formData = new FormData();
            formData.append('file', file);
            formData.append('oem', 3); // Add OCR Engine Mode
            formData.append('psm', 6); // Add Page Segmentation Mode

            // Set authorization token
            const token = "Bearer AIzaSyClzfrOzB818x55FASHvX4JuGQciR9lv7q";

            // Send the file to the OCR API
            fetch('https://formpixocr-production.up.railway.app/api/v1/ocr', {
                method: 'POST',
                headers: {
                    "Authorization": token,
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.extracted_text) {
                        console.log('OCR Response:', data);
                        // Display the extracted text in the extension
                        const resultDisplay = document.createElement('div');
                        resultDisplay.innerText = `Extracted Text: ${data.extracted_text}`;
                        document.body.appendChild(resultDisplay);
                    } else {
                        console.error('Failed to extract text:', data);
                        alert('Failed to extract text from the image. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while processing the image. Please try again.');
                });
        }
    });
});
