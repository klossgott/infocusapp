let currentQuestionIndex = 0;
let responses = {};

// Prompts Data Structure
const prompts = [
  {
    key: "field",
    prompt: `Imagine an open field.

**Describe the field**:

- How large is the field?
- What is the condition of the field? (e.g., dry, grassy, lush, barren)
- What colours do you see in the field?
- How do you feel in this field?`,
  },
  {
    key: "cube",
    prompt: `Now place a cube in the field. 

**Describe the cube**:

- What size is the cube?
- What is it made of? (e.g., metal, glass, wood)
- What colour is the cube?
- Is it transparent or opaque?
- Where is the cube located in the field?
- Is it on the ground, floating, or buried?`,
  },
  {
    key: "ladder",
    prompt: `There is a ladder in the field.

**Describe the ladder**:

- What is the ladder made of? 
- How long or tall is the ladder?
- Where is the ladder located in relation to the cube?
- Is the ladder leaning on the cube, lying on the ground, or standing upright?`,
  },
  {
    key: "horse",
    prompt: `Now imagine a horse in the field.

**Describe the horse**:

- What colour is the horse?
- What breed is the horse (if you can tell)?
- What is the horse doing? (e.g., grazing, running, standing still)
- Where is the horse located in relation to the cube and the ladder?`,
  },
  {
    key: "flowers",
    prompt: `There are flowers in the field.

**Describe the flowers**:

- How many flowers are there?
- What type of flowers are they?
- What colour are the flowers?
- Where are the flowers located in relation to the cube, ladder, and horse?`,
  },
  {
    key: "weather",
    prompt: `What is the weather in the field?

**Describe the weather**:

- Is it sunny, cloudy, raining, or stormy?
- Is there a breeze or is the air still?
- How does the weather make you feel?`,
  },
  {
    key: "storm",
    prompt: `There is a storm in the field.

**Describe the storm**:

- What kind of storm is it? (e.g., thunderstorm, snowstorm, sandstorm)
- How intense is the storm?
- Where is the storm in relation to the cube?
- Is it passing by or staying?
- How do you feel about this storm?`,
  },
];

// Element Meanings
const elementMeanings = {
  field: "your worldview and state of mind",
  cube: "yourself",
  ladder: "your goals and friendships",
  horse: "your ideal partner or passion",
  flowers: "your social connections, family, or children",
  weather: "your general outlook on life",
  storm: "challenges and stress",
};

