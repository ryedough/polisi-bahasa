export interface Choice {
    text : string,
    correct : boolean,
}
export interface Question {
    text : string,
    choices : [Choice, Choice, Choice, Choice],
    noRightChoice : boolean,
}

export function shuffle<T>(array: [T,T,T,T]): [T,T,T,T] {
    let currentIndex : number = array.length
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
};

function createQuestion(text : string,a : string, b : string, c : string, d : string, correct : "a" | "b" | "c" | "d" | null) : Question{
    return {
        text,
        choices : shuffle([
            {text : a, correct : correct == 'a'},
            {text : b, correct : correct == 'b'},
            {text : c, correct : correct == 'c'},
            {text : d, correct : correct == 'd'},
        ]),
        noRightChoice : correct === null,
    }
}

export function getQuestions(n : number) {
  const shuffled = [...masterQuestion];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  // Return the first N elements
  return shuffled.slice(0, n);
}

const masterQuestion : Question[] = [
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "right",
        "wrong",
        "wrong",
        "wrong",
        "a"
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
    createQuestion(
        "Placeholder question",
        "wrong",
        "wrong",
        "wrong",
        "wrong",
        null
    ),
];
