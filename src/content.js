import { extractQuestions } from '../utils/scrape_questions.js';
import { fillQuestions } from '../utils/fill_questions.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract") {
        const questions = extractQuestions();
        sendResponse(questions);
    } else if (request.action === "fill") {
        fillQuestions(request.answers);
        sendResponse({success: true});
    }
    return true;
});