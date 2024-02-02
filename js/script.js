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
    }
}

addTasks.addEventListener('click', addTask);

function createTask(data) {
    let newTaskElement = document.createElement("div");
    newTaskElement.className = "task";
    newTaskElement.innerHTML = `<h4>${data.label}</h4><p>${data.desc}</p>`;
    let dayContainer = document.querySelector(`.${data.day.toLowerCase()} .calendar-tasks`);
    if (dayContainer) {
        dayContainer.appendChild(newTaskElement);
        saveTaskToLocalStorage(data);
    } else {
        console.error(`Day container for ${data.day} not found`);
    }
}

function loadTask(data) {
    let newTaskElement = document.createElement("div");
    newTaskElement.className = "task";
    newTaskElement.innerHTML = `<h4>${data.label}</h4><p>${data.desc}</p>`;
    let dayContainer = document.querySelector(`.${data.day.toLowerCase()} .calendar-tasks`);
    dayContainer.appendChild(newTaskElement);
}

function saveTaskToLocalStorage(data) {
    let existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    existingTasks.push(data);
    localStorage.setItem("tasks", JSON.stringify(existingTasks));
}

function loadTasksFromLocalStorage() {
    let existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.querySelectorAll('.calendar-tasks .task').forEach(taskElement => {
        taskElement.remove();
    });
    existingTasks.forEach(task => {
        loadTask(task);
    });
}

window.onload = function() {
    loadTasksFromLocalStorage();
};

let submitButton = document.querySelector("#submit");
submitButton.addEventListener('click', submitForm);

function submitForm() {
    let data = {
        desc: document.getElementById("description").value,
        label: document.getElementById("label").value,
        day: document.getElementById("days").value,
    };
    createTask(data);
}
