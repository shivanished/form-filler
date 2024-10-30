import { extractQuestions } from './utils/scrape_questions.js';
import { fillQuestions } from './utils/fill_questions.js';
import { matchAnswersWithQuestions } from './utils/openai_service.js';

document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    const executeButton = document.getElementById('execute-button');

    uploadButton.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileUpload);
    executeButton.addEventListener('click', executeFormFilling);
});

async function handleFileUpload() {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileName = file.name;
        fileNameDisplay.innerHTML = `<a href="#">${fileName}</a>`;
        console.log("File selected:", file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('oem', 3);
        formData.append('psm', 6);

        const token = "Bearer AIzaSyClzfrOzB818x55FASHvX4JuGQciR9lv7q";

        try {
            const response = await fetch('https://formpixocr-production.up.railway.app/api/v1/ocr', {
                method: 'POST',
                headers: {
                    "Authorization": token,
                },
                body: formData
            });
            const data = await response.json();
            await handleOCRResponse(data);
        } catch (error) {
            handleOCRError(error);
        }
    }
}

async function handleOCRResponse(data) {
    if (data.extracted_text) {
        console.log('OCR Response:', data);
        const resultDisplay = document.createElement('div');
        resultDisplay.innerText = `Extracted Text: ${data.extracted_text}`;
        document.body.appendChild(resultDisplay);
        chrome.storage.local.set({ 'extractedText': data.extracted_text });
    } else {
        console.error('Failed to extract text:', data);
        alert('Failed to extract text from the image. Please try again.');
    }
}

function handleOCRError(error) {
    console.error('Error:', error);
    alert('An error occurred while processing the image. Please try again.');
}

async function executeFormFilling() {
    try {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        const questions = await chrome.tabs.sendMessage(tab.id, {action: "extract"});
        const extractedText = await new Promise((resolve) => chrome.storage.local.get(['extractedText'], result => resolve(result.extractedText)));
        const matchedAnswers = await matchAnswersWithQuestions(extractedText, questions);
        await chrome.tabs.sendMessage(tab.id, {action: "fill", answers: matchedAnswers});
    } catch (error) {
        console.error('Error during form filling:', error);
        alert('An error occurred while filling the form. Please try again.');
    }
}