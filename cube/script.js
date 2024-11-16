document.addEventListener('DOMContentLoaded', initializeApp);

let currentQuestionIndex = 0;
let responses = {};

// Prompts and Interpretation
const prompts = [
  {
    key: 'field',
    prompt: `<strong>Imagine an open field.</strong><br><ul>
      <li>How big is this field?</li>
      <li>What is it filled with?</li>
      <li>What are the surroundings like?</li>
      <li>How do you feel being in this field?</li>
    </ul>`
  },
  {
    key: 'cube',
    prompt: `<strong>There is a cube in the field.</strong><br><ul>
      <li>How big is the cube?</li>
      <li>What is it made of?</li>
      <li>What is its texture?</li>
      <li>What color is it?</li>
      <li>Where is it in the field?</li>
    </ul>`
  },
  {
    key: 'ladder',
    prompt: `<strong>There is a ladder in the field.</strong><br><ul>
      <li>What is it made of?</li>
      <li>How big is it?</li>
      <li>Where is it in relation to the cube?</li>
    </ul>`
  },
  {
    key: 'horse',
    prompt: `<strong>There is a horse in the field.</strong><br><ul>
      <li>What color is it?</li>
      <li>What is it doing?</li>
    </ul>`
  },
  {
    key: 'flowers',
    prompt: `<strong>There are flowers in the field.</strong><br><ul>
      <li>What kind of flowers are they?</li>
      <li>How many flowers are there?</li>
    </ul>`
  },
  {
    key: 'storm',
    prompt: `<strong>There is a storm in the field.</strong><br><ul>
      <li>What is the distance between the storm and the cube?</li>
      <li>Is it passing through or staying?</li>
    </ul>`
  }
];

const elementMeanings = {
  field: 'your worldview and state of mind',
  cube: 'yourself',
  ladder: 'your friends',
  horse: 'your ideal partner',
  flowers: 'children or creativity',
  storm: 'your challenges or difficulties'
};

// Keyword Interpretations
const interpretations = {
  field: [
    { keywords: ['large', 'vast'], meaning: 'You have a broad and open perspective on life.' },
    { keywords: ['small', 'limited'], meaning: 'You may feel constrained or restricted in your outlook.' }
  ],
  cube: [
    { keywords: ['large', 'huge'], meaning: 'You have a strong sense of self.' },
    { keywords: ['small'], meaning: 'You may feel insecure or hesitant.' }
  ],
  ladder: [
    { keywords: ['strong', 'sturdy'], meaning: 'You have strong and reliable friendships.' },
    { keywords: ['weak', 'unstable'], meaning: 'You may feel disconnected from your friends.' }
  ],
  horse: [
    { keywords: ['white'], meaning: 'You see your ideal partner as pure and honest.' },
    { keywords: ['black'], meaning: 'You value mystery and passion in a partner.' }
  ],
  flowers: [
    { keywords: ['many', 'abundant'], meaning: 'You have a strong creative potential.' },
    { keywords: ['few'], meaning: 'You might be feeling creatively blocked.' }
  ],
  storm: [
    { keywords: ['far', 'distant'], meaning: 'You handle challenges with ease and maintain perspective.' },
    { keywords: ['close', 'near'], meaning: 'You may feel overwhelmed by difficulties.' }
  ]
};

// Initialize the app
function initializeApp() {
  const app = document.getElementById('app');
  app.innerHTML = `<button id="startTest">Start Test</button>`;
  document.getElementById('startTest').addEventListener('click', startTest);

  document.getElementById('cover-container').style.display = 'block';
  document.getElementById('faq-container').style.display = 'block';
}

// Start the test
function startTest() {
  currentQuestionIndex = 0;
  responses = {};
  loadQuestion();

  document.getElementById('cover-container').style.display = 'none';
  document.getElementById('faq-container').style.display = 'none';
}

// Load the current question
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
      <textarea id="response" class="response-input"></textarea>
      <button id="next" class="next-button">Next</button>
    </div>`;
  document.getElementById('next').addEventListener('click', saveResponse);
}

// Save the user's response
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

// Generate interpretations
function generateInterpretation(key, userInput) {
  const lowerInput = userInput.toLowerCase();
  const matchingInterpretations = interpretations[key]?.filter(item =>
    item.keywords.some(keyword => lowerInput.includes(keyword))
  );

  if (matchingInterpretations && matchingInterpretations.length > 0) {
    return matchingInterpretations.map(item => `<li>${item.meaning}</li>`).join('');
  }

  return '<li>Your interpretation is unique. Reflect on its meaning.</li>';
}

// Display results
function displayResults() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Your Results</h2>';

  Object.keys(responses).forEach(key => {
    const userResponse = responses[key];
    const interpretation = generateInterpretation(key, userResponse);

    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <h3>The <strong>${capitalize(key)}</strong> represents your <strong>${elementMeanings[key]}</strong>.</h3>
      <p><strong>Interpretation:</strong></p>
      <ul>${interpretation}</ul>
      <button class="toggle-response">Your response was...</button>
      <div class="response-text" style="display: none;">
        <p>${userResponse}</p>
      </div>`;
    card.querySelector('.toggle-response').addEventListener('click', function () {
      const responseDiv = this.nextElementSibling;
      responseDiv.style.display = responseDiv.style.display === 'block' ? 'none' : 'block';
    });
    app.appendChild(card);
  });

  app.innerHTML += `<button id="restart" class="restart-button">Retake the Test</button>`;
  document.getElementById('restart').addEventListener('click', initializeApp);
}

// Capitalize the first letter of a word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
