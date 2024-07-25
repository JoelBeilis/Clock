// STOPWATCH PROGRAM

const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;    
    display.textContent = "00:00:00:00";
}

// Updating stopwatch display
function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// TIMER PROGRAM

const displayT = document.getElementById("displayT");
const endSound = document.getElementById("endSound");
let timerT = null;
let targetTime = 0;
let remainingTime = 0;
let isTimerRunning = false;

function increaseTime() {
    targetTime += 10; // Increase by 1 ms
    updateDisplayT(targetTime);
}

function decreaseTime() {
    if (targetTime >= 10) { // Ensure it doesn't go negative
        targetTime -= 10;
        updateDisplayT(targetTime);
    }
}

function startTimer() {
    if (!isTimerRunning && targetTime > 0) {
        const endTime = Date.now() + targetTime;
        timerT = setInterval(() => {
            const currentTime = Date.now();
            remainingTime = endTime - currentTime;

            if (remainingTime <= 0) {
                clearInterval(timerT);
                displayT.textContent = "00:00:00:00";
                isTimerRunning = false;
                endSound.play(); // Play the sound when the timer ends
            } else {
                updateDisplayT(remainingTime);
            }
        }, 10);
        isTimerRunning = true;
    }
}

function stopTimer() {
    if (isTimerRunning) {
        clearInterval(timerT);
        targetTime = remainingTime;
        isTimerRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerT);
    targetTime = 0;
    remainingTime = 0;
    isTimerRunning = false;
    displayT.textContent = "00:00:00:00";
    endSound.pause(); // Stop the sound if it's playing
    endSound.currentTime = 0; // Reset the sound to the beginning
}

function updateDisplayT(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor(time / (1000 * 60) % 60);
    let seconds = Math.floor(time / 1000 % 60);
    let milliseconds = Math.floor(time % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    displayT.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
