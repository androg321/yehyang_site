const bpmInput = document.getElementById("bpm");
const startStopButton = document.getElementById("startStop");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const songSelector = document.getElementById("song");
const tickSound = document.getElementById("tickSound"); // audio 태그의 소리 파일 참조
const beats = [
  document.getElementById("beat1"),
  document.getElementById("beat2"),
  document.getElementById("beat3"),
  document.getElementById("beat4"),
];

// 노래에 대한 미리 설정된 BPM 목록
const songBPMs = {
  song1: 120,
  song2: 100,
  song3: 140,
  song4: 140,
  song5: 140,
  song6: 140,
  song7: 140,
  song8: 140,
  song9: 140,
  song10: 140,
  song11: 140,
  song12: 140,
  song13: 140,
  song14: 140,
  song15: 140,
  song16: 140,
  song17: 140,
  song18: 140,
};

// 현재 선택된 BPM 값
let bpm = parseInt(bpmInput.value);
let isPlaying = false;
let intervalId;
let currentBeat = 0;

// BPM 값을 업데이트
function updateBPM(newBPM) {
  bpm = newBPM;
  bpmInput.value = bpm;
}

// 선택된 노래에 따라 BPM을 변경
songSelector.addEventListener("change", function () {
  const selectedSong = songSelector.value;
  updateBPM(songBPMs[selectedSong]);
  if (isPlaying) {
    stopMetronome();
    startMetronome();
  }
});

function playTick() {
  // 모든 비트를 초기화
  beats.forEach((beat) => beat.classList.remove("active"));

  // 현재 비트를 활성화
  beats[currentBeat].classList.add("active");

  // 다음 비트로 이동
  currentBeat = (currentBeat + 1) % beats.length;

  // tick 소리 재생
  tickSound.currentTime = 0; // 소리 재생 시작 위치를 0으로 설정
  tickSound.play().catch((error) => {
    console.log("오디오 재생에 실패했습니다: ", error);
  });
}

function startMetronome() {
  currentBeat = 0; // 시작할 때 첫 비트부터 시작
  const interval = 60000 / bpm; // BPM에 따른 간격 계산
  intervalId = setInterval(playTick, interval);
}

function stopMetronome() {
  clearInterval(intervalId);
  // 멈췄을 때 모든 비트를 초기화
  beats.forEach((beat) => beat.classList.remove("active"));
}

startStopButton.addEventListener("click", () => {
  if (isPlaying) {
    stopMetronome();
    startStopButton.textContent = "시작";
  } else {
    startMetronome();
    startStopButton.textContent = "정지";
  }
  isPlaying = !isPlaying;
});

increaseButton.addEventListener("click", () => {
  updateBPM(bpm + 1);
  if (isPlaying) {
    stopMetronome();
    startMetronome();
  }
});

decreaseButton.addEventListener("click", () => {
  updateBPM(bpm - 1);
  if (isPlaying) {
    stopMetronome();
    startMetronome();
  }
});

bpmInput.addEventListener("change", () => {
  const newBPM = parseInt(bpmInput.value);
  if (!isNaN(newBPM) && newBPM >= 30 && newBPM <= 300) {
    updateBPM(newBPM);
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  } else {
    bpmInput.value = bpm; // 입력이 유효하지 않으면 이전 값을 유지
  }
});

updateBPM(bpm);
