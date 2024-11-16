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
- How do you feel about this cube?
- How far away is it from you?
- Is it transparent? Can you see what is inside?
- How big is the cube compared to the field? What is the ratio?`
    },
    {
        key: 'ladder',
        prompt: `There is a ladder in the field.

**Describe the ladder**:
- How long is the ladder?
- Where is it located in the field?
- Is the ladder leaning on the cube?
- What is the distance between the cube and the ladder?
- What is it made of?
- What is its color?
- What impression does it give you?
- What is the relationship between the cube and the ladder?`
    },
    {
        key: 'horse',
        prompt: `There is a horse in the field.

**Describe the horse**:
- What color is the horse?
- What is the horse doing?
- Where is it in relation to your cube?
- Is it tied? Is there a saddle?
- What impression does it give you?`
    },
    {
        key: 'flowers',
        prompt: `There are flowers in the field.

**Describe the flowers**:
- How many flowers are there?
- Where are they located in the field?
- What is their color?
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

// Interpretations Data Structure
const interpretations = {
    field: {
        description: "The field represents **your worldview and state of mind**.",
        points: [
            {
                condition: "Size of the Field",
                interpretations: [
                    "Large Field: You have a vast knowledge of the world and a broad personality.",
                    "Small Field: You might be introspective and more focused on personal matters."
                ]
            },
            {
                condition: "Condition of the Field",
                interpretations: [
                    "Dry and Dead: You may be feeling pessimistic or uninspired.",
                    "Grassy and Healthy: You are feeling optimistic and content.",
                    "Well-Trimmed: You are analytical, cautious, and like things in order."
                ]
            },
            {
                condition: "Your Feelings",
                interpretations: [
                    "How you feel in the field mirrors your overall emotional state and outlook on life."
                ]
            }
        ]
    },
    cube: {
        description: "The cube represents **yourself**.",
        points: [
            {
                condition: "Size of the Cube",
                interpretations: [
                    "Large Cube: Strong sense of self, confident.",
                    "Small Cube: Modest, possibly feeling insignificant."
                ]
            },
            {
                condition: "Material and Texture",
                interpretations: [
                    "Smooth Surface: Gentle nature, considerate of others.",
                    "Rough Surface: Straightforward, possibly blunt.",
                    "Bumpy or Spiky: Critical or defensive nature.",
                    "Solid Material (metal, stone): Strong integrity, resilient.",
                    "Soft Material (wood, plastic): Flexible, adaptable.",
                    "Transparent: Open and sincere.",
                    "Opaque: Private, reserved.",
                    "Hollow: Concerned with outward appearance."
                ]
            },
            {
                condition: "Color of the Cube",
                interpretations: [
                    "Red: Energetic, passionate, attention-seeking.",
                    "Yellow: Cheerful, sociable, playful.",
                    "Blue: Calm, intelligent, loyal.",
                    "Violet: Mysterious, idealistic, perfectionist.",
                    "Grey: Independent, composed, self-sufficient.",
                    "Black: Strong-willed, values solitude, sophisticated.",
                    "White: Pure, kind-hearted, peaceful.",
                    "Other Colors: Unique personal traits."
                ]
            },
            {
                condition: "Position",
                interpretations: [
                    "On the Ground: Grounded, practical.",
                    "Floating: Imaginative, dreamy."
                ]
            },
            {
                condition: "Distance from You",
                interpretations: [
                    "Near: You feel close to your true self.",
                    "Far: You may feel distant from your true self."
                ]
            },
            {
                condition: "Size Relative to Field",
                interpretations: [
                    "Large Ratio: You see yourself as significant in the world.",
                    "Small Ratio: You view yourself as a small part of the bigger picture."
                ]
            }
        ]
    },
    ladder: {
        description: "The ladder represents your **goals** and **friendships**.",
        points: [
            {
                condition: "Length of Ladder",
                interpretations: [
                    "Short Ladder: Realistic, attainable goals.",
                    "Long Ladder: Ambitious, challenging aspirations."
                ]
            },
            {
                condition: "Position in Field",
                interpretations: [
                    "Standing Alone: Independent goals or friendships.",
                    "Leaning on Cube: Friends rely on you; goals depend on you."
                ]
            },
            {
                condition: "Distance from Cube",
                interpretations: [
                    "Near the Cube: Active pursuit of goals or close friendships.",
                    "Far from Cube: Goals may be secondary, or friendships distant."
                ]
            },
            {
                condition: "Material of Ladder",
                interpretations: [
                    "Strong Material (metal, stone): Confidence in achieving goals, strong friendships.",
                    "Weak Material (wood, plastic): Uncertainty about goals, fragile friendships."
                ]
            },
            {
                condition: "Color of Ladder",
                interpretations: [
                    "Reflects the personality traits you perceive in your friends."
                ]
            }
        ]
    },
    horse: {
        description: "The horse represents your **ideal partner** or **passion**.",
        points: [
            {
                condition: "Color of the Horse",
                interpretations: [
                    "Brown: Values comfort and reliability.",
                    "Black: Attracted to sophistication and mystery.",
                    "White: Seeks loyalty and trust.",
                    "Other Colors: Appreciates uniqueness and originality."
                ]
            },
            {
                condition: "Behavior",
                interpretations: [
                    "Playing: Desires a fun-loving, carefree partner.",
                    "Running: Values independence and freedom.",
                    "Grazing or Resting: Prefers stability and calmness.",
                    "Tied or Saddled: Desire for control or security in relationships.",
                    "Free: Values freedom in relationships."
                ]
            },
            {
                condition: "Distance from Cube",
                interpretations: [
                    "Near the Cube: Desires closeness and intimacy.",
                    "Far from Cube: Values personal space and independence."
                ]
            },
            {
                condition: "Your Impression",
                interpretations: [
                    "Reflects your feelings about relationships or passions."
                ]
            }
        ]
    },
    flowers: {
        description: "The flowers represent your **social connections**, **family**, or **children**.",
        points: [
            {
                condition: "Number of Flowers",
                interpretations: [
                    "Few Flowers: Small, close-knit circle of friends or family.",
                    "Many Flowers: Wide social circle, possibly desires for many children."
                ]
            },
            {
                condition: "Location",
                interpretations: [
                    "Close to Cube: Strong personal connections.",
                    "Far from Cube: Distance in relationships."
                ]
            },
            {
                condition: "Color and Condition",
                interpretations: [
                    "Vibrant and Healthy: Positive feelings towards relationships.",
                    "Wilted or Fragile: Concerns or challenges in relationships."
                ]
            },
            {
                condition: "Hardy or Fragile",
                interpretations: [
                    "Reflects how you perceive your relationships or creations."
                ]
            },
            {
                condition: "Your Feelings",
                interpretations: [
                    "Indicates your nurturing side and care for others."
                ]
            }
        ]
    },
    weather: {
        description: "The weather reflects your **general outlook on life**.",
        points: [
            {
                condition: "Type of Weather",
                interpretations: [
                    "Sunny: Optimistic and positive attitude.",
                    "Rainy: Dealing with challenges; the intensity reflects the severity.",
                    "Foggy: Feeling uncertainty or confusion.",
                    "Windy: Facing change; adaptability.",
                    "Combination: Complex emotions and perspectives."
                ]
            },
            {
                condition: "Your Feelings",
                interpretations: [
                    "How the weather makes you feel reflects your approach to life's circumstances."
                ]
            }
        ]
    },
    storm: {
        description: "The storm represents **challenges and stress**.",
        points: [
            {
                condition: "Intensity of Storm",
                interpretations: [
                    "Mild Storm: Minor stress or obstacles.",
                    "Severe Storm: Significant challenges."
                ]
            },
            {
                condition: "Distance from Cube",
                interpretations: [
                    "Close: Immediate concerns.",
                    "Far: Distant or future worries."
                ]
            },
            {
                condition: "Movement",
                interpretations: [
                    "Passing Through: Temporary issues.",
                    "Stationary: Persistent problems."
                ]
            },
            {
                condition: "Effect on Field",
                interpretations: [
                    "How the storm affects the field reflects how challenges impact your life."
                ]
            },
            {
                condition: "Your Feelings",
                interpretations: [
                    "Indicates how you cope with difficulties."
                ]
            }
        ]
    },
    colors: {
        description: "**Color Meanings**:",
        points: [
            {
                condition: "",
                interpretations: [
                    "Black: Authority, elegance, mystery, sophistication.",
                    "White: Innocence, purity, simplicity, peace.",
                    "Red: Passion, energy, action, motivation.",
                    "Pink: Kindness, love, nurturing, calmness.",
                    "Orange: Enthusiasm, excitement, warmth, creativity.",
                    "Blue: Knowledge, calmness, reliability, tranquility.",
                    "Green: Growth, balance, harmony, vitality.",
                    "Yellow: Optimism, cheerfulness, originality, creativity.",
                    "Purple: Luxury, wisdom, creativity, spirituality.",
                    "Brown: Stability, reliability, earthiness, resilience.",
                    "Grey: Neutrality, calmness, detachment, balance.",
                    "Silver: Dignity, patience, emotionality, wisdom.",
                    "Gold: Success, achievement, pride, luxury."
                ]
            }
        ]
    }
};

