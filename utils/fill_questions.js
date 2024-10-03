async function fillQuestions(answers) {
    console.log('Starting to fill answers into the form');

    // Iterate through the questions and fill in the answers
    Object.keys(answers).forEach(question => {
        const input = document.querySelector(`input[name="${question}"]`);
        if (input) {
            input.value = answers[question];
            console.log(`Filled answer for question: ${question}`);
        }

        // Handle radio buttons
        const radioInput = document.querySelector(`input[name="${question}"][value="${answers[question]}"]`);
        if (radioInput) {
            radioInput.checked = true;
            console.log(`Selected option for multiple choice question: ${question}`);
        }
    });
}
