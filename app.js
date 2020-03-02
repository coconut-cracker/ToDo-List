//-----  Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//-----  Load all Event Listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  // Remove Item event
  taskList.addEventListener("click", removeTask);

  // Clear Tasks event
  clearBtn.addEventListener("click", clearTasks);

  // Filter through tasks
  filter.addEventListener("keyup", filterTasks);
}

// ----- Get Tasks from LS
function getTasks() {
  if (localStorage.getItem("tasks") != null) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach(function(task) {
      // Create a task
      const li = document.createElement("li");

      li.className = "collection-item";

      li.textContent = task;

      const link = document.createElement("a");

      link.className = "delete-item secondary-content";

      link.innerHTML = '<i class="fa fa-remove"></i>';

      li.appendChild(link);

      taskList.appendChild(li);
    });
  }
}

// ----- Add Task
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Add a task!");
  }

  // Create a task
  // Create a new list item
  const li = document.createElement("li");
  // Add class to li
  li.className = "collection-item";
  // Add a text node to li
  li.textContent = taskInput.value;
  // li.innerHTML = taskInput.value;
  // li.appendChild(document.createTextNode(taskInput.value));

  // Create Remove link
  const link = document.createElement("a");
  // Add class to link
  link.className = "delete-item secondary-content";
  // Add icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);

  console.log(li);

  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";
}

//----- Store Task in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//----- Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log(e.target);

    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  // JSON.parse(localStorage.getItem("tasks")).lastChild.splice();
  // localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ----- Clear Tasks
function clearTasks(e) {
  // taskList.innerHTML = "";
  if (confirm("You want to clear all your tasks?")) {
    while (taskList.firstChild != null) {
      taskList.firstChild.remove();
    }

    clearTasksFromLocalStorage();
  }
}

// ----- Clear Tasks From LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// ----- Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
