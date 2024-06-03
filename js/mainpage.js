function startGame() {
  document.getElementById("overlay").style.display = "flex";
  let countdownElement = document.getElementById("countdown");
  let countdown = 3; // countdown from 3 seconds

  let interval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(interval);
      countdownElement.textContent = countdown;
      document.getElementById("overlay").style.display = "none";
      // You can add additional logic here to start the game
      window.open("gamepage.html", "_self");
    }
  }, 1000);
}
