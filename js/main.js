let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let data = [];

//Create Task
add.addEventListener("click", function() {
  if (input.value !== "") {
    data.length = 0;
    let objj = { id: Date.now(), text: input.value };
    data.push(objj);
    input.value = "";
    SaveDataToLocalStorage(data);
    createTask(objj);
  }
});
// Remove Task
document.addEventListener("click", function(e) {
  if (e.target.className === "delete") {
    let id = parseInt(e.target.parentElement.id);
    let tasks = [];
    let newTasks = [];
    tasks = JSON.parse(localStorage.getItem("tasks"));
    newTasks = tasks.filter(function(el) {
      return el[0].id !== id;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    e.target.parentElement.remove();
  }
});

window.onload = function() {
  if (localStorage.getItem("tasks")) {
    let tasks = [];
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasks.length; i++) {
      createTask(tasks[i][0]);
    }
  }
};
function SaveDataToLocalStorage(data) {
  let tasks = [];
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(data);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function createTask(...data) {
  let divTask = document.createElement("div");
  let p = document.createElement("p");
  let textP = document.createTextNode(`${data[0].text}`);
  let button = document.createElement("button");
  button.setAttribute("class", "delete");
  p.appendChild(textP);
  button.textContent = "Delete";
  divTask.className = "task";
  divTask.setAttribute("id", `${data[0].id}`);
  divTask.prepend(p);
  divTask.append(button);
  tasks.appendChild(divTask);
}
