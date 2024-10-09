// Slide out menu
const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const slideoutMenu = document.getElementById('slideout-menu');


openMenuBtn.addEventListener("click", () => {
    slideoutMenu.style.transform = 'translate(15vw)';
})

closeMenuBtn.addEventListener("click", () => {
    slideoutMenu.style.transform = 'translate(0)';
})






// Stopwatch class to create a Stopwatch object
class Stopwatch {
    constructor(container, stopwatchName, stopwatchId) {
        this.container = container;
        this.stopwatchId = stopwatchId;
        this.name = stopwatchName;
        this.time = 0;
        this.intervalId = null;

        this.buildUI();
    }

    // Builds stopwatch container and then appends the time display and controls
    buildUI() {
        this.element = document.createElement('div');
        // this.element.className = 'stopwatch';

        // give the created stopwatch class name 'stopwatch-{id} active-stopwatch' so it will display
        this.element.className = `stopwatch active-stopwatch`;
        this.element.id = `stopwatch-${this.stopwatchId}`;

        this.nameDisplay = document.createElement('div');
        this.nameDisplay.className = 'name-display';
        this.nameDisplay.textContent = this.name;

        this.timeDisplay = document.createElement('span');
        this.timeDisplay.className = 'time-display';
        this.updateTimeDisplay();

        this.startButton = this.createButton('Start', 'start-btn', () => this.start());
        this.stopButton = this.createButton('Stop', 'stop-btn', () => this.stop());
        this.resetButton = this.createButton('Reset', 'reset-btn', () => this.reset());

        const controls = document.createElement('div');
        controls.className = 'controls';
        controls.append(this.startButton, this.stopButton, this.resetButton);

        this.element.append(this.nameDisplay, this.timeDisplay, controls);
        this.container.appendChild(this.element);
    }

    createButton(label, className, onClick) {
        const button = document.createElement('button');
        button.textContent = label;
        button.className = className
        button.onclick = onClick;
        return button;
    }

    updateTimeDisplay() {
        this.timeDisplay.textContent = this.formatTime(this.time);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }    

    start() {
        if (this.intervalId) return;

        const startTime = Date.now() - this.time;
        this.intervalId = setInterval(() =>{
            this.time = Date.now() - startTime;
            this.updateTimeDisplay();
        }, 10);
    }


    stop() {
        if (!this.intervalId) return;
       
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    reset() {
        this.stop();
        this.time = 0;
        this.updateTimeDisplay();
    }
}

const createStopwatchModal = document.getElementById('create-stopwatch-modal')
const modalCloseBtn = document.getElementById('modal-close-btn');
let stopwatchId = 1; 

// Stopwatches object to track all objects by id
const stopwatches = {};

// Slideout menu list
const slideoutMenuList = document.getElementById('stopwatch-list');


function createStopwatch() {
    event.preventDefault();

    // Hide the active stopwatch if one exists
    const activeStopwatch = document.querySelectorAll('.active-stopwatch')[0];
    // typeof activeStopwatch !== 'undefined'
    if (activeStopwatch) {
        activeStopwatch.classList.remove("active-stopwatch");
        activeStopwatch.classList.add('hidden-stopwatch');
    };
    console.log(activeStopwatch)



    const container = document.getElementById('stopwatch-container');
    const stopwatchName = document.getElementById('task-name').value;
    const stopwatch = new Stopwatch(container, stopwatchName, stopwatchId);
    


    // Add stopwatch to stopwatches object using Id as key
    stopwatches[stopwatchId] = stopwatch;
    console.log(stopwatches);



    // Add stopwatch name to slideout menu list
    const li = document.createElement('li');
    li.textContent = stopwatchName;
    li.id = stopwatchId;


    // Add click listener to show stopwatch being clicked
    li.addEventListener('click', () => {
        document.getElementsByClassName('active-stopwatch')[0].classList.replace('active-stopwatch', 'hidden-stopwatch');
        console.log(li.id);
        document.getElementById(`stopwatch-${li.id}`).classList.replace('hidden-stopwatch', 'active-stopwatch');

    })
    slideoutMenuList.appendChild(li);




    stopwatchId += 1;

    closeModal();
}





// Open and close create stopwatch menu
const openModal = () => {
    createStopwatchModal.style.display = 'block';
}

const closeModal = () => {
    createStopwatchModal.style.display = 'none';
}