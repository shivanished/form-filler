export function extractQuestions() {
    const questions = [];
    const questionElements = document.querySelectorAll('h3.MuiTypography-root.MuiTypography-h3');

    questionElements.forEach(question => {
        const questionText = question.textContent.trim();
        const formType = determineFormType(question);
        questions.push({
            question: questionText,
            formType: formType
        });
    });

    return questions;
}

function determineFormType(questionElement) {
    if (questionElement.nextElementSibling.querySelector('div[role="radiogroup"]')) {
        return 'Multiple Choice';
    } else if (questionElement.nextElementSibling.querySelector('input[type="text"]')) {
        return 'Text Input';
    } else if (questionElement.nextElementSibling.querySelector('input[type="checkbox"]')) {
        return 'Checkbox';
    } else if (questionElement.nextElementSibling.querySelector('select')) {
        return 'Dropdown';
    } else {
        return 'Unknown';
    }
}