// Keywords Data Structure
const keywords = {
  field: [
    // Size
    {
      keywords: ["large", "vast", "big", "huge", "expansive"],
      interpretation: "You have a vast knowledge of the world and a broad personality.",
    },
    {
      keywords: ["small", "tiny", "limited", "narrow"],
      interpretation: "You might be introspective and more focused on personal matters.",
    },
    // Condition
    {
      keywords: ["dry", "dead", "barren", "desolate", "arid"],
      interpretation: "You may be feeling pessimistic or uninspired.",
    },
    {
      keywords: ["grassy", "healthy", "green", "lush", "vibrant", "alive"],
      interpretation: "You are feeling optimistic and content.",
    },
    {
      keywords: ["well-trimmed", "neat", "ordered", "manicured", "controlled"],
      interpretation: "You are analytical, cautious, and like things in order.",
    },
    // Colors
    {
      keywords: ["bright", "colourful", "vibrant", "multicoloured"],
      interpretation: "You are optimistic, cheerful, and appreciate variety in life.",
    },
    {
      keywords: ["dark", "dull", "grey", "monochromatic"],
      interpretation: "You might be feeling down, or you prefer simplicity and minimalism.",
    },
  ],
  cube: [
    // Size
    {
      keywords: ["large", "big", "huge", "tall", "giant"],
      interpretation: "Strong sense of self, confident.",
    },
    {
      keywords: ["small", "tiny", "little", "miniature"],
      interpretation: "Modest, possibly feeling insignificant.",
    },
    // Texture
    {
      keywords: ["smooth", "polished", "sleek"],
      interpretation: "Gentle nature, considerate of others.",
    },
    {
      keywords: ["rough", "coarse", "uneven", "textured"],
      interpretation: "Straightforward, possibly blunt.",
    },
    {
      keywords: ["bumpy", "spiky", "jagged", "sharp"],
      interpretation: "Critical or defensive nature.",
    },
    // Material
    {
      keywords: ["metal", "stone", "solid", "concrete", "marble"],
      interpretation: "Strong integrity, resilient.",
    },
    {
      keywords: ["wood", "plastic", "soft", "fragile", "delicate"],
      interpretation: "Flexible, adaptable.",
    },
    {
      keywords: ["glass", "transparent", "clear", "see-through"],
      interpretation: "Open, honest, transparent.",
    },
    {
      keywords: ["opaque", "solid", "impenetrable"],
      interpretation: "Private, guarded, reserved.",
    },
    // Color
    {
      keywords: ["gold", "silver", "precious", "shiny"],
      interpretation: "You value yourself highly, or you have high aspirations.",
    },
    {
      keywords: ["black", "dark", "shadowy"],
      interpretation: "Mysterious, powerful, or you are going through a dark period.",
    },
    {
      keywords: ["white", "light", "pure"],
      interpretation: "Innocent, pure, or you are seeking clarity.",
    },
    // Position
    {
      keywords: ["ground", "standing", "stable", "firm"],
      interpretation: "Grounded, practical.",
    },
    {
      keywords: ["floating", "hovering", "suspended"],
      interpretation: "Dreamy, idealistic, or feeling detached from reality.",
    },
    {
      keywords: ["buried", "hidden", "underground"],
      interpretation: "You might be suppressing your true self, or you are feeling overwhelmed.",
    },
    // Distance
    {
      keywords: ["near", "close"],
      interpretation: "You feel close to your true self.",
    },
    {
      keywords: ["far", "distant"],
      interpretation: "You may feel distant from your true self.",
    },
  ],
  ladder: [
    // Material
    {
      keywords: ["metal", "steel", "strong", "sturdy", "solid"],
      interpretation: "Confidence in achieving goals, strong friendships.",
    },
    {
      keywords: ["wood", "rope", "fragile", "rickety", "weak"],
      interpretation: "Uncertainty about goals, fragile friendships.",
    },
    // Position
    {
      keywords: [
        "leaning on cube",
        "touching cube",
        "supporting cube",
        "connected",
      ],
      interpretation: "You rely on others for support in achieving your goals.",
    },
    {
      keywords: [
        "standing upright",
        "independent",
        "alone",
        "not touching cube",
      ],
      interpretation: "You are independent and self-reliant in pursuing your goals.",
    },
    {
      keywords: ["lying on ground", "fallen", "broken", "useless"],
      interpretation: "You might have experienced setbacks or disappointments in pursuing your goals.",
    },
    // Distance
    {
      keywords: ["near", "close to cube"],
      interpretation: "Your goals are closely aligned with your sense of self.",
    },
    {
      keywords: ["far", "distant from cube"],
      interpretation: "You might feel disconnected from your goals, or they seem out of reach.",
    },
  ],
  horse: [
    // Color
    {
      keywords: ["brown", "earthly", "natural"],
      interpretation: "Values comfort and reliability.",
    },
    {
      keywords: ["black", "dark", "mysterious"],
      interpretation: "Attracted to sophistication and mystery.",
    },
    {
      keywords: ["white", "pure", "innocent"],
      interpretation: "Seeks loyalty and trust.",
    },
    {
      keywords: ["colourful", "unique", "unusual"],
      interpretation: "Appreciates uniqueness and originality.",
    },
    // Behaviour
    {
      keywords: ["playing", "playful", "energetic", "happy"],
      interpretation: "Desires a fun-loving, carefree partner.",
    },
    {
      keywords: ["running", "galloping", "wild", "free"],
      interpretation: "Values independence and freedom.",
    },
    {
      keywords: ["grazing", "resting", "calm", "peaceful"],
      interpretation: "Prefers stability and calmness.",
    },
    {
      keywords: ["tied", "saddle", "controlled", "restrained"],
      interpretation: "Desire for control or security in relationships.",
    },
    {
      keywords: ["approaching", "coming closer", "interested"],
      interpretation: "Open to intimacy and connection.",
    },
    {
      keywords: ["moving away", "running away", "distant"],
      interpretation: "Fear of commitment or intimacy.",
    },
    // Distance from Cube
    {
      keywords: ["near", "close to cube"],
      interpretation: "Desires closeness and intimacy.",
    },
    {
      keywords: ["far", "distant from cube"],
      interpretation: "Values personal space and independence.",
    },
  ],
  flowers: [
    // Number
    {
      keywords: ["many", "abundant", "lots"],
      interpretation: "Rich social life, strong family connections.",
    },
    {
      keywords: ["few", "scarce", "limited"],
      interpretation: "Limited social circle, or you prefer close-knit relationships.",
    },
    {
      keywords: ["none", "no flowers"],
      interpretation: "You may be feeling isolated or you are focusing on other areas of your life.",
    },
    // Type
    {
      keywords: ["wildflowers", "natural", "simple"],
      interpretation: "Down-to-earth, appreciate authenticity in relationships.",
    },
    {
      keywords: ["roses", "exotic", "beautiful", "delicate"],
      interpretation: "Romantic, value beauty and passion in relationships.",
    },
    // Colour
    {
      keywords: ["bright", "colourful", "vibrant"],
      interpretation: "Joyful relationships, full of life and energy.",
    },
    {
      keywords: ["pale", "delicate", "pastel"],
      interpretation: "Gentle and nurturing relationships.",
    },
    {
      keywords: ["dark", "wilting", "dying"],
      interpretation: "You may be experiencing challenges in your relationships.",
    },
    // Location
    {
      keywords: ["inside cube", "protected", "close to cube"],
      interpretation: "You feel protective of your loved ones.",
    },
    {
      keywords: ["near horse", "with horse", "around horse"],
      interpretation: "Your relationships are closely tied to your passions.",
    },
    {
      keywords: ["scattered", "random", "distant"],
      interpretation: "You may feel disconnected from your loved ones, or your relationships are less central in your life.",
    },
  ],
  weather: [
    // Condition
    {
      keywords: ["sunny", "bright", "clear", "warm"],
      interpretation: "Optimistic, cheerful, content.",
    },
    {
      keywords: ["cloudy", "overcast", "grey", "dreary"],
      interpretation: "You might be feeling uncertain or down.",
    },
    {
      keywords: ["rainy", "wet", "stormy", "windy"],
      interpretation: "You may be going through a challenging period.",
    },
    {
      keywords: ["foggy", "misty", "hazy", "unclear"],
      interpretation: "Confused, uncertain, or feeling lost.",
    },
    {
      keywords: ["calm", "peaceful", "still", "tranquil"],
      interpretation: "You are feeling serene and at peace.",
    },
  ],
  storm: [
    // Type
    {
      keywords: ["thunderstorm", "powerful", "intense"],
      interpretation: "You are facing significant challenges, but you are resilient.",
    },
    {
      keywords: ["snowstorm", "blizzard", "cold", "freezing"],
      interpretation: "You may be feeling emotionally numb or isolated.",
    },
    {
      keywords: ["sandstorm", "overwhelming", "blinding"],
      interpretation: "You are feeling overwhelmed or lost.",
    },
    // Intensity
    {
      keywords: ["strong", "powerful", "violent", "intense", "raging"],
      interpretation: "You are experiencing major difficulties in your life.",
    },
    {
      keywords: ["mild", "gentle", "passing", "brief"],
      interpretation: "Challenges are manageable, you are coping well.",
    },
    // Location
    {
      keywords: ["near cube", "close", "above cube"],
      interpretation: "Challenges are directly impacting you.",
    },
    {
      keywords: ["far", "distant", "on horizon"],
      interpretation: "Challenges are not immediate or you are distancing yourself from them.",
    },
    // Movement
    {
      keywords: ["passing", "moving away", "temporary"],
      interpretation: "Challenges are temporary and you are optimistic about the future.",
    },
    {
      keywords: ["stationary", "lingering", "staying"],
      interpretation: "Challenges are persistent and you may be feeling stuck.",
    },
  ],
};

