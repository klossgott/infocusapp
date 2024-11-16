script.js:
let currentQuestionIndex = 0;
let responses = {};
let showDeepeningPrompt = false;

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
- How do you feel about this cube?
- How far away is it from you?`
  },
  {
    key: 'ladder',
    prompt: `There is a ladder in the field.

**Describe the ladder**:

- What is the ladder made of?
- How big is the ladder?
- Where is the ladder in relation to the cube?
- Is it leaning on the cube?
- How do you feel about the ladder?`
  },
  {
    key: 'horse',
    prompt: `There is a horse in the field.

**Describe the horse**:

- What is the distance between the cube and the horse?
- What is the color of the horse?
- What is it doing?
- What impression does it give you?
- Is it tied? Is there a saddle?`
  },
  {
    key: 'flowers',
    prompt: `There are flowers in the field.

**Describe the flowers**:

- How many flowers are there?
- Where are the flowers in relation to the cube?
- What is the color of the flowers?
- How hardy or fragile do they seem to you?
- How do you feel about the flowers?
- How do they feel about you?`
  },
  {
    key: 'weather',
    prompt: `What is the weather like in the field?

**Describe the weather**:

- Is it raining? Sunny?
- Is there fog or wind?
- How does the weather affect the field?
- How do you feel about the weather?`
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
  horse: 'your ideal partner or passion',
  flowers: 'your social connections, family, or children',
  weather: 'your current mood and emotions',
  storm: 'challenges and stress'
};

// Keyword-Interpretation Pairs
const keywords = {
  field: [
    {
      keywords: ['large', 'vast', 'open', 'endless'],
      interpretation: 'You have a broad and expansive view of the world.'
    },
    {
      keywords: ['small', 'confined', 'limited'],
      interpretation: 'Your worldview may be more focused or limited.'
    },
    {
      keywords: ['dry', 'dead', 'barren'],
      interpretation: 'You may be feeling pessimistic or uninspired.'
    },
    {
      keywords: ['grassy', 'healthy', 'green', 'lush'],
      interpretation: 'You are feeling optimistic and content.'
    },
    {
      keywords: ['well-trimmed', 'neat', 'ordered'],
      interpretation: 'You are analytical, cautious, and like things in order.'
    },
    // Additional keywords as needed
  ],
  cube: [
    // Size
    {
      keywords: ['large', 'big', 'huge'],
      interpretation: 'Strong sense of self, confident.'
    },
    {
      keywords: ['small', 'tiny'],
      interpretation: 'Modest, possibly feeling insignificant.'
    },
    // Material
    {
      keywords: ['metal', 'stone', 'hard'],
      interpretation: 'Strong, resilient, perhaps guarded.'
    },
    {
      keywords: ['glass', 'transparent'],
      interpretation: 'Open, honest, vulnerable.'
    },
    {
      keywords: ['wood', 'plastic', 'soft'],
      interpretation: 'Flexible, adaptable.'
    },
    // ... [Add more keywords and interpretations for cube]
  ],
  // ... [Add keyword-interpretation pairs for ladder, horse, flowers, weather, storm]
};

// Deepening Prompts
const deepeningPrompts = {
  field: [
    "What emotions does the field evoke? Does it feel inviting or intimidating?",
    "What details stand out to you about the field? Are there any patterns or textures that catch your attention?",
    "Does the field feel boundless or confined? How does that make you feel?"
  ],
  // ... [Add prompts for cube, ladder, horse, flowers, weather, storm]
  general: [
    "How do the elements of the scene (field, cube, ladder, etc.) relate to one another?",
    "Is there anything in the scene you’d like to change or add?",
    "Does any part of the scene seem especially meaningful or significant to you?"
  ]
};

// Start the app
function startApp() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = `
    <h2>Welcome to The Cube Personality Test</h2>
    <p>This exercise uses visualization to help you explore aspects of your subconscious mind. Please describe whatever comes to mind first for each question, focusing on your feelings and perceptions.</p>
    <button onclick="beginTest()">Start the Test</button>
  `;
}

function beginTest() {
  currentQuestionIndex = 0;
  responses = {};
  showDeepeningPrompt = false;
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= prompts.length) {
    showResults();
    return;
  }

  const currentPrompt = prompts[currentQuestionIndex];
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  const promptDiv = document.createElement('div');
  promptDiv.className = 'question';
  promptDiv.innerHTML = `
    <p>${currentPrompt.prompt.replace(/\n/g, '<br>')}</p>
  `;
  contentDiv.appendChild(promptDiv);

  const inputElement = document.createElement('textarea');
  inputElement.rows = 10;
  inputElement.id = 'userInput';
  contentDiv.appendChild(inputElement);

  const button = document.createElement('button');
  button.textContent = (currentQuestionIndex === prompts.length - 1) ? 'Show Results' : 'Next';
  button.onclick = nextQuestion;
  contentDiv.appendChild(button);
}

function nextQuestion() {
  const currentPrompt = prompts[currentQuestionIndex];
  const userInput = document.getElementById('userInput').value.trim();

  if (userInput === '') {
    alert('Please provide an answer before proceeding.');
    return;
  }

  responses[currentPrompt.key] = userInput;

  if (showDeepeningPrompt) {
    showDeepeningPrompt = false;
  } else {
    currentQuestionIndex++;
  }
  
  showQuestion();
}

function showResults() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<h2>Your Results</h2>';

  prompts.forEach(prompt => {
    const key = prompt.key;
    const userResponse = responses[key];

    const responseDiv = document.createElement('div');
    responseDiv.className = 'response';

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    responseDiv.appendChild(questionTitle);

    const userResponsePara = document.createElement('p');
    userResponsePara.innerHTML = `*Your description:*<br>${userResponse.replace(/\n/g, '<br>')}`;
    responseDiv.appendChild(userResponsePara);

    const interpretationPara = document.createElement('p');
    interpretationPara.innerHTML = `*Interpretation:*<br>${generateInterpretation(key, userResponse)}`;
    responseDiv.appendChild(interpretationPara);

    // Add deepening prompt button if not already shown
    if (!showDeepeningPrompt && key !== 'general') {
      const deepeningButton = document.createElement('button');
      deepeningButton.textContent = 'Explore Further';
      deepeningButton.onclick = () => {
        showDeepeningPrompt = true;
        showDeepeningPromptForElement(key);
      };
      responseDiv.appendChild(deepeningButton);
    }

    contentDiv.appendChild(responseDiv);
  });

  // Add General Deepening Prompts
  if (!showDeepeningPrompt) {
    const deepeningButton = document.createElement('button');
    deepeningButton.textContent = 'Reflect on the Scene';
    deepeningButton.onclick = () => {
      showDeepeningPrompt = true;
      showDeepeningPromptForElement('general');
    };
    contentDiv.appendChild(deepeningButton);
  }

  // Add a concluding message
  const conclusion = document.createElement('div');
  conclusion.className = 'conclusion';
  conclusion.innerHTML = `
    <p>*This exercise is a tool for self-reflection. Interpretations are subjective, and the most important insights come from your personal reflections.*</p>
  `;
  contentDiv.appendChild(conclusion);

  // Add a replay button
  const replayButton = document.createElement('button');
  replayButton.textContent = 'Retake the Test';
  replayButton.onclick = () => {
    beginTest();
  };
  contentDiv.appendChild(replayButton);
}

function generateInterpretation(key, userInput) {
  userInput = userInput.toLowerCase();
  let interpretationsFound = [];

  keywords[key].forEach(keywordSet => {
    keywordSet.keywords.forEach(keyword => {
      if (userInput.includes(keyword)) {
        interpretationsFound.push(keywordSet.interpretation);
      }
    });
  });

  let interpretation = '';
  if (interpretationsFound.length > 0) {
    interpretation = `The ${key} represents **${elementMeanings[key]}**.

`;
    interpretationsFound.forEach(intp => {
      interpretation += `- ${intp}

`;
    });
  } else {
    interpretation = `The ${key} represents **${elementMeanings[key]}**.

`;
    interpretation += "Your description is unique. Reflect on how it relates to your life.";
  }

  return interpretation;
}

function showDeepeningPromptForElement(key) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = ''; // Clear previous content

  const prompt = getRandomPrompt(key);

  const promptDiv = document.createElement('div');
  promptDiv.className = 'question';
  promptDiv.innerHTML = `
    <p>${prompt}</p>
  `;
  contentDiv.appendChild(promptDiv);

  const continueButton = document.createElement('button');
  continueButton.textContent = 'Continue';
  continueButton.onclick = () => {
    showResults(); // Go back to showing results
  };
  contentDiv.appendChild(continueButton);
}

function getRandomPrompt(category) {
  const categoryPrompts = deepeningPrompts[category];
  const randomIndex = Math.floor(Math.random() * categoryPrompts.length);
  return categoryPrompts[randomIndex];
}

window.onload = startApp;
