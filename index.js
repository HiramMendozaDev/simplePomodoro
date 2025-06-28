//variables goblales
const pomodoroEventsHandler = document.querySelector("#pomodoro-events-handler");
const pomodoroTimer = document.querySelector("#pomodoro-timer");
const startAndStopButton = document.querySelector("#start-and-stop-button");
const resetButton = document.querySelector("#reset-button");
const pomodoroMessage = document.querySelector("#pomodoro-message");
//Estados
const totalinitialTimeInSeconds = 60 * 25;
let currentTotalSeconds = totalinitialTimeInSeconds;
let timeInterval;
let isPomodoroRunning = false;
let isPodomoroResting = false;
let pomodoroCount = 0;
pomodoroTimer.textContent = determineTime(currentTotalSeconds);

//Funciones
function determineTime(timeInSeconds) {

    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;

}

function determineSessionMessage() {
    pomodoroCount++;
    if (pomodoroCount === 1) {
        pomodoroMessage.innerHTML = `<Strong>SimplePomodoro Says:</Strong> Welcome back! Ready for your next session?`;
    } else {
        pomodoroMessage.innerHTML = `<Strong>SimplePomodoro Says:</Strong> Welcome back!, You have already completed ${pomodoroCount} pomodoros. Want to take another session? If not, don't worry. It's normal to take a larger rest every two sessions. Press "Start" when you feel ready to get productive again.`;
    }

}

function countdownStart() {

    if (currentTotalSeconds <= 0) {
        clearInterval(timeInterval);
        classRemove(startAndStopButton, "pause");
        classAdd(startAndStopButton, "start");
        changeTextContent(startAndStopButton, "Start");

        if (!isPodomoroResting) {
            startRestTime();
        } else {
            isPodomoroResting = false;
            currentTotalSeconds = totalinitialTimeInSeconds + 1;
            pomodoroTimer.textContent = determineTime(currentTotalSeconds);
            determineSessionMessage();
            startAndStopButton.disabled = false;
            resetButton.disabled = false;
        }
    }


    --currentTotalSeconds;
    pomodoroTimer.textContent = determineTime(currentTotalSeconds);

    //console.log(currentTotalSeconds);

}

function startRestTime() {
    startAndStopButton.disabled = true;
    resetButton.disabled = true;
    isPodomoroResting = true;
    currentTotalSeconds = (60 * 5) + 1;
    pomodoroMessage.innerHTML = `<strong>SimplePomodoro Says:</strong> Take a rest, drink some water, wash your face, respond some text messages or do any task that can be completed in a couple of minutes. When the rest time finishes, you're be able to start a new session is you wish. Don't underestimate the power of a good rest!`;
    timeInterval = setInterval(countdownStart, 1000);

}


function classAdd(target, value) {
    target.classList.add(value);

}

function classRemove(target, value) {
    target.classList.remove(value);

}

function changeTextContent(target, value) {
    target.textContent = value;
}



//Event handlers
pomodoroEventsHandler.addEventListener("click", (e) => {

    if (e.target === startAndStopButton) {

        if (startAndStopButton.classList.contains("start")) {

            timeInterval = setInterval(countdownStart, 1000);
            isPomodoroRunning = true;
            classRemove(startAndStopButton, "start");
            classAdd(startAndStopButton, "pause");
            changeTextContent(startAndStopButton, "Pause");

        } else if (e.target.classList.contains("pause")) {

            clearInterval(timeInterval);
            isPomodoroRunning = false;
            classRemove(startAndStopButton, "pause");
            classAdd(startAndStopButton, "start");
            changeTextContent(startAndStopButton, "Start");

        }

    }

    if (e.target === resetButton) {

        clearInterval(timeInterval);
        isPomodoroRunning = false;
        currentTotalSeconds = totalinitialTimeInSeconds;
        pomodoroTimer.textContent = determineTime(currentTotalSeconds);
        classRemove(startAndStopButton, "pause");
        classAdd(startAndStopButton, "start");
        changeTextContent(startAndStopButton, "Start");

    }

});