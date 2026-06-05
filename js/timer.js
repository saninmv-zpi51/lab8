const input = document.querySelector("#datetime-picker");
const startButton = document.querySelector("#start-btn");
const stopButton = document.querySelector("#stop-btn");

const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let selectedDate = null;
let timerId = null;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",
  minuteIncrement: 1,
  disableMobile: true,

  onClose(selectedDates) {
    if (!selectedDates.length) return;

    const chosenDate = selectedDates[0];

    if (chosenDate <= new Date()) {
      alert("Please choose a date in the future");
      selectedDate = null;
      startButton.disabled = true;
      return;
    }

    selectedDate = chosenDate;
    startButton.disabled = false;
  },
});

startButton.addEventListener("click", () => {
  if (!selectedDate) return;

  startButton.disabled = true;
  input.disabled = true;

  clearInterval(timerId);

  updateTimer(selectedDate - new Date());

  timerId = setInterval(() => {
    const diff = selectedDate - new Date();

    if (diff <= 0) {
      stopTimer();
      updateTimer(0);
      return;
    }

    updateTimer(diff);
  }, 1000);
});

stopButton.addEventListener("click", () => {
  stopTimer();

  if (selectedDate && selectedDate > new Date()) {
    startButton.disabled = false;
  }
});

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  input.disabled = false;
}

function updateTimer(ms) {
  const time = convertMs(ms);

  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}