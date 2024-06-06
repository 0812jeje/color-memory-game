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

async function startGame() {
  let countdown = document.getElementById("overlay-text");
  document.getElementById("overlay").style.display = "flex";
  for (let index = 3; index > 0; index--) {
    countdown.textContent = index;
    await sleep(1);
  }
  countdown.textContent = "START";
  await sleep(1);
  document.getElementById("overlay").style.display = "none";
  document.querySelectorAll(".mainpage").forEach((element) => {
    element.style.display = "none";
  });
  game();
}

async function game() {
  let buttonList = document.querySelectorAll(".circle-btn");
  let buttonOrder = [];
  let lost = false;

  while (!lost) {
    let lastButton = buttonList[0];
    let lastButtonColor = lastButton.style.backgroundColor;
    buttonOrder.push(buttonList[Math.floor(Math.random() * 4)]);
    document.getElementById("heading").textContent = "Watch closely";
    await sleep(1);
    for (let index = 0; index < buttonOrder.length; index++) {
      lastButton.style.backgroundColor = lastButtonColor;
      lastButton = buttonOrder[index];
      lastButtonColor = lastButton.style.backgroundColor;
      buttonOrder[index].style.backgroundColor = "black";
      await sleep(0.8);
    }
    lastButton.style.backgroundColor = lastButtonColor;

    await sleep(0.5);
    document.getElementById("heading").textContent = "Your turn";

    for (let index = 0; index < buttonOrder.length; index++) {
      const event = await waitForClick(); // Wait for the 'click' event
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
      await sleep(0.5);
      document.getElementById("score").textContent =
        "SCORE: " + buttonOrder.length;
      if (buttonOrder.length) {
        document.getElementById("score").style.display = "flex";
      }
    } else {
      break;
    }
    await sleep(0.5);
  }
  document.getElementById("game-over-btns").style.display = "flex";
  document.getElementById("overlay-text").textContent = "GAME OVER";
  document.getElementById("overlay").style.display = "flex";
  const event = await waitForClick();
  if (event.target.className === "home game-over-btn") {
    location.reload();
  } else if (event.target.className === "again game-over-btn") {
    document.getElementById("overlay").style.display = "none";
  }
}
