let isRunning = false;
let audioCtx = null;
let nextNoteTime = 0.0; // 다음 클릭 소리 재생 시간
let intervalId;
let currentBeat = 0; // 현재 박자
const lookahead = 25.0; // 25ms마다 스케줄링
const scheduleAheadTime = 0.1; // 100ms 미리 스케줄링
const circles = document.querySelectorAll(".circle");

document.getElementById("start-stop").addEventListener("click", function () {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (isRunning) {
    stopMetronome();
  } else {
    startMetronome();
  }
});

document.getElementById("increase-bpm").addEventListener("click", function () {
  let bpm = parseInt(document.getElementById("bpm").value);
  if (bpm < 240) {
    document.getElementById("bpm").value = bpm + 1;
  }
});

document.getElementById("decrease-bpm").addEventListener("click", function () {
  let bpm = parseInt(document.getElementById("bpm").value);
  if (bpm > 40) {
    document.getElementById("bpm").value = bpm - 1;
  }
});

document.getElementById("song").addEventListener("change", function () {
  const selectedBPM = this.value;
  document.getElementById("bpm").value = selectedBPM; // 노래 선택 시 BPM 설정
});

function startMetronome() {
  isRunning = true;
  document.getElementById("start-stop").textContent = "Stop";

  nextNoteTime = audioCtx.currentTime;
  intervalId = setInterval(scheduler, lookahead); // 일정 주기로 스케줄링
}

function stopMetronome() {
  isRunning = false;
  document.getElementById("start-stop").textContent = "Start";
  clearInterval(intervalId); // 타이머 해제
}

function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    playClick(nextNoteTime); // 오디오 재생
    nextNoteTime += 60.0 / document.getElementById("bpm").value; // BPM에 맞게 조정
  }
}

function playClick(time) {
  const osc = audioCtx.createOscillator(); // 오실레이터 생성
  const envelope = audioCtx.createGain(); // 게인 노드 생성 (음량 조절)

  osc.frequency.value = 1000; // 소리 주파수 설정 (1000Hz)
  envelope.gain.value = 1; // 기본 음량 설정

  osc.connect(envelope); // 오실레이터를 게인 노드에 연결
  envelope.connect(audioCtx.destination); // 게인 노드를 출력에 연결

  osc.start(time); // 지정된 시간에 오디오 시작
  osc.stop(time + 0.05); // 소리 재생 시간 설정 (50ms)

  envelope.gain.setTargetAtTime(0, time, 0.015);

  // 동그라미 시각적 효과 업데이트
  updateVisualEffect();
}

function updateVisualEffect() {
  circles.forEach((circle) => {
    circle.style.transform = "scale(1)";
    circle.style.backgroundColor = "#ddd";
  });

  circles[currentBeat].style.transform = "scale(1.5)";
  circles[currentBeat].style.backgroundColor = "#333";

  currentBeat = (currentBeat + 1) % circles.length;
}
