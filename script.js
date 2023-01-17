// let firstName = document.getElementById("firstName").value;
// let lastName = document.getElementById("lastName").value;
// let gender = document.getElementById("gender").value;
// let age = document.getElementById("age").value;

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
    goToSleep(bed) {
        bed.sleep(this);
    }
}

class Phone {
    constructor() {

    }
    buyItem() {

    }
}

class Bed {
    constructor() {
        this.price = 100;
    }
    sleep(sim) {
        sim.this.energy += 5;
    }
}

// stat bars

const statCanvas = document.getElementById("canvas-stat-bars");
const context = statCanvas.getContext("2d");
const width = statCanvas.width = 320;
const height = statCanvas.height = 480;

class StatBar {
    constructor(x, y, w, h, maxStat, stat) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.maxWidth = w;
        this.maxStat = maxStat;
        this.stat = stat;
        this.color = 'green';
    }
    show(context) {
        context.lineWidth = 5;
        context.strokeStyle = "#333";
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.maxWidth, this.h);
    }
    updateStat() {
        this.w = (this.stat / this.maxStat) * this.maxWidth;
    }
}

// const hungerBar = new StatBar(20, 20, 50, 30, 1000, mySim.hunger);

// const frame = function() {
//     requestAnimationFrame(frame);
// };

// frame();

class Time {
    constructor() {
        this.minutes = 0;
        this.hours = 0;
        this.dayIndex = 0;
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
        const minutes = this.minutes.toString().length === 2 ? this.minutes.toString() : `0${this.minutes.toString()}`;
        console.log(minutes);
        const hours = this.hours.toString().length === 2 ? this.hours.toString() : `0${this.hours.toString()}`;
        console.log(hours);
        const time = this.days[this.dayIndex] + ' ' + hours + ':' + minutes;
        document.getElementById("time").innerHTML = time;
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
    
    const maxStat = 1000;
    const statBarWidth = 200;
    const statBarHeight = 30;
    const x = width / 2 - statBarWidth / 2;
    const y = height / 2 - statBarHeight / 2;
    const hungerBar = new StatBar(x, y, statBarWidth, statBarHeight, maxStat, mySim.hunger);
    const hygieneBar = new StatBar(x, y * 2, statBarWidth, statBarHeight, maxStat, mySim.hygeine);
    const bladderBar = new StatBar(x, y * 3, statBarWidth, statBarHeight, maxStat, mySim.bladder);
    const energyBar = new StatBar(x, y * 4, statBarWidth, statBarHeight, maxStat, mySim.energy);
    const socialBar = new StatBar(x, y * 5, statBarWidth, statBarHeight, maxStat, mySim.social);
    const funBar = new StatBar(x, y * 6, statBarWidth, statBarHeight, maxStat, mySim.fun);

    const frame = function() {
        context.clearRect(0, 0, width, height);
        hungerBar.show(context);
        hygieneBar.show(context);
        bladderBar.show(context);
        energyBar.show(context);
        socialBar.show(context);
        funBar.show(context);
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

// setInterval(() => {
//     timeDisplay.minutes++;
//     timeDisplay.displayTime();
//     mySim.hunger--;
//     mySim.hygeine--;
//     mySim.bladder--;
//     mySim.energy--;
//     mySim.fun--;
//     mySim.social--;
//     console.log(mySim);
// }, 1000);
