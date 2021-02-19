let elements;
window.onload = function () {
    elements = {
        noteType: document.getElementById("note-type"),
        beatType: document.getElementById("beat-type"),
        tempo: document.getElementById("tempo"),
        tempoValue: document.getElementById("tempo-value"),
        toggleButton: document.getElementById("toggle-button"),
        beatCounter: document.getElementById("beat-counter"),
        toggleOptions: document.getElementById("toggle-options"),
        closeOptions: document.getElementById("close-options"),
        options: document.getElementById("options"),
        volume: document.getElementById("volume"),
        waveform: document.getElementById("waveform"),
        tapButton: document.getElementById("tap-button"),
        beatFrame: document.getElementById("beat-frame"),
        beats: document.getElementsByClassName("beat")
    };
    elements.toggleButton.addEventListener('click', togglePlay);
    elements.toggleOptions.addEventListener('click', function () {
        elements.options.classList.toggle('hidden');
    });
    elements.beatType.addEventListener('input', update);
    // tempo: update display value while dragged and update beat when release
    elements.tempo.addEventListener('input', updateTempoValue);
    elements.tempo.addEventListener('change', update);
    elements.closeOptions.addEventListener('click', () => {
        elements.options.classList.toggle('hidden');
    });
    elements.tapButton.addEventListener('click', updateTapTempo);
    elements.noteType.addEventListener('click', updateNoteType);
}

/**
 * How often we should beep
 */
let beepInterval;

const context = new (window.AudioContext || window.webkitAudioContext)();

/**
 * Low: The beep that is made on every beat but the main beat
 * High: The beep that is made on the first beat of the bar
 */
const frequencies = {
    low: 880.0,
    high: 1760.0
};


/**
 * timesThrough: The amount of beeps made. This is counted so
 *               we can find out the first beat of the bar.
 * playSound: Whether or not we should be beeping
 */
const settings = {
    timesThrough: -1,
    playSound: false
};

function updateTempoValue() {
    elements.tempoValue.innerText = `at ${elements.tempo.value} bpm`;
}

function togglePlay() {
    settings.playSound = !settings.playSound;
    update(settings.playSound);
}

function updateBeatCounter() {
    const val = elements.noteType.value;
    elements.beatCounter.innerText = `${(settings.timesThrough % val) + 1}`;
}

function updateNoteType() {
    let beatCount = elements.noteType.value;
    console.log(beatCount);
    elements.beatFrame.innerHTML = "";
    if (beatCount < 9) {
        for (let i = 0; i < beatCount; i++) {
            elements.beatFrame.insertAdjacentElement("beforeend", createDiv());
        }
    }
    lamp = 0;
    clear_horse_race_lamp();
}

function createDiv() {
    let tempDiv = document.createElement('div');
    tempDiv.className = "beat";

    tempDiv.insertAdjacentElement("beforeend", CreateBeatTypeTop());
    tempDiv.insertAdjacentElement("beforeend", CreateBeatTypeMiddle());
    tempDiv.insertAdjacentElement("beforeend", CreateBeatTypeBottom());
    return tempDiv;
}

function CreateBeatTypeTop() {
    let tempDiv = document.createElement('div');
    tempDiv.className = "beat-type-top";
    return tempDiv;
}
function CreateBeatTypeMiddle() {
    let tempDiv = document.createElement('div');
    tempDiv.className = "beat-type-middle";
    return tempDiv;
}
function CreateBeatTypeBottom() {
    let tempDiv = document.createElement('div');
    tempDiv.className = "beat-type-bottom";
    return tempDiv;
}

/**
 * Updates the text of the button.
 * @param {Boolean} shouldPlaySound
 */
function updateToggleButtonText(shouldPlaySound) {
    let buttonText = "start";

    if (shouldPlaySound) {
        buttonText = "stop";
    }

    return buttonText;
}

function update(shouldPlaySound) {
    updateTempoValue();
    updateBeatCounter();
    elements.toggleButton.innerText = updateToggleButtonText(shouldPlaySound);
    clearInterval(beepInterval);
    clear_horse_race_lamp();

    if (shouldPlaySound) {
        // Tick once before starting the interval, to make the metronome
        // start immediately when pressing play.
        updateBeepInterval(elements.tempo.value, elements.beatType.value);
        tick();
    }

    settings.timesThrough = 0;
}

let lastTap;

function updateTapTempo() {
    let tap = new Date();
    lastTap = lastTap || tap;
    let diffInMillis = Math.abs((lastTap - tap) / 1000);
    lastTap = tap;
    elements.tempo.value = 60 / diffInMillis;
    tick();
    update();
    updateTempoValue();
}

let interval = 0;

function updateBeepInterval(tempo, beatType) {

    if (tempo > 0) {
        interval = parseInt(bpmToMs(tempo, beatType));
        beepInterval = setInterval(tick, interval);
    }
}

function bpmToMs(beatsPerMinute, beatType) {

    const noteDurations = {
        1: beatsPerMinute / 4,
        2: beatsPerMinute / 2,
        4: beatsPerMinute,
        8: beatsPerMinute * 2,
        16: beatsPerMinute * 4,
        32: beatsPerMinute * 8
    };

    return (60000 / noteDurations[beatType]);
}

function shouldBeep(timesThrough, noteType) {
    return timesThrough % noteType === 0;
}

function tick() {
    settings.timesThrough++;
    updateBeatCounter();

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    gain.gain.value = elements.volume.value;
    oscillator.type = elements.waveform.value;
    oscillator.frequency.value = frequencies.low;
    oscillator.connect(gain);

    gain.connect(context.destination);

    let timeToBeep = shouldBeep(settings.timesThrough, elements.noteType.value);

    if (timeToBeep) {
        oscillator.frequency.value = frequencies.high
    }

    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);

    if (gain.gain.value > 0) {
        gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + .10)
    }

    horse_race_lamp_2();
}

function horse_race_lamp_1() {
    let len = elements.beats.length;
    for (let i = 0; i < len; i++) {
        let element = elements.beats.item(i);
        let background = element.style.background;
        if (background !== "rgb(160, 160, 160)") {
            element.style.background = "rgb(160, 160, 160)";
        }
    }
    for (let i = 1; i < len; i++) {
        elements.beats.item(i).style.background = "rgb(255, 255, 255)";
    }
}

let lamp = 0;

function horse_race_lamp_2() {
    if (lamp === elements.beats.length) {
        lamp = 0;
    }
    elements.beats.item(lamp).style.background = "rgb(160, 160, 160)";
    let i = lamp;
    setTimeout(() => {
        elements.beats.item(i).style.background = "rgb(255, 255, 255)";
    }, interval / 3);
    lamp++;
}

function clear_horse_race_lamp() {
    let len = elements.beats.length;
    for (let i = 0; i < len; i++) {
        elements.beats.item(i).style.background = "rgb(255, 255, 255)";
    }
    lamp = 0;
}
