document.addEventListener('DOMContentLoaded', initializeApp);

let currentQuestionIndex = 0;
let responses = {};

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
      <li>Where is it located in the field?</li>
    </ul>`
  },
  {
    key: 'ladder',
    prompt: `<strong>There is a ladder in the field.</strong><br><ul>
      <li>What is it made of?</li>
      <li>How big is it?</li>
      <li>Where is it in relation to the cube?</li>
      <li>What condition is it in?</li>
    </ul>`
  },
  {
    key: 'horse',
    prompt: `<strong>There is a horse in the field.</strong><br><ul>
      <li>What color is the horse?</li>
      <li>What is it doing?</li>
      <li>Where is it in relation to the cube and the ladder?</li>
    </ul>`
  },
  {
    key: 'flowers',
    prompt: `<strong>There are flowers in the field.</strong><br><ul>
      <li>What kind of flowers are they?</li>
      <li>How many flowers are there?</li>
      <li>Where are the flowers located?</li>
    </ul>`
  },
  {
    key: 'storm',
    prompt: `<strong>There is a storm in the field.</strong><br><ul>
      <li>What is the distance between the storm and the cube?</li>
      <li>Is it a big storm or a small storm?</li>
      <li>How does it affect the field?</li>
    </ul>`
  }
];

const elementMeanings = {
  field: 'your worldview and state of mind',
  cube: 'yourself',
  ladder: 'your friends',
  horse: 'your ideal partner',
  flowers: 'your creativity or children',
  storm: 'your challenges or difficulties'
};

function initializeApp() {
  document.getElementById('startTest').addEventListener('click', startTest);

  // Shortcut Key: Alt + Shift + T
  document.addEventListener('keydown', (event) => {
    if (event.altKey && event.shiftKey && event.code === 'KeyT') {
      displayResults();
    }
  });
}

function startTest() {
  currentQuestionIndex = 0;
  responses = {};
  loadQuestion();

  document.getElementById('cover-container').style.display = 'none';
  document.getElementById('faq-container').style.display = 'none';
}

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

function displayResults() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Interpretation</h2>';

  Object.keys(responses).forEach(key => {
    const userResponse = responses[key];
    const interpretation = generateInterpretation(key, userResponse);

    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <h3>The <strong>${capitalize(key)}</strong> represents ${elementMeanings[key]}.</h3>
      <ul class="interpretation-list">${interpretation}</ul>
      <button class="toggle-response">Your response ▼</button>
      <div class="response-text hidden">
        <p>${userResponse}</p>
      </div>`;

    app.appendChild(card);
  });

  setupResponseToggles();

  app.innerHTML += `<button id="restart" class="button">Retake the Test</button>`;
  document.getElementById('restart').addEventListener('click', restartTest);
}

function setupResponseToggles() {
  document.querySelectorAll('.toggle-response').forEach(button => {
    button.addEventListener('click', () => {
      const responseText = button.nextElementSibling;
      if (responseText.classList.contains('hidden')) {
        document.querySelectorAll('.response-text').forEach(el => {
          el.classList.add('hidden');
          el.style.maxHeight = '0';
        });
        responseText.classList.remove('hidden');
        responseText.style.maxHeight = responseText.scrollHeight + 'px';
        button.textContent = 'Your response ▲';
      } else {
        responseText.classList.add('hidden');
        responseText.style.maxHeight = '0';
        button.textContent = 'Your response ▼';
      }
    });
  });
}

function generateInterpretation(key, userInput) {
  const lowerInput = userInput.toLowerCase();
  const keywords = {
    field: ['large', 'vast', 'small', 'barren', 'lush', 'green', 'dry'],
    cube: ['big', 'small', 'transparent', 'solid', 'gold', 'floating'],
    ladder: ['strong', 'weak', 'close', 'far', 'wooden', 'metal'],
    horse: ['white', 'black', 'brown', 'running', 'standing'],
    flowers: ['many', 'few', 'vibrant', 'colorful', 'scarce'],
    storm: ['close', 'distant', 'intense', 'weak', 'large', 'small']
  };

  const interpretations = {
    field: {
      large: 'You have an expansive and open worldview.',
      small: 'You may feel restricted in your perspective.',
      lush: 'You are feeling optimistic and fulfilled.',
      barren: 'You may feel pessimistic or uninspired.'
    },
    cube: {
      big: 'You have a strong sense of self.',
      small: 'You may feel hesitant or reserved.',
      transparent: 'You value openness and honesty.',
      solid: 'You may be more private and guarded.',
      gold: 'You hold yourself in high regard.'
    },
    ladder: {
      strong: 'You have supportive and reliable friends.',
      weak: 'You may feel your friendships lack stability.',
      close: 'Your friends are deeply connected to you.',
      far: 'You may prefer independence from your friends.'
    },
    horse: {
      white: 'You value purity and honesty in a partner.',
      black: 'You appreciate mystery and passion in a partner.',
      brown: 'You seek reliability and groundedness in relationships.',
      running: 'You desire adventure and excitement in love.',
      standing: 'You value stability and peace in relationships.'
    },
    flowers: {
      many: 'You have abundant creative potential.',
      few: 'You may feel creatively blocked or hesitant about expressing yourself.',
      vibrant: 'You are inspired and full of life.'
    },
    storm: {
      close: 'Your challenges feel overwhelming or immediate.',
      distant: 'You handle difficulties with perspective.',
      intense: 'You are dealing with significant life challenges.',
      weak: 'Your challenges are manageable and passing.'
    }
  };

  const matchKey = keywords[key]?.find(keyword => lowerInput.includes(keyword));
  return interpretations[key]?.[matchKey] || '<li>Your description is unique. Reflect on its meaning.</li>';
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function restartTest() {
  responses = {};
  document.getElementById('cover-container').style.display = 'block';
  document.getElementById('app').innerHTML = '';
  document.getElementById('faq-container').style.display = 'block';
}
