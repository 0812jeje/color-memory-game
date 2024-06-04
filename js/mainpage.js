const Buttons = {
  GREEN: "blue-btn",
  RED: "blue-btn",
  YELLOW: "blue-btn",
  BLUE: "blue-btn",
};

function startGame() {
  document.getElementById("overlay").style.display = "flex";
  let countdownElement = document.getElementById("countdown");
  let countdown = 3;

  let interval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;

    if (countdown == 0) {
      countdownElement.textContent = "START";
    }

    if (countdown < 0) {
      clearInterval(interval);
      document.getElementById("overlay").style.display = "none";
      document
        .querySelectorAll(".mainpage")
        .forEach((item) => (item.style.display = "none"));
      inGame();
    }
  }, 1000);
}

function inGame() {
  const buttons = document.querySelectorAll(".circle-btn");
  let counter = 0;
  let buttonOrder = [];
  let interval1 = setInterval(() => {
    buttonOrder.push(buttons[Math.floor(Math.random() * 4)]);
    let i = 0;

    let interval2 = setInterval(() => {
      buttonOrder[i].style.backgroundColor = "black";
    }, 500);
  }, 1000);
}
