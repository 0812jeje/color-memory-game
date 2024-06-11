async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function waitForClick() {
  return new Promise((resolve) => {
    function clickHandler(event) {
      document.removeEventListener("click", clickHandler); // Remove the listener after the click
      resolve(event); // Resolve the promise with the event object
    }
    document.addEventListener("click", clickHandler);
  });
}

let overlayText = document.getElementById("overlay-text");
let overlay = document.getElementById("overlay");
let mainpageELementList = document.querySelectorAll(".mainpage");
let buttonList = document.querySelectorAll(".circle-btn");
let gamepageElementList = document.querySelectorAll(".gamepage");
let gamepageHeading = document.getElementById("gamepage-heading");
let highestScore = 0;
let highscore = document.getElementById("highscore");
let overlayOn = overlay.style.display != "none";

async function startGame() {
  let countdown = overlayText;
  countdown.style.display = "flex";
  overlay.style.display = "flex";
  for (let index = 3; index > 0; index--) {
    countdown.textContent = index;
    await sleep(1);
  }
  countdown.textContent = "START";
  await sleep(1);
  overlay.style.display = "none";
  mainpageELementList.forEach((element) => {
    element.style.display = "none";
  });
  highscore.style.display = "none";
  game();
}

async function game() {
  gamepageElementList.forEach((element) => {
    element.style.display = "flex";
  });
  document.getElementById("score").textContent = "SCORE: " + 0;
  let buttonOrder = [];
  let score;
  let lost = false;

  while (!lost) {
    let lastButton = buttonList[0];
    let lastButtonColor = lastButton.style.backgroundColor;
    buttonOrder.push(buttonList[Math.floor(Math.random() * 4)]);
    score = buttonOrder.length - 1;
    gamepageHeading.textContent = "Watch closely";
    await sleep(1);
    for (let index = 0; index < buttonOrder.length; index++) {
      lastButton.style.backgroundColor = lastButtonColor;
      lastButton = buttonOrder[index];
      lastButtonColor = lastButton.style.backgroundColor;
      buttonOrder[index].style.backgroundColor = "black";
      await sleep(0.5);
    }
    lastButton.style.backgroundColor = lastButtonColor;

    //await sleep(0.5);
    gamepageHeading.textContent = "Your turn";

    for (let index = 0; index < buttonOrder.length; index++) {
      let event;
      while (true) {
        event = await waitForClick(); // Wait for the 'click' event
        if (Array.from(event.target.classList).includes("circle-btn")) {
          break;
        }
      }

      console.log(event);
      console.log(buttonOrder[index].className);

      if (event.target.className === buttonOrder[index].className) {
        console.log("Correct element clicked!");
      } else {
        console.log("Incorrect element clicked.");
        lost = true;
        break;
      }
    }
    if (!lost) {
      document.getElementById("score").textContent =
        "SCORE: " + buttonOrder.length;
    } else {
      if (score > highestScore) {
        highestScore = score;
      }
      break;
    }
    //await sleep(0.5);
  }
  document.getElementById("game-over-btns").style.display = "flex";
  overlayText.style.display = "flex";
  overlayText.textContent = "GAME OVER";
  overlay.style.display = "flex";
  const event = await waitForClick();
  if (event.target.className === "home game-over-btn") {
    mainpage();
  } else if (event.target.className === "again game-over-btn") {
    overlay.style.display = "none";
    game();
  }
}

function mainpage() {
  mainpageELementList.forEach((element) => (element.style.display = "flex"));
  gamepageElementList.forEach((element) => (element.style.display = "none"));
  overlay.style.display = "none";
  if (highestScore > 0) {
    highscore.textContent = "HIGHSCORE: " + highestScore;
    highscore.style.display = "flex";
  }
}

function rules() {
  overlay.style.display = "flex";
  document.getElementById("game-over-btns").style.display = "none";
  overlayText.style.display = "none";
  document.getElementById("rules").style.display = "flex";
}

function closeT() {
  overlay.style.display = "none";
  document.getElementById("rules").style.display = "none";
}

document.querySelectorAll(".circle-btn").forEach((button) => {
  button.addEventListener("click", function () {
    console.log("SOUND");
    var soundFile = this.getAttribute("data-sound");
    var audio = document.getElementById("audio");
    audio.src = soundFile;
    audio.currentTime = 0; // Start from the beginning
    audio.play();
    sleep(0.5);
    audio.pause();
    audio.currentTime = 0;
  });
});
