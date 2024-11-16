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

// Keyword-Interpretation Pairs for Each Element
const keywords = {
  field: [
    {
      keywords: ['vast', 'large', 'expansive', 'open'],
      interpretation: 'You have a broad perspective and an open mind.'
    },
    {
      keywords: ['small', 'enclosed', 'limited'],
      interpretation: 'You may feel limited or restricted in your outlook.'
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
    }
    // Additional keywords as needed
  ],
  cube: [
    // Size
    {
      keywords: ['large', 'huge', 'giant'],
      interpretation: 'You have a strong sense of self and high self-esteem.'
    },
    {
      keywords: ['small', 'tiny', 'miniature'],
      interpretation: 'You may be feeling insecure or insignificant.'
    },
    // Material
    {
      keywords: ['transparent', 'glass', 'clear'],
      interpretation: 'You are open and honest with yourself and others.'
    },
    {
      keywords: ['opaque', 'solid', 'metal'],
      interpretation: 'You are more private and guarded.'
    },
    {
      keywords: ['gold', 'silver', 'precious'],
      interpretation: 'You value yourself highly and have a sense of worth.'
    },
    {
      keywords: ['wood', 'natural'],
      interpretation: 'You are grounded and connected to nature.'
    },
    // Position
    {
      keywords: ['centre', 'middle'],
      interpretation: 'You feel secure and grounded.'
    },
    {
      keywords: ['edge', 'side'],
      interpretation: 'You may be feeling unstable or on the edge.'
    },
    {
      keywords: ['above', 'floating'],
      interpretation: 'You are idealistic or have your head in the clouds.'
    },
    {
      keywords: ['buried', 'underground'],
      interpretation: 'You may be suppressing your true self.'
    }
    // Additional keywords as needed
  ],
  ladder: [
    // Material
    {
      keywords: ['strong', 'sturdy', 'stable'],
      interpretation: 'You have strong and supportive friendships.'
    },
    {
      keywords: ['weak', 'rickety', 'unstable'],
      interpretation: 'You may have unstable or unreliable friendships.'
    },
    // Position
    {
      keywords: ['leaning on cube', 'touching cube'],
      interpretation: 'You rely heavily on your friends.'
    },
    {
      keywords: ['away from cube', 'distant'],
      interpretation: 'You are more independent or have distant friendships.'
    }
    // Additional keywords as needed
  ],
  horse: [
    // Colour
    {
      keywords: ['white', 'light'],
      interpretation: 'Your ideal partner is pure and innocent.'
    },
    {
      keywords: ['black', 'dark'],
      interpretation: 'Your ideal partner is mysterious and passionate.'
    },
    {
      keywords: ['brown', 'earthly'],
      interpretation: 'Your ideal partner is reliable and down-to-earth.'
    },
    // Behaviour
    {
      keywords: ['running', 'galloping'],
      interpretation: 'You desire a passionate and adventurous relationship.'
    },
    {
      keywords: ['standing', 'calm'],
      interpretation: 'You desire a stable and peaceful relationship.'
    },
    // Position
    {
      keywords: ['near cube', 'close'],
      interpretation: 'You feel close and connected to your partner.'
    },
    {
      keywords: ['far from cube', 'distant'],
      interpretation: 'You may feel distant or disconnected from your partner.'
    }
    // Additional keywords as needed
  ],
  flowers: [
    // Type
    {
      keywords: ['roses', 'beautiful', 'fragrant'],
      interpretation: 'You have a romantic and nurturing nature.'
    },
    {
      keywords: ['wildflowers', 'simple', 'natural'],
      interpretation: 'You appreciate simplicity and natural beauty.'
    },
    // Quantity
    {
      keywords: ['many', 'abundance'],
      interpretation: 'You are fertile and have a lot of creative potential.'
    },
    {
      keywords: ['few', 'scarce'],
      interpretation: 'You may be feeling creatively blocked.'
    },
    // Position
    {
      keywords: ['near cube', 'close'],
      interpretation: 'You are nurturing and protective of your children or creative projects.'
    },
    {
      keywords: ['far from cube', 'distant'],
      interpretation: 'You may be neglecting your children or creative potential.'
    }
    // Additional keywords as needed
  ],
  weather: [
    {
      keywords: ['sunny', 'bright', 'clear'],
      interpretation: 'You have a positive outlook on life.'
    },
    {
      keywords: ['rainy', 'stormy', 'dark'],
      interpretation: 'You may be feeling down or experiencing difficulties.'
    }
    // Additional keywords as needed
  ],
  storm: [
    // Size and Intensity
    {
      keywords: ['large', 'powerful', 'intense'],
      interpretation: 'You are facing significant challenges.'
    },
    {
      keywords: ['small', 'weak', 'passing'],
      interpretation: 'Your challenges are manageable.'
    },
    // Distance
    {
      keywords: ['near', 'close'],
      interpretation: 'Your challenges are affecting you deeply.'
    },
    {
      keywords: ['far', 'distant'],
      interpretation: 'You are coping well with your challenges.'
    }
    // Additional keywords as needed
  ]
};

// Start the app
function startApp() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = `
Welcome to The Cube Personality Test. This exercise uses visualization to help you explore aspects of your subconscious mind. Please describe whatever comes to mind first for each question, focusing on your feelings and perceptions.
<button onclick="beginTest()">Start the Test</button>
`;
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
  button.textContent = 'Next';
  button.onclick = nextQuestion;
  contentDiv.appendChild(button);
}

function nextQuestion() {
  const currentPrompt = prompts[currentQuestionIndex];
  const userInput = document.getElementById('userInput').value.trim();
  responses[currentPrompt.key] = userInput;
  currentQuestionIndex++;
  showQuestion();
}

function showResults() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<h2>Your Results</h2>';

  Object.keys(responses).forEach(key => {
    const userResponse = responses[key];
    const interpretation = generateInterpretation(key, userResponse);

    const responseDiv = document.createElement('div');
    responseDiv.className = 'response';

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    responseDiv.appendChild(questionTitle);

    const userResponsePara = document.createElement('p');
    userResponsePara.innerHTML = `*Your description:*<br>${userResponse.replace(/\n/g, '<br>')}`;
    responseDiv.appendChild(userResponsePara);

    const interpretationPara = document.createElement('p');
    interpretationPara.innerHTML = `*Interpretation:*<br>${interpretation}`;
    responseDiv.appendChild(interpretationPara);

    const reflection = document.createElement('p');
    reflection.innerHTML = `*Reflect on how your description of the ${key} relates to your life. Consider your feelings and thoughts associated with it.*`;
    responseDiv.appendChild(reflection);

    contentDiv.appendChild(responseDiv);
  });

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
    currentQuestionIndex = 0;
    responses = {};
    startApp();
  };
  contentDiv.appendChild(replayButton);
}

function generateInterpretation(key, userInput) {
  userInput = userInput.toLowerCase();
  let interpretation = '';

  const relevantKeywords = keywords[key].filter(keywordObj => {
    return keywordObj.keywords.some(keyword => userInput.includes(keyword));
  });

  if (relevantKeywords.length > 0) {
    interpretation = `The ${key} represents **${elementMeanings[key]}**.

`;
    relevantKeywords.forEach(keywordObj => {
      interpretation += `- ${keywordObj.interpretation}

`;
    });
  } else {
    interpretation = `The ${key} represents **${elementMeanings[key]}**.

`;
    interpretation += 'Your description is unique. Reflect on how it relates to your life.';
  }

  return interpretation;
}

window.onload = startApp;
