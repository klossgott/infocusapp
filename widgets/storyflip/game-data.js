export class GameData {
    constructor() {
        this.instructions = [
            [
                "Welcome, Storytellers",
                "Set a timer for how long you want to play.",
                "Listen carefully, pick up on developments, and keep the story going.",
                "What happens next? Take turns to tell each other, or type in the chat. You have 20 seconds."
            ],
            [
                "Press:",
                "'W' for a Wildcard, if you're stuck.",
                "'Space Bar' to Pause-and-tell.",
                "'N' for a new game, 'X' to exit.",
                "Click the card to flip, get inspired, and start telling!"
            ]
        ];

        this.storyElements = {
            setting: [],
            character: [],
            action: [],
            emotion: [],
            object: [],
            dialogue: [],
            conflict: [],
            resolution: []
        };

        this.wildcards = [];
        this.numberCards = [];
        this.storyRhythm = [];
        this.openStoryDrivers = [];
        this.gameMaster = [];
    }
}
