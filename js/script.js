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

selectBurger.addEventListener("click", showMenu);

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

addTasks.addEventListener("click", addTask);

let closeIcon = document.querySelector(".close-task");

closeIcon.addEventListener("click", addTask);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && menuActive) {
    addTask();
  }
});

function deleteTask(event) {
  let menu = document.querySelector(".remove-tasks");
  if (!menuActive) {
    menu.classList.add("remove-tasks-show");
    menuActive = true;
    taskToDelete = event.target.closest(".task");
  } else {
    menu.classList.remove("remove-tasks-show");
    menuActive = false;
  }
}

function confirmDelete() {
  if (taskToDelete) {
    taskToDelete.parentNode.removeChild(taskToDelete);
    removeTaskFromLocalStorage(taskToDelete);
    document
      .querySelector(".remove-tasks")
      .classList.remove("remove-tasks-show");
    taskToDelete = null;
  }
}
function cancelDelete() {
  document.querySelector(".remove-tasks").classList.remove("remove-tasks-show");
}

function removeTaskFromLocalStorage(taskElement) {
  let existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let updatedTasks = existingTasks.filter((task) => {
    return !(
      task.label === taskElement.querySelector("h4").textContent &&
      task.desc === taskElement.querySelector("p").textContent
    );
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

let taskElements = document.querySelectorAll(".calendar-tasks");

taskElements.forEach(function (taskElement) {
  taskElement.addEventListener("click", deleteTask);
});

document.getElementById("confirm").addEventListener("click", confirmDelete);
document.getElementById("cancel").addEventListener("click", cancelDelete);
let taskToDelete;

function createTask(data) {
  let newTaskElement = document.createElement("div");
  newTaskElement.className = "task";
  newTaskElement.innerHTML = `<h4>${data.label}</h4><p>${data.desc}</p>`;
  let dayContainer = document.querySelector(
    `.${data.day.toLowerCase()} .calendar-tasks`
  );
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
  let dayContainer = document.querySelector(
    `.${data.day.toLowerCase()} .calendar-tasks`
  );
  dayContainer.appendChild(newTaskElement);
}

function saveTaskToLocalStorage(data) {
  let existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  existingTasks.push(data);
  localStorage.setItem("tasks", JSON.stringify(existingTasks));
}

function loadTasksFromLocalStorage() {
  let existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  document.querySelectorAll(".calendar-tasks .task").forEach((taskElement) => {
    taskElement.remove();
  });
  existingTasks.forEach((task) => {
    loadTask(task);
  });
}

window.onload = function () {
  loadTasksFromLocalStorage();
};

let submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", submitForm);

function submitForm() {
  let data = {
    desc: document.getElementById("description").value,
    label: document.getElementById("label").value,
    day: document.getElementById("days").value,
  };

  if (validateFormData(data)) {
    createTask(data);
  }
}

function validateFormData(data) {
  let validForm = true;

  if (data.desc.trim() === "") {
    document.getElementById("description").classList.add("error");
    validForm = false;
  } else {
    document.getElementById("description").classList.remove("error");
  }

  if (data.label.trim() === "") {
    document.getElementById("label").classList.add("error");
    validForm = false;
  } else {
    document.getElementById("label").classList.remove("error");
  }

  return validForm;
}

const taskList = document.querySelectorAll(".task");

taskList.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  });

  item.addEventListener("mouseout", () => {
    item.style.boxShadow = "none";
  });
});
