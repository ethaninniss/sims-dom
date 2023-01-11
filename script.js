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

const newSim = function() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    sim = new Sim(firstName, lastName, gender, age);
    console.log(sim);
    // sims.push(new Sim(firstName, lastName, gender, age));
};

const speech = function(phrase) {
    const textBox = document.getElementById("text-box");
    let text = document.createElement("p");
    text.innerHTML = phrase;
    text.setAttribute("class", "phrase");
    textBox.appendChild(text);
};

document.getElementById("sayNameButton").onclick = function() {
    console.log(sim.sayName());
    speech(sim.sayName());
};

document.getElementById("sayGenderButton").onclick = function() {
    console.log(sim.sayGender());
    speech(sim.sayGender());
};

document.getElementById("sayAgeButton").onclick = function() {
    console.log(sim.sayAge());
    speech(sim.sayAge());
};

