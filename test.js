let isRunning = false;
let intervalId;

document.getElementById("start-stop").addEventListener("click", function () {
  if (isRunning) {
    stopMetronome();
  } else {
    startMetronome();
  }
});

function startMetronome() {
  isRunning = true;
  document.getElementById("start-stop").textContent = "Stop";
  const bpm = document.getElementById("bpm").value;
  const interval = 60000 / bpm; // Calculate interval in milliseconds
  intervalId = setInterval(playClick, interval);
}

function stopMetronome() {
  isRunning = false;
  document.getElementById("start-stop").textContent = "Start";
  clearInterval(intervalId);
}

function playClick() {
  const click = new Audio(
    "https://www.soundjay.com/buttons/sounds/button-16.mp3"
  );
  click.play();
}
