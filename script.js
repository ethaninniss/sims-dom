// let firstName = document.getElementById("firstName").value;
// let lastName = document.getElementById("lastName").value;
// let gender = document.getElementById("gender").value;
// let age = document.getElementById("age").value;

// const sims = [];
let sim;

// Sim Class
class Sim {
    constructor(firstName, lastName, gender, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.fullName = this.firstName + ' ' + this.lastName;
    }
    sayName() {
        return `My name is ${this.fullName}`;
    }
    sayGender() {
        return `My gender is ${this.gender}`;
    }
    sayAge() {
        return `My age is ${this.age}`;
    }
}

const audibleSpeech = function(phrase) {
    const synth = window.speechSynthesis;
    synth.speak(new SpeechSynthesisUtterance(phrase));
};

const newSim = function() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    sim = new Sim(firstName, lastName, gender, age);
    console.log(sim);
    // sims.push(new Sim(firstName, lastName, gender, age));
};

const appendSpeech = function(phrase) {
    const textBox = document.getElementById("text-box");
    let text = document.createElement("p");
    text.innerHTML = phrase;
    text.setAttribute("class", "phrase");
    textBox.appendChild(text);
};

document.getElementById("sayNameButton").onclick = function() {
    const phrase = sim.sayName();
    console.log(phrase);
    appendSpeech(phrase);
    audibleSpeech(phrase);
};

document.getElementById("sayGenderButton").onclick = function() {
    const phrase = sim.sayGender();
    console.log(phrase);
    appendSpeech(phrase);
    audibleSpeech(phrase);
};

document.getElementById("sayAgeButton").onclick = function() {
    const phrase = sim.sayAge();
    console.log(phrase);
    appendSpeech(phrase);
    audibleSpeech(phrase);
};

