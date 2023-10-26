// elementos DOM
const input = document.querySelector(".input-text");
const addForm = document.querySelector(".add-form");
const tasksList = document.querySelector(".task-list");
const deleteAllBtn = document.querySelector(".deleteAll-btn");

// array donde se almacenan las tareas

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let ID = 1;

const createHTMLelement = ({ id, name }) => {
  return `<li>${name} <img 
  class="delete-btn" src="./images/delete.png" alt="botón de borrar" data-id="${id}"  /></li>`;
};

const renderTaskList = (tasks) => {
  const allTasks = tasks.map((task) => createHTMLelement(task)).join("");
  tasksList.innerHTML = allTasks;
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const addTask = (e) => {
  e.preventDefault(); // evita que la pagina se recargue cada vez que agrego una tarea
  const taskName = input.value; // guardamos el valor de del texto que escribamos en el input en una constante.
  if (taskName.trim().length === 0) return; // si el campo del input esta vacio, no hace nada

  const newTask = {
    id: ID,
    name: taskName,
  };

  tasks = [...tasks, newTask]; // copio el array usando el spray operator , para guardar nuevos elementos dentro del mismo y sumarle la newTask (el objeto)
  ID++;
  input.value = "";
  console.log(tasks, newTask);
  createHTMLelement(tasks);
  renderTaskList(tasks);
  saveToLocalStorage(tasks);
  hideDeleteBtn(tasks);
};

const deleteTask = (e) => {
  if (!e.target.classList.contains(".delete-btn")) 
  console.log(e.target);
  const taskIdToDelete = parseInt(e.target.dataset.id);
  tasks = tasks.filter((task) => task.id !== taskIdToDelete);
  createHTMLelement(tasks);
  renderTaskList(tasks);
  saveToLocalStorage(tasks);
  hideDeleteBtn(tasks);
};

const deleteAll = () => {
  tasks = [];
  createHTMLelement(tasks);
  renderTaskList(tasks);
};

const hideDeleteBtn = (todoList) => {
  // funcion  para ocultar el boton de eleminar todo cuando no hay elementos en la lista
  if (todoList.length === 0) {
    deleteAllBtn.classList.add("hidden");
    return;
  } else {
    deleteAllBtn.classList.remove("hidden");
  }
};

function init() {
  addForm.addEventListener("submit", addTask);
  deleteAllBtn.addEventListener("click", deleteAll);
  tasksList.addEventListener("click", deleteTask);
  hideDeleteBtn(tasks);
}

init();
