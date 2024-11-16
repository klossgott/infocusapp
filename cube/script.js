let currentQuestionIndex = 0;
let responses = {};

// Prompts Data Structure
const prompts = [
  {
    key: 'field',
    prompt: `
      <strong>Imagine an open field.</strong>
      <p><strong>Describe the field:</strong></p>
      <ul>
        <li>How big is this field?</li>
        <li>What is it filled with?</li>
        <li>What are the surroundings like?</li>
        <li>How do you feel being in this field?</li>
        <li>What do you think about it?</li>
      </ul>`
  },
  {
    key: 'cube',
    prompt: `
      <strong>There is a cube in the field.</strong>
      <p><strong>Describe the cube:</strong></p>
      <ul>
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
    prompt: `
      <strong>There is a ladder in the field.</strong>
      <p><strong>Describe the ladder:</strong></p>
      <ul>
        <li>What is it made of?</li>
        <li>How big is it?</li>
        <li>Where is it in relation to the cube?</li>
        <li>What condition is it in?</li>
        <li>How do you feel about this ladder?</li>
      </ul>`
  },
  {
    key: 'horse',
    prompt: `
      <strong>There is a horse in the field.</strong>
      <p><strong>Describe the horse:</strong></p>
      <ul>
        <li>What colour is it?</li>
        <li>What is it doing?</li>
        <li>Where is it in relation to the cube and the ladder?</li>
        <li>How do you feel about this horse?</li>
      </ul>`
  },
  {
    key: 'flowers',
    prompt: `
      <strong>There are flowers in the field.</strong>
      <p><strong>Describe the flowers:</strong></p>
      <ul>
        <li>What kind of flowers are they?</li>
        <li>How many flowers are there?</li>
        <li>Where are the flowers in relation to the other elements?</li>
        <li>What colours are they?</li>
        <li>How do you feel about the flowers?</li>
      </ul>`
  },
  {
    key: 'weather',
    prompt: `
      <strong>What is the weather like in the field?</strong>
      <p><strong>Describe the weather:</strong></p>
      <ul>
        <li>Is it raining? Sunny?</li>
        <li>Is your field foggy?</li>
        <li>How does the weather make you feel?</li>
      </ul>`
  },
  {
    key: 'storm',
    prompt: `
      <strong>There is a storm in the field.</strong>
      <p><strong>Describe the storm:</strong></p>
      <ul>
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

// Keyword-Interpretation Pairs for Each Element
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

// App Initialization
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <p>Welcome to <strong>The Cube Personality Test</strong>. Describe what comes to mind first.</p>
    <button id="start">Start Test</button>`;
  document.getElementById('start').addEventListener('click', beginTest);
}

function beginTest() {
  if (currentQuestionIndex >= prompts.length) displayResults();
  else loadQuestion();
}

function loadQuestion() {
  const app = document.getElementById('app');
  const question = prompts[currentQuestionIndex];
  app.innerHTML = `
    ${question.prompt}
    <textarea id="response"></textarea>
    <button id="next">Next</button>`;
  document.getElementById('next').addEventListener('click', saveAnswer);
}

function saveAnswer() {
  const answer = document.getElementById('response').value.trim();
  if (!answer) return alert('Please provide a response.');
  responses[prompts[currentQuestionIndex].key] = answer;
  currentQuestionIndex++;
  beginTest();
}

function displayResults() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Results</h2>';
  for (let key in responses) {
    app.innerHTML += `
      <h3>${capitalize(key)}</h3>
      <p><strong>Description:</strong> ${responses[key]}</p>
      <p><strong>Interpretation:</strong> ${generateInterpretation(key, responses[key])}</p>`;
  }
  app.innerHTML += `<button id="restart">Restart</button>`;
  document.getElementById('restart').addEventListener('click', () => location.reload());
}

function generateInterpretation(key, answer) {
  const matches = keywords[key]?.filter(k =>
    k.keywords.some(word => answer.toLowerCase().includes(word))
  );
  return matches?.length
    ? matches.map(k => `<ul><li>${k.interpretation}</li></ul>`).join('')
    : `Unique insight about your ${key}. Reflect further.`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
