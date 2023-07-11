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

//pick out a random word from the list of words
function getRandomWord() {
  return listOfWords[Math.floor(Math.random() * listOfWords.length)];
}

//populate boxes with random word
function round1() {
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i].innerText = getRandomWord();
  }
}

//ROUND 2
const listOfEquations = [
  "5 * 7",
  // "40 / 8",
  // "37 * 2",
  // "1 + 2",
  // "3 + 8",
  // "4 + 5",
  // "2 * 6",
  // "14 * 3",
  // "20 / 2",
  // "7 * 7",
  // "8 * 8",
  // "10 * 10",
  // "68 - 30",
];

//pick out random equation from list of equations
function getRandomEquation() {
  return listOfEquations[Math.floor(Math.random() * listOfEquations.length)];
}

//populate boxes with random equations
function round2() {
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i].innerText = getRandomEquation();
    // elementArray[i].style.color = "blue";
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
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
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
      currentScore++;
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
      currentScore++;
      score.innerText = currentScore;
    }
  }
}

//check color accuracy
function checkColor() {
  for (const displayedColor of elementArray) {
    if (playerInput.value == displayedColor.style.color) {
      displayedColor.innerText = "";
      currentScore++;
      score.innerText = currentScore;
    }
  }
}

//check if all elements are typed
function checkAllTyped() {
  for (const checkElements of elementArray) {
    console.log(checkElements.innerText);
    if (round === 1 && checkElements.innerText == "") {
      round2Button.style.display = "block";
    } else if (round === 2 && checkElements.innerText == "") {
      round3Button.style.display = "block";
      round2Button.style.display = "none";
    }
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
let timeLeft = 10;
const timerText = document.getElementById("timer-fulltext");

function countdown() {
  const timerId = setTimeout(countdown, 1000);
  timerNumber.innerText = timeLeft;
  if (timeLeft > 0 && timeLeft < 61) {
    timeLeft--;
  } else if (timeLeft === 0) {
    timerText.innerText = "TIME'S UP!";
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

round2Button.addEventListener("click", function () {
  round = 2;
  round2();
  countdown();
});

round3Button.addEventListener("click", function () {
  round = 3;
  round3();
  countdown();
});

//congrats word when finished game
//do random equations and source for answer when answer is typed, not to calculate everything in advance
//aesthetics - background, font type etc
//insert unique word into boxes. either this or destroy only 1 of the items when typed
//game over if not all words typed
//source words from word generator. https://www.section.io/engineering-education/how-to-build-a-speedtyping-game-using-javascript/
