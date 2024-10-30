import { extractQuestions, determineFormType } from './utils/scrape_questions';

// Mock the DOM environment
document.body.innerHTML = `
  <h3 class="MuiTypography-root MuiTypography-h3">Question 1</h3>
  <div><input type="text"></div>
  <h3 class="MuiTypography-root MuiTypography-h3">Question 2</h3>
  <div role="radiogroup"></div>
`;

describe('scrape_questions', () => {
  test('extractQuestions should return an array of questions', () => {
    const questions = extractQuestions();
    expect(questions).toHaveLength(2);
    expect(questions[0]).toHaveProperty('question', 'Question 1');
    expect(questions[1]).toHaveProperty('question', 'Question 2');
  });

  test('determineFormType should correctly identify form types', () => {
    const textQuestion = document.querySelector('h3');
    const radioQuestion = document.querySelectorAll('h3')[1];

    expect(determineFormType(textQuestion)).toBe('Text Input');
    expect(determineFormType(radioQuestion)).toBe('Multiple Choice');
  });
});