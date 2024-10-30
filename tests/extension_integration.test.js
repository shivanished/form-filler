import { extractQuestions } from './utils/scrape_questions';
import { fillQuestions } from './utils/fill_questions';
import { matchAnswersWithQuestions } from './utils/openai_service';

// Mock the chrome API
global.chrome = {
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn()
    }
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn()
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn()
    }
  }
};

// Mock the fetch function for OpenAI API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ choices: [{ message: { content: JSON.stringify([{ question: 'Name', answer: 'John Doe' }]) } }] }),
  })
);

describe('Extension Integration', () => {
  test('End-to-end flow: extract questions, match with OpenAI, and fill form', async () => {
    // Mock DOM for question extraction
    document.body.innerHTML = `
      <h3 class="MuiTypography-root MuiTypography-h3">Name</h3>
      <div><input type="text" id="name-input"></div>
    `;

    // Extract questions
    const questions = extractQuestions();
    expect(questions).toHaveLength(1);
    expect(questions[0]).toHaveProperty('question', 'Name');

    // Match answers with OpenAI
    const extractedText = 'The applicant\'s name is John Doe.';
    const matchedAnswers = await matchAnswersWithQuestions(extractedText, questions);
    expect(matchedAnswers).toHaveLength(1);
    expect(matchedAnswers[0]).toHaveProperty('question', 'Name');
    expect(matchedAnswers[0]).toHaveProperty('answer', 'John Doe');

    // Fill the form
    fillQuestions(matchedAnswers);
    expect(document.getElementById('name-input').value).toBe('John Doe');
  });
});