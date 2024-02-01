let selectBurger = document.querySelector(".burger-icon");
let menuActive = false;

function showMenu() {
    let menu = document.querySelector("nav");
    if (!menuActive) {
        menu.classList.add("show");
        menuActive = true;
    } else {
        menu.classList.remove("show");
        menuActive = false;
    }
}

selectBurger.addEventListener('click', showMenu);


let addTasks = document.querySelector(".add-task");

function addTask() {
    let menu = document.querySelector(".add-tasks");
    if (!menuActive) {
        menu.classList.add("add-tasks-show");
        menuActive = true;
    } else {
        menu.classList.remove("add-tasks-show");
        menuActive = false;
    }}

addTasks.addEventListener('click', addTask);

let submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', submitForm);

function submitForm() {
    let data = {        
         desc: document.getElementById("description").value,
         label: document.getElementById("label").value,
         day: document.getElementById("days").value,
    };
    createTask(data);
    localStorage.setItem("taskData", JSON.stringify(data));
}

function createTask(data) {
    let newTaskElement = document.createElement("div");
    newTaskElement.className = "task";

    newTaskElement.innerHTML = `<h4>${data.label}</h4><p>${data.desc}</p>`;

    let dayContainer = document.querySelector(`.${data.day.toLowerCase()} .calendar-tasks`);
    
    dayContainer.appendChild(newTaskElement);
}

submitButton.addEventListener('click', submitForm)
