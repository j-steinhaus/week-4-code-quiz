const lastPlayedGame = document.querySelector(".last-played-game");
document.querySelector("#clear").addEventListener("click", clearScores);

//adds game score and initials to highscores html
function renderMessage() {
  var getItem = JSON.parse(localStorage.getItem("Game-Score"));

  for (let index = 0; index < getItem.length; index++) {
    const initials = JSON.parse(localStorage.getItem("initials"));
    const storedInfo = document.createElement("li");
    storedInfo.textContent = initials[index];
    lastPlayedGame.append(storedInfo);

    const highScores = JSON.parse(localStorage.getItem("Game-Score"));
    const storedInfo2 = document.createElement("li");
    storedInfo2.textContent = highScores[index];
    lastPlayedGame.append(storedInfo2);
  }
}

//clears score when clear scores button is clicked
function clearScores() {
  localStorage.removeItem("initials");
  localStorage.removeItem("Game-Score");
  lastPlayedGame.innerHTML = "";
}

renderMessage();
