let currentQuestionIndex = 0;
let responses = {};

// Prompts Data Structure
const prompts = [
    {
        key: 'field',
        prompt: `Imagine an open field.

**Describe the field:**

- What is the size and expanse of the field?
- What is the condition of the field?
- What colors do you see in the field?
- How does the field make you feel?`
    },
    // ... [Add prompts for other elements: cube, ladder, horse, flowers, weather, storm]
];

// Element Meanings
const elementMeanings = {
    field: 'your worldview and state of mind',
    cube: 'yourself',
    ladder: 'your friends',
    horse: 'your lover',
    flowers: 'children, ideas, or projects',
    weather: 'your general outlook on life',
    storm: 'challenges or threats'
};

// Keywords Data Structure
const keywords = {
    field: [
        {
            characteristic: 'Size',
            meaning_tags: {
                'vast': ['expansive', 'open-minded'],
                'small': ['limited', 'introspective']
                // ... [Add more size keywords and meanings]
            }
        },
        {
            characteristic: 'Condition',
            meaning_tags: {
                'green': ['optimistic', 'vibrant'],
                'dry': ['pessimistic', 'uninspired'],
                'lush': ['abundant', 'fertile']
                // ... [Add more condition keywords and meanings]
            }
        },
        // ... [Add characteristic-meaning_tags pairs for colors, feelings, etc.]
    ],
    cube: [
        {
            characteristic: 'Size',
            meaning_tags: {
                'large': ['confident', 'strong sense of self'],
                'small': ['modest', 'insignificant']
                // ... [Add more size keywords and meanings]
            }
        },
        {
            characteristic: 'Material',
            meaning_tags: {
                'transparent': ['open', 'honest'],
                'opaque': ['private', 'guarded'],
                'metal': ['strong', 'resilient'],
                'glass': ['fragile', 'delicate']
                // ... [Add more material keywords and meanings]
            }
        },
        {
            characteristic: 'Position',
            meaning_tags: {
                'above': ['idealistic', 'optimistic'],
                'below': ['grounded', 'practical'],
                'center': ['balanced', 'focused']
                // ... [Add more position keywords and meanings]
            }
        }
        // ... [Add more characteristic-meaning_tags pairs for other aspects]
    ],
    // ... [Add keyword-meaning_tags pairs for other elements]
};

// Deepening Prompts
const deepeningPrompts = {
    field: [
        "What emotions does the field evoke? Does it feel inviting or intimidating?",
        "What details stand out to you about the field? Are there any patterns or textures that catch your attention?",
        // ... [Add more field prompts]
    ],
    // ... [Add prompts for other elements]
};

// General Prompts (End of Session)
const generalPrompts = [
    "How do the elements of the scene (field, cube, ladder, etc.) relate to one another?",
    "Is there anything in the scene you’d like to change or add?",
    "Does any part of the scene seem especially meaningful or significant to you?"
];

// Start the app
function startApp() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h1>The Cube Personality Test</h1>
        <p class="note">This test is for entertainment and self-reflection purposes only. Your responses are processed locally and are not stored or transmitted.</p>
        <button onclick="beginTest()">Start the Test</button>
    `;
}

function beginTest() {
    currentQuestionIndex = 0;
    responses = {};
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

    if (userInput === '') {
        alert('Please provide a description before proceeding.');
        return;
    }

    responses[currentPrompt.key] = userInput;
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<h2>Your Results</h2>';

    for (const key in responses) {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response';

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        responseDiv.appendChild(questionTitle);

        const userResponse = responses[key];
        const userResponsePara = document.createElement('p');
        userResponsePara.innerHTML = `*Your description:*<br>${userResponse.replace(/\n/g, '<br>')}`;
        responseDiv.appendChild(userResponsePara);

        // Analyze user's input and generate personalized interpretation
        const interpretationPara = document.createElement('p');
        interpretationPara.innerHTML = `*Interpretation:*<br>${generateInterpretation(key, userResponse)}`;
        responseDiv.appendChild(interpretationPara);

        // Add deepening prompt (optional)
        const askDeepening = document.createElement('p');
        askDeepening.textContent = "Would you like to explore this further?";
        const deepeningButton = document.createElement('button');
        deepeningButton.textContent = 'Yes';
        deepeningButton.onclick = () => showDeepeningPrompt(key);
        responseDiv.appendChild(askDeepening);
        responseDiv.appendChild(deepeningButton);

        contentDiv.appendChild(responseDiv);
    }

    // Add general prompts (optional)
    const askGeneral = document.createElement('p');
    askGeneral.textContent = "Would you like to reflect on the whole scene?";
    const generalButton = document.createElement('button');
    generalButton.textContent = 'Yes';
    generalButton.onclick = showGeneralPrompt;
    contentDiv.appendChild(askGeneral);
    contentDiv.appendChild(generalButton);

    // Add a concluding message
    const conclusion = document.createElement('div');
    conclusion.className = 'conclusion';
    conclusion.innerHTML = "<p>This exercise is a tool for self-reflection. Interpretations are subjective, and the most important insights come from your personal reflections.</p>";
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

function showDeepeningPrompt(elementKey) {
    const randomPrompt = deepeningPrompts[elementKey][Math.floor(Math.random() * deepeningPrompts[elementKey].length)];
    alert(randomPrompt);
}

function showGeneralPrompt() {
    const randomPrompt = generalPrompts[Math.floor(Math.random() * generalPrompts.length)];
    alert(randomPrompt);
}

function generateInterpretation(elementKey, userInput) {
    userInput = userInput.toLowerCase();
    let interpretation = '';
    let matchedCharacteristics = [];

    for (const characteristicData of keywords[elementKey]) {
        const characteristic = characteristicData.characteristic;
        const meaningTags = characteristicData.meaning_tags;

        for (const keyword in meaningTags) {
            if (userInput.includes(keyword)) {
                matchedCharacteristics.push({
                    characteristic: characteristic,
                    meaningTag: keyword
                });
                const randomInterpretation = meaningTags[keyword][Math.floor(Math.random() * meaningTags[keyword].length)];
                interpretation += `- **${characteristic}:** <span class="meaning-tag">${keyword}</span> - ${randomInterpretation}<br>`;
            }
        }
    }

    if (interpretation === '') {
        interpretation = `The ${elementKey} represents **${elementMeanings[elementKey]}**. Your description is unique. Reflect on how it relates to your life.`;
    }

    return interpretation;
}

window.onload = startApp;
