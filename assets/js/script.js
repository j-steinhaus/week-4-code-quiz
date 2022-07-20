// global variables
console.log("Hello");
var beginQuiz = document.querySelector("#start-quiz");
var timerDisplay = document.querySelector(".timer");
var gameCard = document.querySelector("#gameCard");
var leaderBtn = document.querySelector("#leaderBtn");
var question = document.querySelector("#question");
var mcA = document.querySelector("#mcA");
var mcB = document.querySelector("#mcB");
var mcC = document.querySelector("#mcC");
var mcD = document.querySelector("#mcD");
var answer = document.querySelector("#answer");
var feedback = document.querySelector("#feedback1");
var card = document.querySelector("#multipleChoice");
var inputForm = document.querySelector("#inputForm");
var scoreCard = document.querySelector("#scoreCard");
var scoreBtn = document.querySelector("#scoreBtn");
var initialsBox = document.querySelector("#initialsBox");
var submitBtn = document.querySelector("#submitBtn");
var backBtn = document.querySelector("#backBtn");
var clearBtn = document.querySelector("#clearBtn");
var start = document.querySelector(".start");
//
var questionBank = [
  {
    question: "How does a WHILE loop start?",
    selection: [
      "while i = 1 to 10",
      "while (i <= 10; i++)",
      "while (var i = 0; i = 10; i++)",
      "while (i <= 10)",
    ],
    answer: "while (i <= 10)",
  },
  {
    question: "How is a forEach statement different from a for statement?",
    selection: [
      "Only a for statement uses a callback function",
      "A for statement is generic, but a forEach statement can be used only with an array",
      "Only a forEach statement lets you specify your own iterator",
      "A forEach statement is generic, but a for statement can be used only with an array",
    ],
    answer:
      " A for statement is generic, but a forEach statement can be used only with an array",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    selection: ["if i = 5", "if (i == 5)", "if i = 5 then", "if i == 5 then"],
    answer: "if (i == 5) ",
  },
  {
    question: "How can you add a comment in a JavaScript?",
    selection: [
      "'This is a comment",
      "//This is a comment",
      "<!--This is a comment-->",
      "<!**This is a comment**>",
    ],
    answer: "//This is a comment",
  },
  {
    question:
      "Which statement creates a new object using the Person constructor? Which statement creates a new Person object called 'student'?",
    selection: [
      "var student = new Person();",
      "var student = construct Person;",
      "var student = Person();",
      "var student = construct Person();",
    ],
    answer: "var student = new Person();",
  },
  {
    question: "How do you create a function in JavaScript?",
    selection: [
      "function = myFunction()",
      "function:myFunction()",
      "function myFunction()",
      "$Function()",
    ],
    answer: "function myFunction()",
  },
  {
    question: "JavaScript is the same as Java?",
    selection: ["True", "False", "Maybe", "Your guess is as good as mine"],
    answer: "False",
  },
  {
    question: "How does a function create a closure?",
    selection: [
      "It reloads the document whenever the value changes",
      "It returns a reference to a variable in its parent scope",
      "It completes execution without returning",
      "It copies a local variable to the global scope",
    ],
    answer: "It returns a reference to a variable in its parent scope",
  },
];

//
var timeLeft = questionBank.length * 15;
var q = 0;
var s = 0;
var score = 0;
var scoreList = [];
var timeInterval;

getScore();

// timer for the quiz
function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "TIMER: " + timeLeft;

    if (timeLeft === 0 || q >= questionBank.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

// questions & answers
function displayQA() {
  if (q < questionBank.length) {
    question.textContent = questionBank[q].question;
    mcA.textContent = questionBank[q].selection[0];
    mcB.textContent = questionBank[q].selection[1];
    mcC.textContent = questionBank[q].selection[2];
    mcD.textContent = questionBank[q].selection[3];
  } else {
    gameOver();
  }
}

// right or wrong
function compareAnswer(event) {
  if (q >= questionBank.length) {
    gameOver();
    clearInterval(timeInterval);
  } else {
    if (event === questionBank[q].answer) {
      feedback1.textContent = "You are correct!";
    } else {
      timeLeft -= 10;
      feedback1.textContent = "You are Wrong!";
    }
    score = timeLeft;
    q++;
    displayQA();
  }
}

// scores from local storage
function getScore() {
  var storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null) {
    scoreList = storedScore;
  }
}

// saving the scores to local storage
function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}

// displaying & hiding page items based on Game Over
function gameOver() {
  scoreBtn.innerHTML = score;
  scoreBtn.style.display = "inline-block";
  gameCard.classList.add("hide");
  inputForm.classList.remove("hide");
  timerDisplay.classList.add("hide");
  leaderBtn.classList.add("hide");
  leaderBoard();
}

// top 10 leaders
function leaderBoard() {
  removeFromLeaderBoard();
  addToLeaderBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });
  //only render the top 4 scores.
  topTen = scoreList.slice(0, 10);

  for (var i = 0; i < topTen.length; i++) {
    var player = topTen[i].player;
    var score = topTen[i].score;

    var newDiv = document.createElement("div");
    leaderBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newDiv.appendChild(newLabel);
  }
}

// initials to leader board
function addToLeaderBoard() {
  leaderBoardDiv = document.createElement("div");
  leaderBoardDiv.setAttribute("id", "playerInitials");
  document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
}

// removing initials from leader board
function removeFromLeaderBoard() {
  var removeScores = document.getElementById("playerInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}

beginQuiz.addEventListener("click", function (event) {
  timer();
  displayQA();
  start.classList.add("hide");
  gameCard.classList.remove("hide");
  leaderBtn.style.display = "none";
  scoreCard.classList.add("hide");
});

card.addEventListener("click", function (event) {
  var event = event.target;
  compareAnswer(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var playerInitials = initialsBox.value.trim();
  var newScore = {
    player: playerInitials,
    score: score,
  };

  scoreList.push(newScore);
  saveScore();
  leaderBoard();
  inputForm.classList.add("hide");
  scoreCard.classList.remove("hide");
});

// leaderBtn.addEventListener("click", function (event) {
//   scoreCard.classList.remove("hide");
//   leaderBtn.classList.add("hide");
//   start.classList.add("hide");
//   leaderBoard();
// });

// Event listener for go back button ??
backBtn.addEventListener("click", function (event) {
  location.reload();
});

// Event listener for clear scores button ??
clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  leaderBoard();
  saveScore();
});
