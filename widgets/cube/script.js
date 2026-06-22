document.addEventListener('DOMContentLoaded', initializeApp);

let currentQuestionIndex = 0;
let responses = {};

// Prompts for questions
const prompts = [
  { key: 'field', prompt: `<strong>Imagine an open field...</strong>` },
  { key: 'cube', prompt: `<strong>There is a cube...</strong>` },
  { key: 'ladder', prompt: `<strong>There is a ladder...</strong>` },
  { key: 'horse', prompt: `<strong>There is a horse...</strong>` },
  { key: 'flowers', prompt: `<strong>There are flowers...</strong>` },
  { key: 'storm', prompt: `<strong>There is a storm...</strong>` }
];

// Meanings for each element
const elementMeanings = {
  field: 'your worldview and state of mind',
  cube: 'yourself',
  ladder: 'your friends',
  horse: 'your ideal partner',
  flowers: 'your creativity or children',
  storm: 'your challenges or difficulties'
};

// Keywords for interpretations
const interpretationKeys = {
  field: [
    { keywords: ['large', 'vast', 'open'], meaning: 'You have an expansive worldview and an open mind.' },
    { keywords: ['small', 'enclosed', 'limited'], meaning: 'You may feel restricted or introverted.' },
    { keywords: ['barren', 'dry', 'desolate'], meaning: 'You may feel uninspired or emotionally dry.' },
    { keywords: ['lush', 'green', 'healthy'], meaning: 'You are feeling optimistic and energized.' }
  ],
  cube: [
    { keywords: ['large', 'big'], meaning: 'You have a strong sense of self and confidence.' },
    { keywords: ['small', 'tiny'], meaning: 'You may feel reserved or unsure of yourself.' },
    { keywords: ['transparent', 'glass'], meaning: 'You value honesty and openness.' },
    { keywords: ['solid', 'opaque'], meaning: 'You may prefer privacy and introspection.' },
    { keywords: ['gold', 'precious'], meaning: 'You hold yourself in high esteem and see value in yourself.' }
  ],
  ladder: [
    { keywords: ['close', 'near'], meaning: 'You have strong, supportive friendships.' },
    { keywords: ['far', 'distant'], meaning: 'You may feel disconnected from your friends.' },
    { keywords: ['strong', 'sturdy'], meaning: 'You rely on a solid support network.' },
    { keywords: ['weak', 'rickety'], meaning: 'Your friendships may feel uncertain or unreliable.' }
  ],
  horse: [
    { keywords: ['white', 'pure'], meaning: 'You value purity and honesty in a partner.' },
    { keywords: ['brown', 'reliable'], meaning: 'You value stability and dependability in relationships.' },
    { keywords: ['black', 'mysterious'], meaning: 'You are drawn to mystery and passion in love.' },
    { keywords: ['calm', 'peaceful'], meaning: 'You desire stability and serenity in your partner.' },
    { keywords: ['energetic', 'playful'], meaning: 'You are attracted to excitement and adventure in relationships.' }
  ],
  flowers: [
    { keywords: ['many', 'abundant'], meaning: 'You have abundant creativity or a nurturing nature.' },
    { keywords: ['few', 'scarce'], meaning: 'You may feel creatively blocked or distant.' },
    { keywords: ['colorful', 'vivid'], meaning: 'You are full of life and inspiration.' },
    { keywords: ['wilted', 'dry'], meaning: 'You may feel creatively drained or uninspired.' }
  ],
  storm: [
    { keywords: ['close', 'near'], meaning: 'Challenges feel immediate and intense for you.' },
    { keywords: ['distant', 'far'], meaning: 'You handle difficulties with perspective.' },
    { keywords: ['intense', 'powerful'], meaning: 'You are facing significant challenges in your life.' },
    { keywords: ['small', 'weak'], meaning: 'Your challenges feel manageable or insignificant.' },
    { keywords: ['passing', 'temporary'], meaning: 'You see your difficulties as temporary and fleeting.' }
  ]
};

// Initialize the app
function initializeApp() {
  document.getElementById('startTest').addEventListener('click', startTest);
}

// Start the test
function startTest() {
  currentQuestionIndex = 0;
  responses = {};
  loadQuestion();

  document.getElementById('cover-container').style.display = 'none';
  document.getElementById('faq-container').style.display = 'none';
}

// Load a question
function loadQuestion() {
  if (currentQuestionIndex >= prompts.length) {
    displayResults();
    return;
  }

  const question = prompts[currentQuestionIndex];
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="question-container">
      ${question.prompt}
      <textarea id="response" class="response-input" placeholder="Type your response here..."></textarea>
      <button id="next" class="button">Next</button>
    </div>`;
  document.getElementById('next').addEventListener('click', saveResponse);
}

// Save a response
function saveResponse() {
  const response = document.getElementById('response').value.trim();
  if (!response) {
    alert('Please provide a response.');
    return;
  }
  responses[prompts[currentQuestionIndex].key] = response;
  currentQuestionIndex++;
  loadQuestion();
}

// Display results with interpretations
function displayResults() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Interpretation</h2>';

  Object.keys(responses).forEach(key => {
    const userResponse = responses[key];
    const interpretation = generateInterpretation(key, userResponse);

    const section = `
      <div class="response-section">
        <div class="response-heading">Your Response</div>
        <div class="response-text" style="display: none;">
          <p><strong>Your Answer:</strong> <em>${userResponse}</em></p>
          <p><strong>Interpretation:</strong> ${interpretation}</p>
        </div>
      </div>`;
    app.insertAdjacentHTML('beforeend', section);
  });

  setupResponseToggles();

  app.innerHTML += `<button id="restart" class="button">Retake the Test</button>`;
  document.getElementById('restart').addEventListener('click', restartTest);
}

// Generate interpretation based on user input
function generateInterpretation(key, userInput) {
  const lowerInput = userInput.toLowerCase();
  const interpretations = interpretationKeys[key];

  if (interpretations) {
    for (const { keywords, meaning } of interpretations) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        return meaning;
      }
    }
  }
  return 'Your response is unique. Reflect on its meaning.';
}

// Setup toggle functionality for the interpretation section
function setupResponseToggles() {
  document.querySelectorAll('.response-heading').forEach(heading => {
    heading.addEventListener('click', () => {
      const responseText = heading.nextElementSibling;

      // Toggle visibility
      if (responseText.style.display === 'block') {
        responseText.style.display = 'none';
      } else {
        document.querySelectorAll('.response-text').forEach(text => {
          text.style.display = 'none';
        });
        responseText.style.display = 'block';
      }
    });
  });
}

// Restart the test
function restartTest() {
  responses = {};
  document.getElementById('cover-container').style.display = 'block';
  document.getElementById('app').innerHTML = '';
  document.getElementById('faq-container').style.display = 'block';
}
