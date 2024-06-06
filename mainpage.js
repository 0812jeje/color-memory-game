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

  while (true) {
    let lastButton = buttonList[0];
    let lastButtonColor = lastButton.style.backgroundColor;
    buttonOrder.push(buttonList[Math.floor(Math.random() * 4)]);
    for (let index = 0; index < buttonOrder.length; index++) {
      lastButton.style.backgroundColor = lastButtonColor;
      lastButton = buttonOrder[index];
      lastButtonColor = lastButton.style.backgroundColor;
      buttonOrder[index].style.backgroundColor = "black";
      await sleep(1);
    }
    lastButton.style.backgroundColor = lastButtonColor;

    await sleep(0.1);
    let overlayText = document.getElementById("overlay-text");
    document.getElementById("overlay").style.display = "flex";
    overlayText.textContent = "YOUR TURN";
    await sleep(1);
    document.getElementById("overlay").style.display = "none";

    // buttonList.forEach((button) => {
    //   button.addEventListener("click", handleClick);
    // });

    for (let index = 0; index < buttonOrder.length; index++) {
      const event = await waitForClick(); // Wait for the 'click' event
      console.log(event);
      console.log(buttonOrder[index].className);

      if (event.target.className === buttonOrder[index].className) {
        console.log("Correct element clicked!");
      } else {
        console.log("Incorrect element clicked.");
      }
    }
    await sleep(1);
  }
}
