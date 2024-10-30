import { fillQuestions } from './utils/fill_questions';

// Mock the DOM environment
document.body.innerHTML = `
  <h3 class="MuiTypography-root MuiTypography-h3">Name</h3>
  <div><input type="text" id="name-input"></div>
  <h3 class="MuiTypography-root MuiTypography-h3">Gender</h3>
  <div role="radiogroup">
    <input type="radio" name="gender" value="male">
    <input type="radio" name="gender" value="female">
  </div>
`;

describe('fill_questions', () => {
  test('fillQuestions should fill in form fields correctly', () => {
    const matchedAnswers = [
      { question: 'Name', answer: 'John Doe' },
      { question: 'Gender', answer: 'male' }
    ];

    fillQuestions(matchedAnswers);

    expect(document.getElementById('name-input').value).toBe('John Doe');
    expect(document.querySelector('input[name="gender"][value="male"]').checked).toBe(true);
  });
});