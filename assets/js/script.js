var timerEl = document.querySelector(".timer");
var title = document.querySelector(".title");
var info = document.querySelector(".instructions");
var startBtn = document.querySelector("#start-button");
var questionSec = document.querySelector("#question-section");
var questionEl = document.querySelector(".question");
var options = document.querySelector(".optionsArea");
var correctWrong = document.querySelector(".correct-wrong");
var currentScore = document.querySelector("#current-score");
var finalScore = document.querySelector("#final-score");
var displayEndScore = document.querySelector("#scoreDisplay");
var submitBtn = document.querySelector(".submit");
var userInfoInput = document.querySelector("#initials");

//declaring lets
let timer;
let score = 0;
let timeLeft = 40;
let currentQuestion = 0;

let gameScore = localStorage.getItem("Game-Score");

//declare question array
var questions = [
  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while i = 1 to 10", correct: false },
      { text: "while (i <= 10; i++)", correct: false },
      { text: "while (var i = 0; i = 10; i++)", correct: false },
      { text: "while (i <= 10)", correct: true },
    ],
  },
  {
    question: "How is a forEach statement different from a for statement?",
    answers: [
      { text: "Only a for statement uses a callback function", correct: false },
      {
        text: "A for statement is generic, but a forEach statement can be used only with an array",
        correct: true,
      },
      {
        text: "Only a forEach statement lets you specify your own iterator",
        correct: false,
      },

      {
        text: "A forEach statement is generic, but a for statement can be used only with an array",
        correct: false,
      },
    ],
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
      { text: "if i = 5", correct: false },
      { text: "if (i == 5)", correct: true },
      { text: "if i = 5 then", correct: false },
      { text: "if i == 5 then", correct: false },
    ],
  },
  {
    question:
      "Which statement creates a new object using the Person constructor? Which statement creates a new Person object called 'student'?",
    answers: [
      { text: "var student = new Person();", correct: true },
      { text: "var student = construct Person;", correct: false },
      { text: "var student = Person();", correct: false },
      { text: "var student = construct Person();", correct: false },
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function = myFunction()", correct: false },
      { text: "function:myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
      { text: "$Function()", correct: false },
    ],
  },
];

//Listens for click to START GAME
startBtn.addEventListener("click", startGame);

// WHEN I click the start button
function startGame() {
  //hide start button and instructions
  startBtn.classList.add("hidden");
  title.classList.add("hidden");
  info.classList.add("hidden");
  timerEl.textContent = `timer: ${timeLeft} Seconds Remaining`;

  //add timer after start game btn clicked
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = "timer: " + timeLeft + " Seconds Remaining";

    if (timeLeft <= 0) {
      endGame();
      timerEl.textContent = `timer: 0 Seconds Remaining`;
    }
  }, 1000);
  //shows first question
  showQuestion();
}

// THEN a timer starts and I am presented with a question
function showQuestion() {
  currentScore.textContent = `score: ${score}`;
  questionSec.classList.remove("hidden");
  questionEl.textContent = questions[currentQuestion].question;
  options.innerHTML = "";
  questions[currentQuestion].answers.forEach((answer) => {
    //create a button
    var optionButton = document.createElement("button");
    optionButton.textContent = answer.text;
    optionButton.classList.add("btn");
    optionButton.dataset.correct = answer.correct;
    optionButton.addEventListener("click", evaluateAnswer);
    options.append(optionButton);
  });
}

//evaluate question whether it is correct or incorrect
function evaluateAnswer(event) {
  event.preventDefault();
  //evaluate whether correct and apply points to score
  var isCorrect = event.target.dataset.correct;

  if (isCorrect === "true") {
    correctWrong.textContent = "Right!";
    //add points to score
    score += 20;
    currentScore.textContent = `score: ${score}`;
  } else {
    correctWrong.textContent = "Wrong!";
    //deducts time when answered inccorectly
    timeLeft -= 10;
    timerEl.textContent = `timer: ${timeLeft} Seconds Remaining`;
  }

  //trigger the next question to appear
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    endGame();
    timerEl.textContent = `timer: 0 Seconds Remaining`;
  }
}

//ends the game when there is no time left
function endGame() {
  //stopping the timer
  clearInterval(timer);
  //hide question section
  questionSec.classList.add("hidden");
  finalScore.classList.remove("hidden");

  //create p tag inside of div
  var endScore = document.createElement("p");
  endScore.classList.add("end-score");
  endScore.textContent = `your final score is: ${score}`;
  displayEndScore.append(endScore);

  //adds game info to localstorage
  let scoreArray = [];
  if (!gameScore) {
    //pushes score to an array
    scoreArray.push(score);
    localStorage.setItem("Game-Score", JSON.stringify(scoreArray));
  } else {
    scoreArray = scoreArray.concat(JSON.parse(gameScore) || 0);
    scoreArray.push(score);
    localStorage.setItem("Game-Score", JSON.stringify(scoreArray));
  }
}

//show the score entry form
//when initials are inputed in text
submitBtn.addEventListener("click", function (event) {
  //event.preventDefault();

  var userInput = userInfoInput.value.trim();
  var gameInitial = localStorage.getItem("initials");
  let initialArray = [];
  if (!gameInitial) {
    initialArray.push(userInput);
    localStorage.setItem("initials", JSON.stringify(initialArray));
  } else {
    initialArray = initialArray.concat(JSON.parse(gameInitial) || 0);
    initialArray.push(userInput);
    localStorage.setItem("initials", JSON.stringify(initialArray));
  }
});