// Start the app
function startApp() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = `
    <h1>The Cube Personality Test</h1>
    <p>This is a game of imagination and a tool for self-discovery. It's based on the book <em>The Cube</em> by Annie Gottlieb and Slobodan Pesic.</p> 
    <p>Imagine the elements described and answer the questions honestly. There are no right or wrong answers. The goal is to explore your subconscious and gain insights into yourself.</p>
    <p>Note: This test is for entertainment and self-reflection purposes only. Your responses are processed locally and are not stored or transmitted.</p>
    <button onclick="beginTest()">Begin Test</button> 
    <a href="faq.html" target="_blank">FAQ</a>
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
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  const promptDiv = document.createElement("div");
  promptDiv.className = "question";
  promptDiv.innerHTML = `
    <h2>${currentPrompt.key.charAt(0).toUpperCase() + currentPrompt.key.slice(1)}</h2>
    <p>${currentPrompt.prompt.replace(/\n/g, "<br>")}</p>
  `;
  contentDiv.appendChild(promptDiv);

  const inputElement = document.createElement("textarea");
  inputElement.rows = 10;
  inputElement.id = "userInput";
  contentDiv.appendChild(inputElement);

  const button = document.createElement("button");
  button.textContent = "Next";
  button.onclick = nextQuestion;
  contentDiv.appendChild(button);
}

function nextQuestion() {
  const currentPrompt = prompts[currentQuestionIndex];
  const userInput = document.getElementById("userInput").value.trim();

  if (userInput === "") {
    alert("Please provide a description before proceeding.");
    return;
  }

  responses[currentPrompt.key] = userInput;
  currentQuestionIndex++;
  showQuestion();
}

function showResults() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "<h1>Your Results</h1>";

  for (let key in responses) {
    const responseDiv = document.createElement("div");
    responseDiv.className = "response";

    const questionTitle = document.createElement("h2");
    questionTitle.textContent =
      key.charAt(0).toUpperCase() + key.slice(1) + ":";
    responseDiv.appendChild(questionTitle);

    const userResponse = responses[key];
    const userResponsePara = document.createElement("p");
    userResponsePara.innerHTML = `*Your description:*<br>${userResponse.replace(
      /\n/g,
      "<br>"
    )}`;
    responseDiv.appendChild(userResponsePara);

    // Analyze user's input and generate personalized interpretation
    const interpretationPara = document.createElement("p");
    interpretationPara.innerHTML = `*Interpretation:*<br>${generateInterpretation(
      key,
      userResponse
    )}`;
    responseDiv.appendChild(interpretationPara);

    const reflection = document.createElement("p");
    reflection.innerHTML = `*Reflect on how your description of the ${key} relates to your life. Consider your feelings and thoughts associated with it.*`;
    responseDiv.appendChild(reflection);

    contentDiv.appendChild(responseDiv);
  }

  const conclusion = document.createElement("p");
  conclusion.className = "conclusion";
  conclusion.innerHTML =
    "This is just a glimpse into your subconscious. Take some time to ponder these interpretations. Remember, you are the author of your own story.";
  contentDiv.appendChild(conclusion);

  // Add a replay button
  const replayButton = document.createElement("button");
  replayButton.textContent = "Retake the Test";
  replayButton.onclick = () => {
    currentQuestionIndex = 0;
    responses = {};
    startApp();
  };
  contentDiv.appendChild(replayButton);
}

function generateInterpretation(key, userInput) {
  userInput = userInput.toLowerCase();
  let interpretationsFound = [];

  if (keywords[key]) {
    keywords[key].forEach((item) => {
      item.keywords.forEach((keyword) => {
        if (userInput.includes(keyword)) {
          if (!interpretationsFound.includes(item.interpretation)) {
            interpretationsFound.push(item.interpretation);
          }
        }
      });
    });
  }

  let interpretation = "";
  if (interpretationsFound.length > 0) {
    interpretation += `The ${key} represents **${elementMeanings[key]}**. <br>`;
    interpretationsFound.forEach((intp) => {
      interpretation += `- ${intp} <br>`;
    });
  } else {
    interpretation = `The ${key} represents **${elementMeanings[key]}**.<br>`;
    interpretation +=
      "Your description is unique. Reflect on how it relates to your life.";
  }

  return interpretation;
}

window.onload = startApp;
