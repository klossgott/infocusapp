let currentQuestionIndex = 0;
let responses = {};

// Prompts Data Structure
const prompts = [
  {
    key: 'field',
    prompt: `Imagine an open field.

**Describe the field**:

- How big is this field?
- What is it filled with?
- What are the surroundings like?
- How do you feel being in this field?
- What do you think about it?`
  },
  {
    key: 'cube',
    prompt: `There is a cube in the field.

**Describe the cube**:

- How big is the cube?
- What is it made of?
- What is its texture?
- What color is it?
- Where is it in the field?
- How do you feel about this cube?`
  },
  {
    key: 'ladder',
    prompt: `There is a ladder in the field.

**Describe the ladder**:

- What is it made of?
- How big is it?
- Where is it in relation to the cube?
- What condition is it in?
- How do you feel about this ladder?`
  },
  {
    key: 'horse',
    prompt: `There is a horse in the field.

**Describe the horse**:

- What colour is it?
- What is it doing?
- Where is it in relation to the cube and the ladder?
- How do you feel about this horse?`
  },
  {
    key: 'flowers',
    prompt: `There are flowers in the field.

**Describe the flowers**:

- What kind of flowers are they?
- How many flowers are there?
- Where are the flowers in relation to the other elements?
- What colours are they?
- How do you feel about the flowers?`
  },
  {
    key: 'weather',
    prompt: `What is the weather like in the field?

**Describe the weather**:

- Is it raining? Sunny?
- Is your field foggy?
- How does the weather make you feel?`
  },
  {
    key: 'storm',
    prompt: `There is a storm in the field.

**Describe the storm**:

- What is the distance between the storm and the cube?
- Is it a big storm or a small storm?
- Is it passing through or staying?
- How does it affect the field?
- How do you feel about this storm?`
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

// Start the app
document.addEventListener('DOMContentLoaded', () => {
  startApp();
});

function startApp() {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = `
    <p>Welcome to The Cube Personality Test. This exercise uses visualization to help you explore aspects of your subconscious mind. Please describe whatever comes to mind first for each question, focusing on your feelings and perceptions.</p>
    <button id="startTest">Start the Test</button>
  `;

  // Attach event listener to the Start Test button
  document.getElementById('startTest').addEventListener('click', beginTest);
}

function beginTest() {
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= prompts.length) {
    showResults();
    return;
  }

  const currentPrompt = prompts[currentQuestionIndex];
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = `
    <div class="question">
      <p>${currentPrompt.prompt.replace(/\n/g, '<br>')}</p>
      <textarea id="userInput" rows="10"></textarea>
      <button id="nextQuestion">Next</button>
    </div>
  `;

  // Attach event listener to the Next button
  document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
}

function nextQuestion() {
  const userInput = document.getElementById('userInput').value.trim();
  const currentPrompt = prompts[currentQuestionIndex];
  responses[currentPrompt.key] = userInput;
  currentQuestionIndex++;
  showQuestion();
}

function showResults() {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = '<h2>Your Results</h2>';

  Object.keys(responses).forEach(key => {
    const userResponse = responses[key];
    const interpretation = generateInterpretation(key, userResponse);

    const responseDiv = document.createElement('div');
    responseDiv.className = 'response';
    responseDiv.innerHTML = `
      <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
      <p><strong>Your description:</strong><br>${userResponse}</p>
      <p><strong>Interpretation:</strong><br>${interpretation}</p>
    `;
    appDiv.appendChild(responseDiv);
  });

  const replayButton = document.createElement('button');
  replayButton.textContent = 'Retake the Test';
  replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    responses = {};
    startApp();
  });
  appDiv.appendChild(replayButton);
}

function generateInterpretation(key, userInput) {
  userInput = userInput.toLowerCase();
  let interpretation = `The ${key} represents ${elementMeanings[key]}.\n`;

  // Simplified keyword match
  const relevantKeywords = keywords[key]?.filter(obj =>
    obj.keywords.some(kw => userInput.includes(kw))
  );

  if (relevantKeywords && relevantKeywords.length > 0) {
    relevantKeywords.forEach(match => {
      interpretation += `- ${match.interpretation}\n`;
    });
  } else {
    interpretation += 'Your description is unique. Reflect on it personally.';
  }

  return interpretation;
}