// Start the app
function startApp() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <p>Welcome to The Cube Personality Test. This exercise uses visualization to help you explore aspects of your subconscious mind. Please describe whatever comes to mind first for each question, focusing on your feelings and perceptions.</p>
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
    promptDiv.innerHTML = `<p>${currentPrompt.prompt.replace(/\n/g, '<br>')}</p>`;

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
        alert('Please provide an answer before proceeding.');
        return;
    }
    responses[currentPrompt.key] = userInput;
    currentQuestionIndex++;
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
        userResponsePara.innerHTML = `<strong>Your description:</strong><br>${userResponse.replace(/\n/g, '<br>')}`;
        responseDiv.appendChild(userResponsePara);

        const interpretationData = interpretations[key];
        const interpretationPara = document.createElement('p');
        interpretationPara.innerHTML = `<strong>Interpretation:</strong><br>${interpretationData.description}`;

        interpretationData.points.forEach(point => {
            if (point.condition) {
                interpretationPara.innerHTML += `<br><br><strong>${point.condition}:</strong>`;
            }
            point.interpretations.forEach(interp => {
                interpretationPara.innerHTML += `<br>- ${interp}`;
            });
        });
        responseDiv.appendChild(interpretationPara);

        const reflection = document.createElement('p');
        reflection.innerHTML = `<em>Reflect on how your description of the ${key} relates to your life. Consider your feelings and thoughts associated with it.</em>`;
        responseDiv.appendChild(reflection);

        contentDiv.appendChild(responseDiv);
    });

    // Include color meanings at the end
    const colorsDiv = document.createElement('div');
    colorsDiv.className = 'response';
    colorsDiv.innerHTML = `<h3>Color Meanings</h3>`;
    const colorsData = interpretations['colors'];
    const colorsPara = document.createElement('p');
    colorsData.points.forEach(point => {
        point.interpretations.forEach(interp => {
            colorsPara.innerHTML += `<br>- ${interp}`;
        });
    });
    colorsDiv.appendChild(colorsPara);
    contentDiv.appendChild(colorsDiv);

    // Add a concluding message
    const conclusion = document.createElement('div');
    conclusion.className = 'conclusion';
    conclusion.innerHTML = "<p><em>This exercise is a tool for self-reflection. Interpretations are subjective, and the most important insights come from your personal reflections. Consider how each element relates to your life and feelings.</em></p>";
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

window.onload = startApp;
