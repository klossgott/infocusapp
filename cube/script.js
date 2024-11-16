document.addEventListener('DOMContentLoaded', initializeApp);

let currentQuestionIndex = 0;
let responses = {};

// Prompts Data Structure
const prompts = [
  {
    key: 'field',
    prompt: `<strong>Imagine an open field.</strong><br><ul>
      <li>How big is this field?</li>
      <li>What is it filled with?</li>
      <li>What are the surroundings like?</li>
      <li>How do you feel being in this field?</li>
      <li>What do you think about it?</li>
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
      <li>How do you feel about this cube?</li>
    </ul>`
  },
  {
    key: 'ladder',
    prompt: `<strong>There is a ladder in the field.</strong><br><ul>
      <li>What is it made of?</li>
      <li>How big is it?</li>
      <li>Where is it in relation to the cube?</li>
      <li>What condition is it in?</li>
      <li>How do you feel about this ladder?</li>
    </ul>`
  },
  {
    key: 'horse',
    prompt: `<strong>There is a horse in the field.</strong><br><ul>
      <li>What color is it?</li>
      <li>What is it doing?</li>
      <li>Where is it in relation to the cube and the ladder?</li>
      <li>How do you feel about this horse?</li>
    </ul>`
  },
  {
    key: 'flowers',
    prompt: `<strong>There are flowers in the field.</strong><br><ul>
      <li>What kind of flowers are they?</li>
      <li>How many flowers are there?</li>
      <li>Where are the flowers in relation to the other elements?</li>
      <li>What colors are they?</li>
      <li>How do you feel about the flowers?</li>
    </ul>`
  },
  {
    key: 'weather',
    prompt: `<strong>What is the weather like in the field?</strong><br><ul>
      <li>Is it raining? Sunny?</li>
      <li>Is your field foggy?</li>
      <li>How does the weather make you feel?</li>
    </ul>`
  },
  {
    key: 'storm',
    prompt: `<strong>There is a storm in the field.</strong><br><ul>
      <li>What is the distance between the storm and the cube?</li>
      <li>Is it a big storm or a small storm?</li>
      <li>Is it passing through or staying?</li>
      <li>How does it affect the field?</li>
      <li>How do you feel about this storm?</li>
    </ul>`
  }
];

// Element Meanings
const elementMeanings = {
  field: 'your worldview and state of mind',
  cube: 'yourself',
  ladder: 'your friends',
  horse: 'your lover or ideal partner',
  flowers: 'children or your creative potential',
  weather: 'your general outlook on life',
  storm: 'challenges and difficulties in your life'
};

