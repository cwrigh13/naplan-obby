export type Domain = 'Numeracy' | 'Literacy' | 'Language Conventions';
export type Category = 'Spelling' | 'Grammar' | 'Punctuation' | 'Reading' | 'Number' | 'Measurement' | 'Geometry' | 'Patterns';

export interface Question {
  id: number;
  domain: Domain;
  category: Category;
  skill: string;
  text: string;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
  visualData?: string; // For math problems
  year?: number;
}

export const QUESTIONS: Question[] = [
  // --- 2016 NAPLAN Questions ---
  {
    id: 201,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Correct Spelling',
    text: "Which word is spelled correctly?",
    options: ["freind", "friend", "frend", "frind"],
    correctAnswer: 1,
    explanation: "'Friend' is a common word. Remember: 'i' before 'e' except after 'c'.",
    year: 2016
  },
  {
    id: 202,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Pronouns',
    text: "Tom and Sam are brothers. _____ like to play football.",
    options: ["He", "She", "They", "We"],
    correctAnswer: 2,
    explanation: "We use 'They' to talk about more than one person.",
    year: 2016
  },
  {
    id: 203,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Addition',
    text: "What is 24 + 13?",
    options: ["31", "37", "47", "33"],
    correctAnswer: 1,
    explanation: "20 + 10 = 30, and 4 + 3 = 7. So 30 + 7 = 37.",
    year: 2016
  },
  {
    id: 204,
    domain: 'Numeracy',
    category: 'Measurement',
    skill: 'Time',
    text: "A movie starts at 2:00 and ends at 3:30. How long was the movie?",
    options: ["1 hour", "1 hour 30 minutes", "2 hours", "30 minutes"],
    correctAnswer: 1,
    explanation: "From 2:00 to 3:00 is 1 hour. Then 30 more minutes makes it 1 hour 30 minutes.",
    year: 2016
  },
  {
    id: 209,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Counting',
    text: "Which number comes after 99?",
    options: ["98", "100", "101", "110"],
    correctAnswer: 1,
    explanation: "When we count, 100 comes after 99.",
    year: 2016
  },
  {
    id: 210,
    domain: 'Numeracy',
    category: 'Geometry',
    skill: 'Shapes',
    text: "Which of these is a cube?",
    options: ["A ball", "A dice", "A pencil", "A coin"],
    correctAnswer: 1,
    explanation: "A dice is a cube because it has 6 square faces.",
    year: 2016
  },
  {
    id: 211,
    domain: 'Literacy',
    category: 'Reading',
    skill: 'Comprehension',
    text: "The cat sat on the mat. Where did the cat sit?",
    options: ["On the chair", "On the mat", "In the box", "Under the table"],
    correctAnswer: 1,
    explanation: "The sentence says the cat sat on the mat.",
    year: 2016
  },
  {
    id: 212,
    domain: 'Literacy',
    category: 'Spelling',
    skill: 'Correct Spelling',
    text: "Which word is spelled correctly?",
    options: ["skool", "school", "scool", "shool"],
    correctAnswer: 1,
    explanation: "School is spelled with 'ch'.",
    year: 2016
  },

  // --- 2015 NAPLAN Questions ---
  {
    id: 205,
    domain: 'Language Conventions',
    category: 'Punctuation',
    skill: 'Capital Letters',
    text: "Which word needs a capital letter? 'we went to melbourne for a holiday.'",
    options: ["we", "went", "melbourne", "holiday"],
    correctAnswer: 2,
    explanation: "Melbourne is the name of a city, so it needs a capital letter.",
    year: 2015
  },
  {
    id: 206,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Plurals',
    text: "The cat caught two _____.",
    options: ["mouses", "mice", "mices", "mouse"],
    correctAnswer: 1,
    explanation: "The plural of 'mouse' is 'mice'.",
    year: 2015
  },
  {
    id: 207,
    domain: 'Numeracy',
    category: 'Geometry',
    skill: '2D Shapes',
    text: "How many corners does a triangle have?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "A triangle has 3 sides and 3 corners.",
    year: 2015
  },
  {
    id: 208,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Subtraction',
    text: "What is 50 - 15?",
    options: ["30", "35", "45", "40"],
    correctAnswer: 1,
    explanation: "50 - 10 = 40, then 40 - 5 = 35.",
    year: 2015
  },
  {
    id: 213,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Addition',
    text: "What is 10 + 10 + 10?",
    options: ["20", "30", "40", "50"],
    correctAnswer: 1,
    explanation: "Three tens make thirty.",
    year: 2015
  },
  {
    id: 214,
    domain: 'Numeracy',
    category: 'Measurement',
    skill: 'Length',
    text: "Which is longer?",
    options: ["1 cm", "10 cm", "1 metre", "50 cm"],
    correctAnswer: 2,
    explanation: "1 metre is 100 cm, which is longer than the others.",
    year: 2015
  },
  {
    id: 215,
    domain: 'Literacy',
    category: 'Reading',
    skill: 'Inference',
    text: "The sun was shining and the birds were singing. What kind of day was it?",
    options: ["Rainy", "Sunny", "Snowy", "Windy"],
    correctAnswer: 1,
    explanation: "The sun shining means it was a sunny day.",
    year: 2015
  },
  {
    id: 216,
    domain: 'Literacy',
    category: 'Grammar',
    skill: 'Nouns',
    text: "Which word is a naming word (noun)?",
    options: ["Run", "Jump", "Apple", "Fast"],
    correctAnswer: 2,
    explanation: "Apple is a thing, so it is a noun.",
    year: 2015
  },
  {
    id: 217,
    domain: 'Language Conventions',
    category: 'Punctuation',
    skill: 'Full Stops',
    text: "Where does the full stop go? 'The dog barked'",
    options: ["Before 'The'", "After 'dog'", "After 'barked'", "No full stop needed"],
    correctAnswer: 2,
    explanation: "A full stop goes at the end of a sentence.",
    year: 2015
  },
  {
    id: 218,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Vowels',
    text: "Which word has the 'ee' sound?",
    options: ["Bed", "Tree", "Ten", "Red"],
    correctAnswer: 1,
    explanation: "Tree has the long 'e' sound.",
    year: 2015
  },
  
  // --- 2011 NAPLAN Questions ---
  {
    id: 219,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Verbs',
    text: "I _____ my breakfast this morning.",
    options: ["eat", "ate", "eaten", "eating"],
    correctAnswer: 1,
    explanation: "Ate is the past tense of eat.",
    year: 2011
  },
  {
    id: 220,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Correct Spelling',
    text: "Which word is spelled correctly?",
    options: ["playd", "played", "plaid", "playid"],
    correctAnswer: 1,
    explanation: "Played is the past tense of play.",
    year: 2011
  },
  {
    id: 221,
    domain: 'Language Conventions',
    category: 'Punctuation',
    skill: 'Question Marks',
    text: "Which sentence needs a question mark?",
    options: ["I am happy", "Where are you going", "The sun is hot", "Look at that"],
    correctAnswer: 1,
    explanation: "'Where are you going' is a question.",
    year: 2011
  },
  {
    id: 222,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Adjectives',
    text: "The _____ elephant was very big.",
    options: ["blue", "fast", "huge", "loud"],
    correctAnswer: 2,
    explanation: "Huge means very big.",
    year: 2011
  },

  // --- Language Conventions Questions (Based on Year 3 Standards) ---
  
  // Spelling
  {
    id: 101,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Correct Spelling',
    text: "Which word is spelled correctly?",
    options: ["becuz", "because", "becuse", "bakause"],
    correctAnswer: 1,
    explanation: "'Because' is a common word we use to give a reason."
  },
  {
    id: 102,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Plurals',
    text: "The farmer has three _____.",
    options: ["sheeps", "sheep", "sheepes", "sheeps'"],
    correctAnswer: 1,
    explanation: "The plural of 'sheep' is just 'sheep'. It doesn't change!"
  },
  {
    id: 103,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Vowel Digraphs',
    text: "Which word completes the sentence? 'The boat will _____ on the water.'",
    options: ["flote", "float", "flowt", "flout"],
    correctAnswer: 1,
    explanation: "'Float' uses the 'oa' pattern to make the long 'o' sound."
  },
  {
    id: 104,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Double Letters',
    text: "Choose the correct spelling:",
    options: ["hapy", "happy", "hapee", "happey"],
    correctAnswer: 1,
    explanation: "'Happy' has a double 'p' in the middle."
  },

  // Grammar
  {
    id: 105,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Verb Tense',
    text: "Yesterday, I _____ to the park.",
    options: ["go", "goed", "went", "going"],
    correctAnswer: 2,
    explanation: "The past tense of 'go' is 'went'."
  },
  {
    id: 106,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Subject-Verb Agreement',
    text: "The dogs _____ barking loudly.",
    options: ["is", "are", "was", "am"],
    correctAnswer: 1,
    explanation: "Since 'dogs' is plural (more than one), we use 'are'."
  },
  {
    id: 107,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Pronouns',
    text: "Sarah hurt _____ knee.",
    options: ["she", "her", "hers", "him"],
    correctAnswer: 1,
    explanation: "We use 'her' to show something belongs to a girl or woman."
  },
  {
    id: 108,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Articles',
    text: "I saw _____ elephant at the zoo.",
    options: ["a", "an", "the", "two"],
    correctAnswer: 1,
    explanation: "We use 'an' before words that start with a vowel sound, like 'elephant'."
  },

  // Punctuation
  {
    id: 109,
    domain: 'Language Conventions',
    category: 'Punctuation',
    skill: 'Sentence Endings',
    text: "Which sentence is correct?",
    options: ["Did you see that.", "Did you see that?", "Did you see that!", "Did you see that,"],
    correctAnswer: 1,
    explanation: "It is a question, so it needs a question mark at the end."
  },
  {
    id: 110,
    domain: 'Language Conventions',
    category: 'Punctuation',
    skill: 'Capitalization',
    text: "Which sentence has correct capital letters?",
    options: ["my dog is named spot.", "My dog is named Spot.", "My Dog is named Spot.", "my dog is named Spot."],
    correctAnswer: 1,
    explanation: "Sentences start with a capital, and names (proper nouns) like 'Spot' need a capital."
  },
  {
    id: 111,
    domain: 'Language Conventions',
    category: 'Punctuation',
    skill: 'Contractions',
    text: "Which is the short way to say 'do not'?",
    options: ["dont", "don't", "do'nt", "d'ont"],
    correctAnswer: 1,
    explanation: "The apostrophe takes the place of the 'o' in 'not'."
  },
  {
    id: 112,
    domain: 'Language Conventions',
    category: 'Punctuation',
    skill: 'Commas in Lists',
    text: "I like to eat _____.",
    options: ["apples bananas and grapes", "apples, bananas, and grapes", "apples bananas, and grapes", "apples, bananas and, grapes"],
    correctAnswer: 1,
    explanation: "We use commas to separate items in a list."
  },
  {
    id: 113,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Common Misspellings',
    text: "Which word is spelled correctly?",
    options: ["sed", "said", "sayed", "siad"],
    correctAnswer: 1,
    explanation: "'Said' is the correct spelling for the past tense of say."
  },
  {
    id: 114,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Conjunctions',
    text: "I wanted to go outside, _____ it was raining.",
    options: ["so", "but", "and", "or"],
    correctAnswer: 1,
    explanation: "'But' is used to connect ideas that contrast or are different."
  },
  {
    id: 115,
    domain: 'Language Conventions',
    category: 'Punctuation',
    skill: 'Apostrophes',
    text: "Which sentence uses the apostrophe correctly?",
    options: ["The dogs bone is big.", "The dog's bone is big.", "The dogs' bone is big.", "The dog is bone is big."],
    correctAnswer: 1,
    explanation: "The bone belongs to one dog, so we use 'dog's'."
  },
  {
    id: 116,
    domain: 'Language Conventions',
    category: 'Grammar',
    skill: 'Prepositions',
    text: "The cat is hiding _____ the table.",
    options: ["under", "between", "into", "off"],
    correctAnswer: 0,
    explanation: "'Under' tells us where the cat is in relation to the table."
  },
  {
    id: 117,
    domain: 'Language Conventions',
    category: 'Spelling',
    skill: 'Silent Letters',
    text: "Which word has a silent letter?",
    options: ["jump", "knee", "lamp", "desk"],
    correctAnswer: 1,
    explanation: "'Knee' has a silent 'k' at the beginning."
  },

  // Literacy - Spelling
  {
    id: 1,
    domain: 'Literacy',
    category: 'Spelling',
    skill: 'Commonly misspelled words',
    text: "Which word is spelled correctly in this sentence? 'The rocket will _____ tomorrow.'",
    options: ["launch", "lounch", "launsh", "lanch"],
    correctAnswer: 0,
    explanation: "'Launch' is spelled with 'au'. It means to start or set in motion."
  },
  {
    id: 2,
    domain: 'Literacy',
    category: 'Spelling',
    skill: 'Suffixes',
    text: "Choose the correct spelling to complete the word: 'The astronaut was very help____.'",
    options: ["full", "ful", "fule", "fall"],
    correctAnswer: 1,
    explanation: "The suffix '-ful' (meaning full of) only has one 'l' at the end of a word."
  },
  {
    id: 18,
    domain: 'Literacy',
    category: 'Spelling',
    skill: 'Compound Words',
    text: "Which word is a compound word?",
    options: ["Space", "Spaceship", "Flying", "Rocket"],
    correctAnswer: 1,
    explanation: "A compound word is two words joined together: Space + Ship = Spaceship."
  },
  {
    id: 21,
    domain: 'Literacy',
    category: 'Spelling',
    skill: 'Plurals',
    text: "What is the correct plural of 'galaxy'?",
    options: ["galaxys", "galaxies", "galaxyes", "galaxys'"],
    correctAnswer: 1,
    explanation: "For words ending in 'y', we usually change the 'y' to 'i' and add 'es'."
  },
  {
    id: 22,
    domain: 'Literacy',
    category: 'Spelling',
    skill: 'Vowel Sounds',
    text: "Which word has the same sound as 'moon'?",
    options: ["bone", "tune", "done", "gone"],
    correctAnswer: 1,
    explanation: "'Tune' and 'moon' share the long 'oo' sound."
  },

  // Literacy - Grammar
  {
    id: 3,
    domain: 'Literacy',
    category: 'Grammar',
    skill: 'Verbs',
    text: "Which word is the verb (doing word) in this sentence? 'The stars shine brightly in the sky.'",
    options: ["stars", "shine", "brightly", "sky"],
    correctAnswer: 1,
    explanation: "'Shine' is the action happening in the sentence."
  },
  {
    id: 4,
    domain: 'Literacy',
    category: 'Grammar',
    skill: 'Adjectives',
    text: "Which word is an adjective (describing word)? 'The giant planet has many rings.'",
    options: ["giant", "planet", "has", "rings"],
    correctAnswer: 0,
    explanation: "'Giant' describes the size of the planet."
  },
  {
    id: 23,
    domain: 'Literacy',
    category: 'Grammar',
    skill: 'Tense',
    text: "Which sentence is in the past tense?",
    options: ["The rocket lands.", "The rocket will land.", "The rocket landed.", "The rocket is landing."],
    correctAnswer: 2,
    explanation: "Verbs ending in '-ed' often show that something has already happened."
  },
  {
    id: 24,
    domain: 'Literacy',
    category: 'Grammar',
    skill: 'Conjunctions',
    text: "Choose the best joining word: 'I wanted to go to Mars, ____ it was too far.'",
    options: ["so", "but", "and", "because"],
    correctAnswer: 1,
    explanation: "'But' is used to show a contrast or problem."
  },

  // Literacy - Punctuation
  {
    id: 5,
    domain: 'Literacy',
    category: 'Punctuation',
    skill: 'Question Marks',
    text: "Which sentence uses the correct punctuation?",
    options: [
      "Where is the moon.",
      "Where is the moon!",
      "Where is the moon?",
      "Where is the moon,"
    ],
    correctAnswer: 2,
    explanation: "Sentences that ask something must end with a question mark."
  },
  {
    id: 6,
    domain: 'Literacy',
    category: 'Punctuation',
    skill: 'Capital Letters',
    text: "Which word in this sentence needs a capital letter? 'my friend lives in sydney.'",
    options: ["friend", "lives", "sydney", "in"],
    correctAnswer: 2,
    explanation: "Names of cities (proper nouns) always start with a capital letter."
  },
  {
    id: 25,
    domain: 'Literacy',
    category: 'Punctuation',
    skill: 'Commas',
    text: "Where should the comma go? 'We packed apples bananas and pears.'",
    options: ["After apples", "After packed", "After pears", "No comma needed"],
    correctAnswer: 0,
    explanation: "We use commas to separate items in a list: 'apples, bananas and pears'."
  },
  {
    id: 26,
    domain: 'Literacy',
    category: 'Punctuation',
    skill: 'Apostrophes',
    text: "Which shows that the helmet belongs to Tom?",
    options: ["Toms helmet", "Tom's helmet", "Toms' helmet", "Tom is helmet"],
    correctAnswer: 1,
    explanation: "We use an apostrophe and 's' ('s) to show ownership."
  },

  // Literacy - Reading
  {
    id: 14,
    domain: 'Literacy',
    category: 'Reading',
    skill: 'Inference',
    text: "Read this: 'Sam put on his heavy boots and thick coat. He grabbed his oxygen tank.' Where is Sam going?",
    options: ["To the beach", "To bed", "Into space", "To the park"],
    correctAnswer: 2,
    explanation: "Oxygen tanks and heavy gear suggest a space mission."
  },
  {
    id: 15,
    domain: 'Literacy',
    category: 'Reading',
    skill: 'Main Idea',
    text: "What is the best title for a story about a robot learning to dance?",
    options: ["The Rusty Robot", "The Robot's New Moves", "How to Build a Robot", "The Quiet Robot"],
    correctAnswer: 1,
    explanation: "'The Robot's New Moves' matches the idea of learning to dance."
  },
  {
    id: 27,
    domain: 'Literacy',
    category: 'Reading',
    skill: 'Cause and Effect',
    text: "The rocket engine failed, so the launch was cancelled. What was the cause?",
    options: ["The launch was cancelled", "The engine failed", "It was sunny", "The pilot was late"],
    correctAnswer: 1,
    explanation: "The engine failing is the reason (cause) that the launch stopped."
  },
  {
    id: 28,
    domain: 'Literacy',
    category: 'Reading',
    skill: 'Sequencing',
    text: "What happens last? 1. Put on suit. 2. Enter rocket. 3. Buckle up. 4. Launch.",
    options: ["Put on suit", "Enter rocket", "Buckle up", "Launch"],
    correctAnswer: 3,
    explanation: "Launching happens at the end of the sequence."
  },

  // Numeracy - Number
  {
    id: 7,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Addition',
    text: "A spaceship has 15 crew members. 7 more join at the space station. How many are there now?",
    options: ["20", "21", "22", "23"],
    correctAnswer: 2,
    explanation: "15 + 7 = 22. You can count on from 15: 16, 17, 18, 19, 20, 21, 22."
  },
  {
    id: 8,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Place Value',
    text: "What is the value of the 4 in the number 432?",
    options: ["4", "40", "400", "4000"],
    correctAnswer: 2,
    explanation: "In 432, the 4 is in the hundreds column, so its value is 400."
  },
  {
    id: 9,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Subtraction',
    text: "There were 50 moon rocks. An alien took 12. How many are left?",
    options: ["32", "38", "42", "48"],
    correctAnswer: 1,
    explanation: "50 - 10 = 40, then 40 - 2 = 38."
  },
  {
    id: 19,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Multiplication',
    text: "There are 4 rockets. Each rocket has 5 engines. How many engines are there in total?",
    options: ["9", "15", "20", "25"],
    correctAnswer: 2,
    explanation: "4 groups of 5 is 4 x 5 = 20."
  },
  {
    id: 20,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Fractions',
    text: "What is half of 12?",
    options: ["4", "6", "8", "10"],
    correctAnswer: 1,
    explanation: "Half means dividing by 2. 12 ÷ 2 = 6."
  },
  {
    id: 29,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Division',
    text: "Share 15 stars equally among 3 aliens. How many does each get?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation: "15 shared by 3 is 5. 3 x 5 = 15."
  },
  {
    id: 30,
    domain: 'Numeracy',
    category: 'Number',
    skill: 'Money',
    text: "A space burger costs $4. How much for 2 burgers?",
    options: ["$6", "$8", "$10", "$42"],
    correctAnswer: 1,
    explanation: "$4 + $4 = $8."
  },

  // Numeracy - Patterns
  {
    id: 10,
    domain: 'Numeracy',
    category: 'Patterns',
    skill: 'Number Sequences',
    text: "What is the next number in this pattern? 5, 10, 15, 20, ___",
    options: ["21", "25", "30", "35"],
    correctAnswer: 1,
    explanation: "The pattern is counting up by 5 each time."
  },
  {
    id: 11,
    domain: 'Numeracy',
    category: 'Patterns',
    skill: 'Skip Counting',
    text: "Which number is missing? 24, 21, 18, ___, 12",
    options: ["17", "16", "15", "14"],
    correctAnswer: 2,
    explanation: "The pattern is counting backwards by 3."
  },
  {
    id: 31,
    domain: 'Numeracy',
    category: 'Patterns',
    skill: 'Shape Patterns',
    text: "Star, Moon, Star, Moon, Star, ___",
    options: ["Sun", "Star", "Moon", "Planet"],
    correctAnswer: 2,
    explanation: "The pattern repeats: Star, Moon. After Star comes Moon."
  },

  // Numeracy - Measurement
  {
    id: 12,
    domain: 'Numeracy',
    category: 'Measurement',
    skill: 'Time',
    text: "If a mission starts at 10:30 am and lasts for 1 hour, what time does it finish?",
    options: ["11:00 am", "11:30 am", "12:00 pm", "11:30 pm"],
    correctAnswer: 1,
    explanation: "One hour after 10:30 am is 11:30 am."
  },
  {
    id: 13,
    domain: 'Numeracy',
    category: 'Measurement',
    skill: 'Length',
    text: "Which unit would you use to measure the length of a pencil?",
    options: ["metres", "centimetres", "kilometres", "litres"],
    correctAnswer: 1,
    explanation: "Centimetres (cm) are used for small objects like pencils."
  },
  {
    id: 32,
    domain: 'Numeracy',
    category: 'Measurement',
    skill: 'Mass',
    text: "Which is heavier?",
    options: ["A feather", "A space shuttle", "A cat", "A pencil"],
    correctAnswer: 1,
    explanation: "A space shuttle is a huge machine, much heavier than the others."
  },
  {
    id: 33,
    domain: 'Numeracy',
    category: 'Measurement',
    skill: 'Volume',
    text: "Which container holds the most water?",
    options: ["A teaspoon", "A cup", "A bathtub", "A bucket"],
    correctAnswer: 2,
    explanation: "A bathtub is the largest container listed."
  },

  // Numeracy - Geometry
  {
    id: 16,
    domain: 'Numeracy',
    category: 'Geometry',
    skill: '3D Shapes',
    text: "Which shape is like a ball?",
    options: ["Cube", "Cylinder", "Sphere", "Cone"],
    correctAnswer: 2,
    explanation: "A sphere is a perfectly round 3D shape, just like a ball or a planet."
  },
  {
    id: 17,
    domain: 'Numeracy',
    category: 'Geometry',
    skill: '2D Shapes',
    text: "How many sides does a pentagon have?",
    options: ["4", "5", "6", "8"],
    correctAnswer: 1,
    explanation: "A pentagon is a 2D shape with 5 straight sides."
  },
  {
    id: 34,
    domain: 'Numeracy',
    category: 'Geometry',
    skill: 'Position',
    text: "The astronaut is standing ON the moon. Where is the moon?",
    options: ["Above the astronaut", "Under the astronaut", "Next to the astronaut", "Behind the astronaut"],
    correctAnswer: 1,
    explanation: "If you are standing on something, it is under you."
  },
  {
    id: 35,
    domain: 'Numeracy',
    category: 'Geometry',
    skill: 'Directions',
    text: "If you turn right three times, which way have you turned in total?",
    options: ["Right", "Left", "Backwards", "270 degrees right"],
    correctAnswer: 3,
    explanation: "Each turn is 90 degrees. 3 turns is 270 degrees."
  }
];
