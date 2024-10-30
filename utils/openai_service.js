import dotenv from 'dotenv';
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function matchAnswersWithQuestions(extractedText, questions) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an AI assistant designed to match extracted OCR text with form questions. Your task is to analyze the extracted text and the list of questions, then return an array of matched answers. Each answer should be an object containing the question text and the matched answer. If you can't find a match for a question, leave the answer blank. Be sure to format names, dates, and other information correctly based on the context of the question."
                },
                {
                    role: "user",
                    content: `Extracted OCR text: ${extractedText}\n\nQuestions: ${JSON.stringify(questions)}\n\nPlease match the extracted text with the questions and return an array of objects with the question text and the matched answer.`
                }
            ]
        })
    });

    const result = await response.json();
    return JSON.parse(result.choices[0].message.content);
}