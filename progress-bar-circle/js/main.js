let circularProgress = document.querySelector('.circular-progress');
let progressValue = document.querySelector('.progress-value');

let progressStartValue = 0,
  progressEndValue = 90,
  speed = 100;

let progress = setInterval(() => {
  progressStartValue++;

  progressValue.textContent = `${progressStartValue}%`;
  circularProgress.style.background = `conic-gradient(rgb(105, 61, 105) ${progressStartValue * 3.6}deg, rgb(235, 207, 235) 0deg)`

  if (progressStartValue == progressEndValue) {
    clearInterval(progress);
  }
  console.log(progressStartValue);
}, speed)

