const playerInput = document.getElementById("playerInput");

//places all elements into a node list to be iterated through when checking against player input
const elementArray = document.querySelectorAll(".element");

const startButton = document.getElementById("start-button");

const round2Button = document.getElementById("round2-button");
round2Button.style.display = "none";

const round3Button = document.getElementById("round3-button");
round3Button.style.display = "none";

const victory = document.getElementById("victory");
victory.style.display = "none";

let round = 1; //refers to words game by default

//ROUND 1
const listOfWords = [
  "jumbled",
  "simplistic",
  "spill",
  "concerned",
  "reason",
  "halting",
  "silky",
  "beautiful",
  "structure",
  "physical",
  "courageous",
  "petite",
  "friendly",
  "spade",
  "millennial",
  "heart",
  "loving",
  "expansion",
  "abundant",
  "encouraging",
  "flowers",
  "command",
  "appliance",
  "middle",
  "available",
  "sudden",
  "arrogant",
  "aquatic",
  "shocking",
  "boot",
  "tease",
];

//pick out a random word from list of words
function getRandomWord() {
  const randomWord =
    listOfWords[Math.floor(Math.random() * listOfWords.length)];
  const randomWordIdx = listOfWords.indexOf(randomWord);
  listOfWords.splice(randomWordIdx, 1); //removes the word that has been picked out from the array so no duplicates
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
  "white",
  "green",
  "grey",
  "purple",
  "gold",
  "silver",
  "aqua",
  "coral",
  "maroon",
  "lime",
];

//generate random colour
function getRandomColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomColorIdx = colors.indexOf(randomColor);
  colors.splice(randomColorIdx, 1); //removes the colour that has been picked out from the array so no duplicates
  return randomColor;
}

//populate boxes with random colour
function round3() {
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i].innerText = "Color";
    elementArray[i].style.color = getRandomColor();
  }
}

//scoring
let score = document.getElementById("score-number");
let currentScore = 0;

//checks word accuracy and increases score
function checkWord() {
  for (const displayedWord of elementArray) {
    if (playerInput.value === displayedWord.innerText) {
      displayedWord.innerText = "";
      currentScore += 3;
      score.innerText = currentScore;
    }
  }
}

//check equation accuracy and increases score
function checkNumber() {
  function checkAns(x) {
    return playerInput.value == eval(x);
  }

  array = [];
  for (const element of elementArray) {
    array.push(element.innerText);
  }

  //find idx of the element that matches player input
  let findIdx = array.findIndex(checkAns);

  //if idx above 0, matching element was found
  if (findIdx >= 0) {
    elementArray[findIdx].innerText = "";
    currentScore += 3;
    score.innerText = currentScore;
  }
}

//check colour accuracy and increases score
function checkColor() {
  for (const displayedColor of elementArray) {
    console.log(elementArray);
    if (playerInput.value == displayedColor.style.color) {
      displayedColor.innerText = ""; //word disappears from div
      currentScore += 3;
      score.innerText = currentScore;
      displayedColor.style.color = ""; //color removed from element so no duplicated score
    }
  }
}

//check if all elements are typed / board is clear
function checkAllTyped() {
  elArr = [];
  for (const el of elementArray) {
    elArr.push(el.innerText); //push elements into array
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
  } else if (elArr.every(checkEl) && round === 3) {
    timerText.style.display = "none";
    victory.style.display = "block";
    playerInput.style.display = "none";
  }
}

//to accept player input when enter button pressed and run check functions accordingly. source: https://blog.devgenius.io/how-to-detect-the-pressing-of-the-enter-key-in-a-text-input-field-with-javascript-380fb2be2b9e
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
      checkAllTyped();
    }
    playerInput.value = ""; //clears input field after enter button pressed
  }
});

//countdown timer
let timerNumber = document.getElementById("timer-number");
const timer = document.querySelector("timer");
const timerText = document.getElementById("timer-fulltext");
let timeLeft = 60;

function countdown() {
  const timerId = setTimeout(countdown, 1000);
  timerNumber.innerText = timeLeft;
  if (timeLeft > 0) {
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
  round1(); //boxes to be populated with words
  countdown(); //countdown begins
  startButton.style.display = "none";
});

//start round 2 when button clicked
round2Button.addEventListener("click", function () {
  round = 2;
  round2(); //boxes to be populated with eqns
  round2Button.style.display = "none";
});

//start round 3 when button clicked
round3Button.addEventListener("click", function () {
  round = 3;
  round3(); //boxes to be populated with colours
  round3Button.style.display = "none";
});
