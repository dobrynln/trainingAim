let startBtn = document.querySelector("#start");
let screens = document.querySelectorAll(".screen");
let timeList = document.querySelector("#time-list");
let timeGame = document.querySelector("#time");
let board = document.querySelector("#board");
let colors = [
  "#872020",
  "#b31d6a",
  "#c25bb4",
  "#411ebd",
  "#443a66",
  "#146edb",
  "#14dbb0",
  "#17db14",
  "#c1db14",
  "#db7414",
];
let time = 0;
let score = 0;
let flag = false;
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
      startGame();
  }
});
board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createCircle();
  }
});
function startGame() {
  if(!flag) {
    setInterval(timeDecrease, 1000);
    createCircle();
    timeFinish(time);
    flag = true
  }
}
function timeDecrease() {
  if (time === 0) {
    finishGame ()
  } else {
    timeGame.parentNode.classList.remove("hide");
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    timeFinish(current);
  }
}
function timeFinish(value) {
  timeGame.innerHTML = `00:${value}`;
}
function finishGame () {
  timeGame.parentNode.classList.add("hide");
  board.innerHTML = `<div class="finish">
  <h1>Счёт: <span class="primary">${score}</span></h1>
  <div class="btns-finish">
    <button class="time-btn" onclick="restartGame()">Заново</button>
  </div>
</div>`
}
function createCircle() {
  let circle = document.createElement("div");
  circle.classList.add("circle");
  board.appendChild(circle);
  let randomSize = randomNumber(10, 40);
  let { width, height } = board.getBoundingClientRect();
  let x = randomNumber(0, width - randomSize);
  let y = randomNumber(0, height - randomSize);
  let colorCircle = randomColor();
  circle.style.width = `${randomSize}px`;
  circle.style.height = `${randomSize}px`;
  circle.style.backgroundColor = colorCircle;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
}
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
function restartGame () {
  screens[1].classList.remove("up");
  timeList.addEventListener("click", (event) => {
    if (event.target.classList.contains("time-btn")) {
      time = parseInt(event.target.getAttribute("data-time"));
      screens[1].classList.add("up");
      let fin = document.querySelector('.finish')
      fin.remove()
      createCircle();
      score = 0
    }
  });
}