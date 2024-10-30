export function fillQuestions(matchedAnswers) {
    console.log('Starting to fill answers into the form');

    matchedAnswers.forEach(answer => {
        const questionElement = Array.from(document.querySelectorAll('h3.MuiTypography-root.MuiTypography-h3'))
            .find(el => el.textContent.trim() === answer.question);

        if (questionElement) {
            const formType = determineFormType(questionElement);
            fillAnswer(questionElement, answer.answer, formType);
        }
    });
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

function fillAnswer(questionElement, answer, formType) {
    const container = questionElement.nextElementSibling;

    switch (formType) {
        case 'Multiple Choice':
            const radio = container.querySelector(`input[type="radio"][value="${answer}"]`);
            if (radio) radio.checked = true;
            break;
        case 'Text Input':
            const input = container.querySelector('input[type="text"]');
            if (input) input.value = answer;
            break;
        case 'Checkbox':
            const checkbox = container.querySelector('input[type="checkbox"]');
            if (checkbox) checkbox.checked = answer === 'true';
            break;
        case 'Dropdown':
            const select = container.querySelector('select');
            if (select) select.value = answer;
            break;
    }
    console.log(`Filled answer for question: ${questionElement.textContent.trim()}`);
}