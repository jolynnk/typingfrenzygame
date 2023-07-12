const playerInput = document.getElementById("playerInput");

//places all elements into an array
const elementArray = document.querySelectorAll(".element");

let round = 1; //refers to words game by default

round2Button = document.getElementById("round2-button");
round2Button.style.display = "none";

round3Button = document.getElementById("round3-button");
round3Button.style.display = "none";

//ROUND 1
const listOfWords = [
  "jumbled",
  // "simplistic",
  // "spill",
  // "concerned",
  // "reason",
  // "halting",
  // "harm",
  // "silky",
  // "beautiful",
  // "abaft",
  // "structure",
  // "physical",
  // "courageous",
  // "petite",
  // "friendly",
  // "spade",
  // "millennial",
  // "heart",
  // "constant",
  // "function",
  // "loving",
  // "expansion",
  // "abundant",
  // "encouraging",
  // "flowers",
  // "command",
  // "appliance",
  // "middle",
  // "available",
  // "sudden",
  // "slip",
  // "arrogant",
  // "aquatic",
  // "drum",
  // "shocking",
  // "boot",
  // "tease",
  // "zip",
  // "number",
  // "ambitious",
  // "attract",
  // "thought",
  // "spotty",
  // "reflect",
];

//pick out a random and unique word from the list of words
function getRandomWord() {
  const randomWord =
    listOfWords[Math.floor(Math.random() * listOfWords.length)];
  const randomWordIdx = listOfWords.indexOf(randomWord);
  listOfWords.splice(randomWordIdx, 1); //removes the word that has been picked out from the array so that it won't repeat
  return randomWord;
}

//populate boxes with random word
function round1() {
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i].innerText = getRandomWord();
  }
}

//ROUND 2
//generate random equation
function getRandomEquation() {
  const operators = ["+", "-", "*"];
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];
  let randomValue1 = Math.floor(Math.random() * 12);
  let randomValue2 = Math.floor(Math.random() * 10);
  return `${randomValue1}${randomOperator}${randomValue2}`;
}

//populate boxes with random equations
function round2() {
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i].innerText = getRandomEquation();
  }
}

//ROUND 3
const colors = [
  "blue",
  "orange",
  "pink",
  "red",
  "yellow",
  "brown",
  "black",
  "green",
  "grey",
  "purple",
  "gold",
  "silver",
  "darkblue",
  "darkgreen",
  "darkred",
  "darkorange",
];

function getRandomColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomColorIdx = colors.indexOf(randomColor);
  colors.splice(randomColorIdx, 1); //removes the colour that has been picked out from the array so that it won't repeat
  return randomColor;
}

function round3() {
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i].innerText = "Color";
    elementArray[i].style.color = getRandomColor();
  }
}

//score details
let score = document.getElementById("score-number");
let currentScore = 0;

//checks word accuracy
function checkWord() {
  for (const displayedWord of elementArray) {
    if (playerInput.value === displayedWord.innerText) {
      displayedWord.innerText = "";
      currentScore += 3;
      score.innerText = currentScore;
    }
  }
}

//check equation accuracy
function checkNumber() {
  for (const displayedEqn of elementArray) {
    if (playerInput.value == eval(displayedEqn.innerText)) {
      //eval converts string to number and resolves equation
      displayedEqn.innerText = "";
      currentScore += 3;
      score.innerText = currentScore;
    }
  }
}

// function checkSolved(x) {
//   if (playerInput.value == eval(x.innerText)) {
//     x.innerText = "";
//   }
// }

// function checkNumber() {
//   elArr = [];
//   for (const el of elementArray) {
//     elArr.push(el.innerText); //puts all elements into proper array (was considered node list before)
//   }

//   elArr.find(checkSolved);
// }

//check color accuracy
function checkColor() {
  for (const displayedColor of elementArray) {
    if (playerInput.value == displayedColor.style.color) {
      displayedColor.innerText = "";
      currentScore += 3;
      score.innerText = currentScore;
    }
  }
}

//check if all elements are typed and board is clear
function checkAllTyped() {
  elArr = [];
  for (const el of elementArray) {
    elArr.push(el.innerText); //puts all elements into proper array (was considered node list before)
  }

  //to check if element box is empty. no need ".innertext" as checking array element directly via "every" which is an array iterator
  function checkEl(x) {
    return x == "";
  }

  //put above function into "every" iterator to check that EVERY element box is empty
  if (elArr.every(checkEl) && round === 1) {
    round2Button.style.display = "block";
    startButton.style.display = "none";
  } else if (elArr.every(checkEl) && round === 2) {
    round2Button.style.display = "none";
    round3Button.style.display = "block";
    startButton.style.display = "none";
  }
}

//to accept player input when enter button pressed. source: https://blog.devgenius.io/how-to-detect-the-pressing-of-the-enter-key-in-a-text-input-field-with-javascript-380fb2be2b9e
playerInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (round === 1) {
      checkWord();
      checkAllTyped();
    } else if (round === 2) {
      checkNumber();
      checkAllTyped();
    } else if (round === 3) {
      checkColor();
    }
    playerInput.value = ""; //clears input field after enter button pressed
  }
});

const startButton = document.getElementById("start-button");
let timerNumber = document.getElementById("timer-number");
const timer = document.querySelector("timer");

//create 30s countdown timer
let timeLeft = 80;
const timerText = document.getElementById("timer-fulltext");

function countdown() {
  const timerId = setTimeout(countdown, 1000);
  timerNumber.innerText = timeLeft;
  if (timeLeft > 0 && timeLeft < 81) {
    timeLeft--;
  } else if (timeLeft === 0) {
    // timerText.innerText = "TIME'S UP!";
    timerText.style.color = "red";
    playerInput.style.display = "none";
    startButton.style.display = "none";
    round2Button.style.display = "none";
    round3Button.style.display = "none";
  }
}

//activate countdown timer on "start game" button click
startButton.addEventListener("click", function () {
  round1();
  countdown();
});

//start round 2 when button clicked
round2Button.addEventListener("click", function () {
  round = 2;
  round2();
});

//start round 3 when button clicked
round3Button.addEventListener("click", function () {
  round = 3;
  round3();
  startButton.style.display = "none";
  round2Button.style.display = "none";
  round3Button.style.display = "none";
});

//congrats word when finished game
//do random equations and source for answer when answer is typed, not to calculate everything in advance
//game over if not all words typed
//source words from word generator. https://www.section.io/engineering-education/how-to-build-a-speedtyping-game-using-javascript/
//use map to create array of answers of eqn. findindex, splice.
