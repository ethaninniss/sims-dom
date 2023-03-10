// let firstName = document.getElementById("firstName").value;
// let lastName = document.getElementById("lastName").value;
// let gender = document.getElementById("gender").value;
// let age = document.getElementById("age").value;

// const visualCanvas = document.getElementById("canvas-stat-bars");
// const visualCtx = visualCanvas.getContext("2d");
// const visualCtxWidth = visualCtx.width = 320;
// const visualCtxHeight = visualCtx.height = 480;

// const sims = [];
let mySim;

// Sim Class
class Sim {
    constructor(firstName, lastName, gender, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.fullName = this.firstName + ' ' + this.lastName;
        this.hunger = 1000;
        this.bladder = 1000;
        this.hygeine = 1000;
        this.fun = 1000;
        this.social = 1000;
        this.energy = 1000;
        this.money = 0;
        this.phone = new Phone();
        this.inventory = [];
    }
    // speech methods
    sayName() {
        return `My name is ${this.fullName}`;
    }
    sayGender() {
        return `My gender is ${this.gender}`;
    }
    sayAge() {
        return `My age is ${this.age}`;
    }
    // action methods
    openPhone() {
        
    }
    buyItems(item) {
        this.phone.buyItem(this, item);
    }
    goToSleep(bed) {
        bed.sleep(this);
    }
}

class Phone {
    constructor() {
        this.color = 'black';
    }
    buyItem(sim, item) {
        sim.inventory.push();
    }
}

class Bed {
    constructor() {
        this.price = 100;
    }
    sleep(sim) {
        sim.energy += 500;
        if (sim.energy > 1000) sim.energy = 1000;
    }
}

const bed = new Bed();

// canvas for statbar

const statCanvas = document.getElementById("canvas-stat-bars");
const context = statCanvas.getContext("2d");
const width = statCanvas.width = 320;
const height = statCanvas.height = 240;

class StatBar {
    constructor(x, y, w, h, maxStat) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.maxWidth = w;
        this.maxStat = maxStat;
        this.stat = maxStat;
        this.color = 'green';
    }
    show(context) {
        context.lineWidth = 4;
        context.strokeStyle = "#333";
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.maxWidth, this.h);
    }
    updateStat(val) {
        if (val >= 0) {
            this.stat = val;
            this.w = (this.stat / this.maxStat) * this.maxWidth;
        }
        if (this.w / this.maxWidth <= .2) this.color = 'red';
        else if (this.w / this.maxWidth <= .5) this.color = 'orange';
        else this.color = 'green';
    }
}

// creating stat bars
    const maxStat = 1000;
    const statBarWidth = 100;
    const statBarHeight = 15;
    const x = width / 2 - statBarWidth / 2;
    const y = 30;
    const hungerBar = new StatBar(x, y, statBarWidth, statBarHeight, maxStat);
    const hygieneBar = new StatBar(x, y * 2, statBarWidth, statBarHeight, maxStat);
    const bladderBar = new StatBar(x, y * 3, statBarWidth, statBarHeight, maxStat);
    const energyBar = new StatBar(x, y * 4, statBarWidth, statBarHeight, maxStat);
    const socialBar = new StatBar(x, y * 5, statBarWidth, statBarHeight, maxStat);
    const funBar = new StatBar(x, y * 6, statBarWidth, statBarHeight, maxStat);
    const statBars = [hungerBar, hygieneBar, bladderBar, energyBar, socialBar, funBar];


class Time {
    constructor() {
        this.minutes = 0;
        this.hours = 0;
        this.dayIndex = 0;
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }
    updateTime() {
        if (this.minutes === 60) {
            this.minutes = 0;
            this.hours++;
        }
        if (this.hours === 24) {
            this.hours = 0;
            this.dayIndex++;
        }
        if (this.dayIndex === 7) this.dayIndex = 0;
    }
    displayTime() {
        const minutes = this.minutes.toString().length === 2 ? this.minutes.toString() : '0' + this.minutes.toString();
        const hours = this.hours.toString().length === 2 ? this.hours.toString() : '0' + this.hours.toString();
        const time = this.days[this.dayIndex] + ' ' + hours + ':' + minutes;
        document.getElementById("time").innerHTML = time;
        // document.getElementById("phone-title").innerHTML = time;
    }
}
const timeDisplay = new Time();

// Says audible phrases
const audibleSpeech = function(phrase) {
    const synth = window.speechSynthesis;
    synth.speak(new SpeechSynthesisUtterance(phrase));
};

// Creates new Sim object using inputs
const newSim = function() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    mySim = new Sim(firstName, lastName, gender, age);
    console.log(mySim);
    // sims.push(new Sim(firstName, lastName, gender, age));


    const frame = function() {
        context.clearRect(0, 0, width, height);
        statBars.forEach(e => e.show(context));
        requestAnimationFrame(frame);
    };

    frame();
};

// Appends Phrases on screen
const appendSpeech = function(phrase) {
    const textBox = document.getElementById("text-box");
    let text = document.createElement("p");
    text.innerHTML = phrase;
    text.setAttribute("class", "phrase");
    textBox.appendChild(text);
};

// Runs append and audible speech functions by passing in method invocation as argument
document.getElementById("sayNameButton").onclick = function() {
    const phrase = mySim.sayName();
    console.log(phrase);
    appendSpeech(phrase);
    audibleSpeech(phrase);
};

document.getElementById("sayGenderButton").onclick = function() {
    const phrase = mySim.sayGender();
    console.log(phrase);
    appendSpeech(phrase);
    audibleSpeech(phrase);
};

document.getElementById("sayAgeButton").onclick = function() {
    const phrase = mySim.sayAge();
    console.log(phrase);
    appendSpeech(phrase);
    audibleSpeech(phrase);
};

setInterval(() => {
    timeDisplay.minutes++;
    timeDisplay.updateTime();
    timeDisplay.displayTime();
    mySim.hunger--;
    mySim.hygeine--;
    mySim.bladder--;
    mySim.energy--;
    mySim.fun--;
    mySim.social--;
    hungerBar.updateStat(mySim.hunger);
    hygieneBar.updateStat(mySim.hygeine);
    bladderBar.updateStat(mySim.bladder);
    energyBar.updateStat(mySim.energy);
    funBar.updateStat(mySim.fun);
    socialBar.updateStat(mySim.social);
}, 1000);


const openPhoneModalButtons = document.querySelectorAll("[data-modal-target]");
const closePhoneModalButtons = document.querySelectorAll("[data-close-button]");
const phoneOverlay = document.getElementById("overlay");

openPhoneModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

phoneOverlay.addEventListener('click', () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        closeModal(modal);
    });
});

closePhoneModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest(".modal");
        closeModal(modal);
    });
});

function openModal(modal) {
    console.log(modal)
    if (modal == null) return;
    console.log('1234')
    modal.classList.add('active');
    phoneOverlay.classList.add('active');
    console.log(modal)
}

function closeModal(modal) {
    console.log(modal)
    if (modal == null) return;
    console.log('1234')
    modal.classList.remove('active');
    phoneOverlay.classList.remove('active');
}