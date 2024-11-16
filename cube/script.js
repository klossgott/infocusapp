let currentQuestionIndex = 0;
let responses = {};

// Prompts Data Structure
const prompts = [
  {
    key: "field",
    prompt: `Imagine an open field.

**Describe the field**:

- How big is this field?
- What is it filled with?
- What are the surroundings like?
- How do you feel being in this field?`,
  },
  {
    key: "cube",
    prompt: `There is a cube in the field.

**Describe the cube**:

- How big is the cube?
- What is it made of?
- What is the surface like?
- What color is it?
- Where in the field is it?
- Is it on the ground or floating?
- Is it transparent? If so, can you see inside?`,
  },
  {
    key: "ladder",
    prompt: `There is a ladder in the field.

**Describe the ladder**:

- How long is the ladder?
- What is it made of?
- Where is it in relation to the cube?
- Is it leaning on the cube?
- Can you climb it?`,
  },
  {
    key: "horse",
    prompt: `There is a horse in the field.

**Describe the horse**:

- What color is the horse?
- What is it doing?
- Where is it in relation to the cube?
- How do you feel about the horse?`,
  },
  {
    key: "flowers",
    prompt: `There are flowers in the field.

**Describe the flowers**:

- What kind of flowers are they?
- What color are they?
- Where are they in relation to the other elements?
- How do you feel about the flowers?`,
  },
  {
    key: "weather",
    prompt: `What is the weather in the field?

**Describe the weather**:

- Is it raining? Sunny?
- Is your field foggy?`,
  },
  {
    key: "storm",
    prompt: `There is a storm in the field.

**Describe the storm**:

- What kind of storm is it?
- Where is it in relation to the cube?
- How intense is the storm?
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
    {
      characteristics: ["large", "vast", "big", "huge", "expansive", "endless"],
      meaning_tags: ["open", "optimistic", "free"],
      interpretation:
        "A large field suggests you have a broad and optimistic worldview, with a sense of freedom and possibility.",
    },
    {
      characteristics: ["small", "tiny", "limited", "enclosed"],
      meaning_tags: ["limited", "inward", "restricted"],
      interpretation:
        "A small field may indicate a more limited or inward-focused worldview, possibly feeling restricted or confined.",
    },
    {
      characteristics: ["empty", "barren", "desolate", "lifeless"],
      meaning_tags: ["empty", "lonely", "unfulfilled"],
      interpretation:
        "An empty or barren field could suggest feelings of loneliness, emptiness, or a lack of direction in life.",
    },
    {
      characteristics: [
        "full",
        "lush",
        "green",
        "vibrant",
        "alive",
        "abundant",
      ],
      meaning_tags: ["abundant", "fulfilling", "content"],
      interpretation:
        "A full and vibrant field suggests you are feeling content, fulfilled, and surrounded by abundance.",
    },
    {
      characteristics: ["well-kept", "neat", "orderly", "manicured"],
      meaning_tags: ["organized", "controlled", "structured"],
      interpretation:
        "A well-kept field indicates a preference for order and structure, and a controlled approach to life.",
    },
    {
      characteristics: ["wild", "overgrown", "chaotic", "untamed"],
      meaning_tags: ["free-spirited", "unstructured", "spontaneous"],
      interpretation:
        "A wild and overgrown field may represent a free-spirited nature, a preference for spontaneity, and a lack of desire for rigid structures.",
    },
  ],
  cube: [
    {
      characteristics: ["large", "big", "huge", "massive"],
      meaning_tags: ["confident", "strong", "ego"],
      interpretation:
        "A large cube indicates a strong sense of self and confidence, possibly even a large ego.",
    },
    {
      characteristics: ["small", "tiny", "insignificant"],
      meaning_tags: ["insecure", "modest", "humble"],
      interpretation:
        "A small cube suggests feelings of insecurity or modesty, perhaps a sense of being insignificant.",
    },
    {
      characteristics: ["transparent", "glass", "see-through"],
      meaning_tags: ["open", "honest", "vulnerable"],
      interpretation:
        "A transparent cube represents openness, honesty, and a willingness to be vulnerable.",
    },
    {
      characteristics: ["opaque", "solid", "impenetrable"],
      meaning_tags: ["private", "guarded", "closed-off"],
      interpretation:
        "An opaque cube suggests you are private and guarded, keeping your thoughts and feelings hidden.",
    },
    {
      characteristics: ["smooth", "polished", "perfect"],
      meaning_tags: ["refined", "composed", "controlled"],
      interpretation:
        "A smooth and polished cube indicates a refined and composed personality, with a strong sense of control.",
    },
    {
      characteristics: ["rough", "textured", "imperfect"],
      meaning_tags: ["authentic", "unpolished", "genuine"],
      interpretation:
        "A rough or textured cube suggests authenticity, a genuine nature, and a lack of pretense.",
    },
    {
      characteristics: ["metallic", "gold", "silver", "bronze", "steel"],
      meaning_tags: ["strong", "valuable", "resilient"],
      interpretation:
        "A metallic cube represents strength, resilience, and a sense of self-worth.",
    },
    {
      characteristics: ["wooden", "natural", "earthy"],
      meaning_tags: ["grounded", "stable", "connected"],
      interpretation:
        "A wooden cube suggests you are grounded, stable, and connected to nature.",
    },
    {
      characteristics: ["floating", "above ground", "levitating"],
      meaning_tags: ["dreamer", "idealistic", "detached"],
      interpretation:
        "A floating cube indicates idealism, a tendency to dream, or a sense of detachment from reality.",
    },
    {
      characteristics: ["buried", "underground", "hidden"],
      meaning_tags: ["hidden", "suppressed", "unconscious"],
      interpretation:
        "A buried cube suggests hidden aspects of yourself, suppressed emotions, or unconscious desires.",
    },
  ],
  ladder: [
    {
      characteristics: ["long", "tall", "high", "reaching"],
      meaning_tags: ["ambitious", "aspirational"],
      interpretation:
        "A long ladder suggests you have high aspirations and ambitious goals for your friendships or your future.",
    },
    {
      characteristics: ["short", "small", "low"],
      meaning_tags: ["realistic", "grounded"],
      interpretation:
        "A short ladder may indicate that you have realistic expectations for your friendships and focus on achievable goals.",
    },
    {
      characteristics: ["strong", "sturdy", "metal", "wood", "solid"],
      meaning_tags: ["reliable", "trustworthy", "supportive"],
      interpretation:
        "A ladder made of strong materials suggests that you have reliable and supportive friends.",
    },
    {
      characteristics: ["weak", "flimsy", "broken", "unstable", "rickety"],
      meaning_tags: ["fragile", "uncertain", "unreliable"],
      interpretation:
        "A weak or broken ladder could indicate fragile friendships or a lack of support in your life.",
    },
    {
      characteristics: ["close", "near", "touching", "leaning on"],
      meaning_tags: ["close-knit", "dependent", "intertwined"],
      interpretation:
        "A ladder close to the cube suggests you are very close to your friends and may rely on them heavily.",
    },
    {
      characteristics: ["far", "distant", "away"],
      meaning_tags: ["independent", "distant", "separate"],
      interpretation:
        "A ladder far from the cube may indicate a desire for independence or distance in your friendships.",
    },
    {
      characteristics: ["new", "shiny", "modern", "clean"],
      meaning_tags: ["fresh", "evolving", "growing"],
      interpretation:
        "A new or shiny ladder suggests you are open to new friendships and that your relationships are evolving.",
    },
    {
      characteristics: ["old", "worn", "rusty", "broken"],
      meaning_tags: ["past", "challenges", "lessons"],
      interpretation:
        "An old or worn ladder might represent friendships from your past that have brought challenges and lessons.",
    },
  ],
  horse: [
    {
      characteristics: ["white", "light", "pure"],
      meaning_tags: ["idealistic", "innocent", "spiritual"],
      interpretation:
        "A white horse symbolizes purity, innocence, and spiritual aspirations in a partner.",
    },
    {
      characteristics: ["black", "dark", "mysterious"],
      meaning_tags: ["passionate", "intense", "unknown"],
      interpretation:
        "A black horse represents passion, intensity, and a sense of the unknown in a relationship.",
    },
    {
      characteristics: ["brown", "earthly", "reliable"],
      meaning_tags: ["stable", "grounded", "practical"],
      interpretation:
        "A brown horse suggests you seek stability, practicality, and a grounded nature in a partner.",
    },
    {
      characteristics: ["wild", "untamed", "free"],
      meaning_tags: ["adventurous", "independent", "unconventional"],
      interpretation:
        "A wild and untamed horse represents a desire for adventure, independence, and unconventionality in a relationship.",
    },
    {
      characteristics: ["calm", "gentle", "tame"],
      meaning_tags: ["peaceful", "harmonious", "easygoing"],
      interpretation:
        "A calm and gentle horse suggests you seek peace, harmony, and an easygoing nature in a partner.",
    },
    {
      characteristics: ["strong", "powerful", "muscular"],
      meaning_tags: ["dominant", "protective", "assertive"],
      interpretation:
        "A strong and powerful horse may indicate a desire for a dominant, protective, or assertive partner.",
    },
    {
      characteristics: ["close", "near", "nuzzling", "affectionate"],
      meaning_tags: ["intimate", "connected", "close"],
      interpretation:
        "A horse that is close to the cube suggests a desire for intimacy and closeness in a relationship.",
    },
    {
      characteristics: ["far", "distant", "running away"],
      meaning_tags: ["distant", "independent", "fearful"],
      interpretation:
        "A horse that is far away may indicate a fear of commitment, a need for space, or emotional distance in a relationship.",
    },
  ],
  flowers: [
    {
      characteristics: ["abundant", "many", "field full"],
      meaning_tags: ["extroverted", "sociable", "connected"],
      interpretation:
        "An abundance of flowers suggests you are extroverted, sociable, and have a strong network of connections.",
    },
    {
      characteristics: ["few", "scattered", "isolated"],
      meaning_tags: ["introverted", "selective", "limited"],
      interpretation:
        "Few flowers may indicate that you are more introverted, selective in your relationships, or feel a limited sense of connection.",
    },
    {
      characteristics: ["bright", "colourful", "vibrant"],
      meaning_tags: ["positive", "joyful", "happy"],
      interpretation:
        "Bright and colorful flowers represent positive relationships, joy, and happiness in your social life.",
    },
    {
      characteristics: ["pale", "wilting", "faded"],
      meaning_tags: ["strained", "difficult", "neglected"],
      interpretation:
        "Pale or wilting flowers could indicate strained or neglected relationships.",
    },
    {
      characteristics: ["close", "near", "surrounding"],
      meaning_tags: ["close", "supportive", "nurturing"],
      interpretation:
        "Flowers close to the cube suggest you feel loved and supported by your social circle.",
    },
    {
      characteristics: ["far", "distant", "isolated"],
      meaning_tags: ["distant", "lonely", "disconnected"],
      interpretation:
        "Flowers far from the cube may indicate feelings of loneliness, disconnection, or a lack of support from others.",
    },
  ],
  weather: [
    {
      characteristics: ["sunny", "bright", "clear"],
      meaning_tags: ["optimistic", "positive", "happy"],
      interpretation:
        "Sunny weather suggests you have a positive outlook on life and are feeling optimistic.",
    },
    {
      characteristics: ["rainy", "stormy", "dark"],
      meaning_tags: ["challenging", "difficult", "overwhelmed"],
      interpretation:
        "Rainy or stormy weather may indicate you are facing challenges or feeling overwhelmed.",
    },
    {
      characteristics: ["foggy", "misty", "unclear"],
      meaning_tags: ["confused", "uncertain", "lost"],
      interpretation:
        "Foggy weather suggests feelings of confusion, uncertainty, or a lack of direction.",
    },
    {
      characteristics: ["windy", "blustery", "changing"],
      meaning_tags: ["change", "transition", "adaptable"],
      interpretation:
        "Windy weather represents a time of change, transition, or a need to be adaptable.",
    },
  ],
  storm: [
    {
      characteristics: ["large", "powerful", "intense"],
      meaning_tags: ["overwhelmed", "stressed", "intense"],
      interpretation:
        "A large and powerful storm suggests you are feeling overwhelmed by challenges and stress.",
    },
    {
      characteristics: ["small", "distant", "passing"],
      meaning_tags: ["manageable", "temporary", "resilient"],
      interpretation:
        "A small or passing storm indicates that you see challenges as manageable and temporary.",
    },
    {
      characteristics: ["violent", "destructive", "threatening"],
      meaning_tags: ["fearful", "vulnerable", "out of control"],
      interpretation:
        "A violent or destructive storm may represent feeling fearful, vulnerable, or out of control.",
    },
    {
      characteristics: ["close", "near", "approaching"],
      meaning_tags: ["imminent", "worried", "anxious"],
      interpretation:
        "A storm that is close to the cube suggests you are facing imminent challenges that are causing worry and anxiety.",
    },
    {
      characteristics: ["far", "distant", "receding"],
      meaning_tags: ["distant", "manageable", "in control"],
      interpretation:
        "A distant or receding storm indicates that you feel more in control of challenges and see them as less threatening.",
    },
  ],
};

// Start the app
function startApp() {
  // ... [Same as before]
}

function beginTest() {
  // ... [Same as before]
}

function showQuestion() {
  // ... [Same as before]
}

function nextQuestion() {
  // ... [Same as before]
}

function showResults() {
  // ... [Same as before]
}

function generateInterpretation(key, userInput) {
  // ... [Same as before]
}

window.onload = startApp;
