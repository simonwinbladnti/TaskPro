/*
  File: script.js
  Author: Simon Winblad
  Date: 2023-11-30
  Description: Fully functional system for handling script side of TaskPro. Managing css changes and local storage changes.
*/

let menuActive = false; // Defining boolean variable for whether menu is active

// On window load trigger function loadTasksFromLocalStorage
window.onload = function () {
    loadTasksFromLocalStorage(); // Trigger function loadTasksFromLocalStorage
};

let selectBurger = document.querySelector(".burger-icon"); // Defining object variable for .burger-icon
selectBurger.addEventListener("click", showMenu); // Adding event listener for click event, trigger showMenu() when clicked

let addTasks = document.querySelector(".add-task"); // Defining object variable for .add-task
addTasks.addEventListener("click", addTask); // adding event listener for click event, trigger addTask() when clicked

let closeIcon = document.querySelector(".close-task"); // Defining object variable for .close-task
closeIcon.addEventListener("click", addTask); // adding event listener for click event, trigger closeTask() when clicked

/*
    Function for showing the nav menu when clicking on the .burger-icon button
    Parameters:
        - none (void)
     Returns: None
*/

function showMenu() {
  let menu = document.querySelector("nav"); // Select nav element from HTML document
    menu.classList.toggle("show"); // Toggle class for nav element, if active add class, if not remove class show.
}


/*
    Function for showing the addTask menu when clicking on the .addTask button
    Parameters:
        - none (void)
     Returns: None
*/

function addTask() {
  let menu = document.querySelector(".add-tasks"); // Select menu element from HTML document
    menu.classList.toggle("add-tasks-show"); // Toggle class for menu element, if active add class, if not remove class
}

// Event listener for keydown Escape. When prpessed trigger addTask()
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && menuActive) {
    addTask(); // Trigger function addTask
  }
});


/*
    Function for opening the remove-taks menu. Is triggered when clicking on a task.
    Parameters:
        - Event (object)
     Returns: None
*/

function deleteTask(event) {
  let menu = document.querySelector(".remove-tasks"); // Select remove-task class from HTML document
  if (!menuActive) { // If menu is not active
    menu.classList.add("remove-tasks-show"); // Remove class remove-tasks-show
    menuActive = true; // set variable menuActive to true
    taskToDelete = event.target.closest(".task"); // Setting taskToDelete variable to the targeted element
  } else {
    menu.classList.remove("remove-tasks-show"); // Remove class remove-tasks-show
    menuActive = false; // Sset variable menuActive to false
  }
}


/*
    Function for deleting the task that was last pressed. 
    Parameters:
        - none (void)
     Returns: None
*/

function confirmDelete() {
  if (taskToDelete) { // If there is a task to delete
    taskToDelete.parentNode.removeChild(taskToDelete); // Select child and remove it
    removeTaskFromLocalStorage(taskToDelete); // Trigger function removeTaskFromLocalStorage, med argument som taskToDelete
    document
      .querySelector(".remove-tasks")
      .classList.remove("remove-tasks-show"); // Remove class from element remove-tasks
    taskToDelete = null; // Set variable taskToDelete to null to remove current tas seleected
  }
}


/*
    Function for removing class .remove-tasks-show from .remove-tasks. Hiding the menu.
    Parameters:
        - none (void)
     Returns: None
*/

function cancelDelete() {
  document.querySelector(".remove-tasks").classList.remove("remove-tasks-show"); // Select element remove-tasks and then remove class remove-tasks-show
}


/*
    Function for removing the selected task from localStorage. 
    Parameters:
        - tasksElement (object)
     Returns: None
*/

