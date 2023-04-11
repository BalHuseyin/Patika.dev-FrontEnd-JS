// Tüm elementleri seçmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const searchFilter = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoUI);
  clearButton.addEventListener("click", allTodosEveryWhere);
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
// Delete ALL Todo
function allTodosEveryWhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    // Delete DOM
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    // Delete LocalStorage
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Tüm todo'lari başarıyla sildiniz.");
  } else {
    showAlert("warning", "Silinecek todo bulunamadı");
  }
  console.log(todoListesi);
}

function removeTodoUI(e) {
  if (e.target.className === "fa fa-remove") {
    // Delete DOM
    const todo = e.target.parentElement.parentElement;
    todo.remove();

    // Delete LocalStorage
    removeTodoStorage(todo.textContent);
    showAlert("success", "Todo silindi");
  }
  e.preventDefault();
}

// Delete ToDo LocalStorage Functions
function removeTodoStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add ToDo

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText === null || inputText === "") {
    showAlert("danger", "Lütfen boş birakmayiniz");
  } else {
    // Add Dom ToDO
    addTodoToUI(inputText);

    // ADD LocalStorage ToDo
    addTodoToStorage(inputText);

    // Alert --> Uyarı penceresi
    showAlert("success", "Todo Eklendi");
  }

  e.preventDefault();
}

function addTodoToUI(newTodo) {
  // Create li

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  // Create a

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;
  firstCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 1000);
}
