let listOfWords = [
  "jumbled",
  "simplistic",
  "spill",
  "concerned",
  "reason",
  "halting",
  "harm",
  "silky",
  "beautiful",
  "abaft",
  "structure",
  "physical",
  "courageous",
  "petite",
  "friendly",
  "spade",
  // "millennial",
  // "heart",
  // "constant",
  // "function",
];

//this function picks out a random word from the list of words
function getRandomWord() {
  return listOfWords[Math.floor(Math.random() * listOfWords.length)];
}

let element1 = document.querySelector(".element-1");
element1.innerText = getRandomWord();

let element2 = document.querySelector(".element-2");
element2.innerText = getRandomWord();

let element3 = document.querySelector(".element-3");
element3.innerText = getRandomWord();

let element4 = document.querySelector(".element-4");
element4.innerText = getRandomWord();

let element5 = document.querySelector(".element-5");
element5.innerText = getRandomWord();

let element6 = document.querySelector(".element-6");
element6.innerText = getRandomWord();

let element7 = document.querySelector(".element-7");
element7.innerText = getRandomWord();

let element8 = document.querySelector(".element-8");
element8.innerText = getRandomWord();

let element9 = document.querySelector(".element-9");
element9.innerText = getRandomWord();

let element10 = document.querySelector(".element-10");
element10.innerText = getRandomWord();

let element11 = document.querySelector(".element-11");
element11.innerText = getRandomWord();

let element12 = document.querySelector(".element-12");
element12.innerText = getRandomWord();

let element13 = document.querySelector(".element-13");
element13.innerText = getRandomWord();

let element14 = document.querySelector(".element-14");
element14.innerText = getRandomWord();

let element15 = document.querySelector(".element-15");
element15.innerText = getRandomWord();

let element16 = document.querySelector(".element-16");
element16.innerText = getRandomWord();

let score = document.querySelector("span");
let currentScore = 0;

function checkPlayerInput() {
  let playerInput = document.getElementById("playerInput").value;
  console.log(`Player typed "${playerInput}"`);
  for (arrayWords of listOfWords) {
    if (playerInput === arrayWords) {
      console.log("Submission is correct!");
      currentScore++;
      score.innerText = currentScore;
      arrayWords = "hello"; //code to make the word disappear from box. not working, what's happening now is that you're just removing the word from the array, not from the actual box
    } else if (playerInput !== arrayWords) {
      console.log("Submission is inaccurate"); //issue: checking playerInput vs all other 15 array words too hence logging inaccurate. need to check 1
    }
  }
}

const button = document.querySelector("button");
button.addEventListener("click", checkPlayerInput);

//input field to accept "enter" instead of click
//codes to run once. currently score x2
//make timer countdown
//words to disappear when typed