// Keywords for Interpretation
const keywords = {
  field: [
    { keywords: ['vast', 'large', 'expansive', 'open'], interpretation: 'You have a broad perspective and an open mind.' },
    { keywords: ['small', 'enclosed', 'limited'], interpretation: 'You may feel limited or restricted in your outlook.' },
    { keywords: ['dry', 'dead', 'barren'], interpretation: 'You may be feeling pessimistic or uninspired.' },
    { keywords: ['grassy', 'healthy', 'green', 'lush'], interpretation: 'You are feeling optimistic and content.' },
    { keywords: ['well-trimmed', 'neat', 'ordered'], interpretation: 'You are analytical, cautious, and like things in order.' }
  ],
  cube: [
    { keywords: ['large', 'huge', 'giant'], interpretation: 'You have a strong sense of self and high self-esteem.' },
    { keywords: ['small', 'tiny', 'miniature'], interpretation: 'You may be feeling insecure or insignificant.' },
    { keywords: ['transparent', 'glass', 'clear'], interpretation: 'You are open and honest with yourself and others.' },
    { keywords: ['opaque', 'solid', 'metal'], interpretation: 'You are more private and guarded.' },
    { keywords: ['gold', 'silver', 'precious'], interpretation: 'You value yourself highly and have a sense of worth.' },
    { keywords: ['wood', 'natural'], interpretation: 'You are grounded and connected to nature.' }
  ],
  ladder: [
    { keywords: ['strong', 'sturdy', 'stable'], interpretation: 'You have strong and supportive friendships.' },
    { keywords: ['weak', 'rickety', 'unstable'], interpretation: 'You may have unstable or unreliable friendships.' },
    { keywords: ['leaning on cube', 'touching cube'], interpretation: 'You rely heavily on your friends.' },
    { keywords: ['away from cube', 'distant'], interpretation: 'You are more independent or have distant friendships.' }
  ],
  horse: [
    { keywords: ['white', 'light'], interpretation: 'Your ideal partner is pure and innocent.' },
    { keywords: ['black', 'dark'], interpretation: 'Your ideal partner is mysterious and passionate.' },
    { keywords: ['brown', 'earthly'], interpretation: 'Your ideal partner is reliable and down-to-earth.' },
    { keywords: ['running', 'galloping'], interpretation: 'You desire a passionate and adventurous relationship.' },
    { keywords: ['standing', 'calm'], interpretation: 'You desire a stable and peaceful relationship.' },
    { keywords: ['near cube', 'close'], interpretation: 'You feel close and connected to your partner.' },
    { keywords: ['far from cube', 'distant'], interpretation: 'You may feel distant or disconnected from your partner.' }
  ],
  flowers: [
    { keywords: ['roses', 'beautiful', 'fragrant'], interpretation: 'You have a romantic and nurturing nature.' },
    { keywords: ['wildflowers', 'simple', 'natural'], interpretation: 'You appreciate simplicity and natural beauty.' },
    { keywords: ['many', 'abundance'], interpretation: 'You are fertile and have a lot of creative potential.' },
    { keywords: ['few', 'scarce'], interpretation: 'You may be feeling creatively blocked.' }
  ],
  weather: [
    { keywords: ['sunny', 'bright', 'clear'], interpretation: 'You have a positive outlook on life.' },
    { keywords: ['rainy', 'stormy', 'dark'], interpretation: 'You may be feeling down or experiencing difficulties.' }
  ],
  storm: [
    { keywords: ['large', 'powerful', 'intense'], interpretation: 'You are facing significant challenges.' },
    { keywords: ['small', 'weak', 'passing'], interpretation: 'Your challenges are manageable.' },
    { keywords: ['near', 'close'], interpretation: 'Your challenges are affecting you deeply.' },
    { keywords: ['far', 'distant'], interpretation: 'You are coping well with your challenges.' }
  ]
};

// Initialize App
function initializeApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <p>Welcome to <strong>The Cube Personality Test</strong>. This exercise uses visualization to explore your subconscious mind.</p>
    <button id="startTest">Start Test</button>`;
  document.getElementById('startTest').addEventListener('click', startTest);

  const faqContainer = document.getElementById('faq-container');
  if (faqContainer) faqContainer.style.display = 'block';
}

// Start Test
function startTest() {
  currentQuestionIndex = 0;
  responses = {};
  loadQuestion();

  const faqContainer = document.getElementById('faq-container');
  if (faqContainer) faqContainer.style.display = 'none';
}

// Load Questions
function loadQuestion() {
  if (currentQuestionIndex >= prompts.length) {
    displayResults();
    return;
  }
  const app = document.getElementById('app');
  const question = prompts[currentQuestionIndex];
  app.innerHTML = `
    <div>
      ${question.prompt}
      <textarea id="response" placeholder="Type your response here..."></textarea>
      <button id="next">Next</button>
    </div>`;
  document.getElementById('next').addEventListener('click', saveResponse);
}

// Save Response
function saveResponse() {
  const response = document.getElementById('response').value.trim();
  if (!response) {
    alert('Please provide a response.');
    return;
  }
  const promptKey = prompts[currentQuestionIndex].key;
  responses[promptKey] = response;
  currentQuestionIndex++;
  loadQuestion();
}

// Display Results
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
      ${interpretation}
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

// Generate Interpretation
function generateInterpretation(key, userInput) {
  const lowerInput = userInput.toLowerCase();
  const matches = keywords[key]?.filter(item =>
    item.keywords.some(keyword => lowerInput.includes(keyword))
  );
  return matches?.map(item => `<ul><li>${item.interpretation}</li></ul>`).join('') || '<p>Your response is unique. Reflect on its meaning.</p>';
}

// Capitalize First Letter
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