function removeTaskFromLocalStorage(taskElement) {
  let existingTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get all items from local storage and make it to an array using JSON.parse
  let updatedTasks = existingTasks.filter((task) => {
    return !(
      task.label === taskElement.querySelector("h4").textContent &&
      task.desc === taskElement.querySelector("p").textContent
    ); // Get all the left tasks from local storage
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update the localStorage to the current left tasks
}

let taskElements = document.querySelectorAll(".calendar-tasks"); // Defining all the tasks in the calendar

// For every task elements in the calendar, add a event listener that trigger deleteTask()
taskElements.forEach(function (taskElement) {
  taskElement.addEventListener("click", deleteTask); 
});

document.getElementById("confirm").addEventListener("click", confirmDelete); // Add eventlistener for confirm button, when pressed, trigger cofirmDetelet()
document.getElementById("cancel").addEventListener("click", cancelDelete); // Add eventlisteneer for cancel button, when pressed, trigger cancelDetete()
let taskToDelete; // Defining a object variable, is set to the selected task to delete.


/*
    Function for creating a task
    Parameters:
        - data (object)
     Returns: None
*/

function createTask(data) {
  let newTaskElement = document.createElement("div"); // Create a new element: div
  newTaskElement.className = "task"; // Make class name task
  newTaskElement.innerHTML = `<h4>${data.label}</h4><p>${data.desc}</p>`; // Make the inner html of the element be data.label as h4 and data.desc as p
  let dayContainer = document.querySelector(
    `.${data.day.toLowerCase()} .calendar-tasks`
  ); // Get element of the day container
  if (dayContainer) { // if it's a correct day container
    dayContainer.appendChild(newTaskElement); // Make the newTaskElement set as child of the dayContainer
    saveTaskToLocalStorage(data); // Save the new data to local storage
  }
}


/*
    Function for loading tasks from and adding it to the calendar.
    Parameters:
        - none (void)
     Returns: None
*/

function loadTask(data) {
  let newTaskElement = document.createElement("div"); // Create a new element: div
  newTaskElement.className = "task"; // Make class name task
  newTaskElement.innerHTML = `<h4>${data.label}</h4><p>${data.desc}</p>`; // Make the inner HTML of the element be set to data.label as h4 and data.desc as p
  let dayContainer = document.querySelector(
    `.${data.day.toLowerCase()} .calendar-tasks`
  ); // Get element of the day container
  dayContainer.appendChild(newTaskElement); // Make the newTaskElement set as child of the dayContainer
}



/*
    Function for saving created tasks to local storage
    Parameters:
        - data (object)
     Returns: None
*/
function saveTaskToLocalStorage(data) {
  let existingTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get all current task item in localstorage
  existingTasks.push(data); // Adding the task item to the array of existingTasks
  localStorage.setItem("tasks", JSON.stringify(existingTasks)); // Adding the new task item to the array of existingTasks
}


/*
    Function for loading all tasks from localstorage
    Parameters:
        - none (void)
     Returns: None
*/

function loadTasksFromLocalStorage() {
  let existingTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get all current task item in localstorage
  document.querySelectorAll(".calendar-tasks .task").forEach((taskElement) => {
    taskElement.remove();
  }); // For each taskElement with the class calendar-tasks and task, remove taskElement from HTML
  existingTasks.forEach((task) => {
    loadTask(task); // For every task, trigger loadTask function
  });
}

let submitButton = document.querySelector("#submit"); // Defining element variable for #submit button
submitButton.addEventListener("click", submitForm); // Adding event listener for submit button, when form is clicked trigger submitForm()



/*
    Function for submitting a new form. 
    Parameters:
        - none (void)
     Returns: None
*/

function submitForm() {
  let data = {
    desc: document.getElementById("description").value, // Set variable for description
    label: document.getElementById("label").value, // Set variable for label
    day: document.getElementById("days").value, // Set variable for day
  }; // Set arary for data

  if (validateFormData(data)) { // trigger function validateFormData, if true trigger the createTask function
    createTask(data);
  }
}


/*
    Function for validating the form data.
    Parameters:
        - data (array)
     Returns: true or false
*/

function validateFormData(data) {
  let validForm = true; // Setting variable validFrom to boolean: true

  if (data.desc.trim() === "") { // If the description is empty, add class error to the description element
    document.getElementById("description").classList.add("error");
    validForm = false;
  } else {
    document.getElementById("description").classList.remove("error");
  }

  if (data.label.trim() === "") { // If the label is empty, add class error to the description element
    document.getElementById("label").classList.add("error");
    validForm = false;
  } else {
    document.getElementById("label").classList.remove("error");
  }

  return validForm; // return variable validForm: true or false
}

const taskList = document.querySelectorAll(".task"); // Defining element variable for tasks


// For every task, when hovered add a box shadow to the certain task hovered, If not remove it.
taskList.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)"; // Set the item style to box shadow
  });

  item.addEventListener("mouseout", () => {
    item.style.boxShadow = "none"; // Set the style of item to none
  });
});