// TÜM ELEMENTLERİ SEÇTİK
const form         = document.getElementById ("todo-form");
const todoInput    = document.getElementById ("todo");
const todoList      = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll (".card-body")[1];
const filter        = document.getElementById ("filter");
const clearButton    = document.getElementById ("clear-todos");

eventListener();
function eventListener () { // tüm eventler
form.addEventListener ("submit",formfonksiyonu);
document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
secondCardBody.addEventListener("click", deleteTodo);

filter.addEventListener("keyup", filterTodos);
clearButton.addEventListener("click", clearAllTodos);

}
function clearAllTodos (e) {
// YAVAŞ VE KOLAY SİLME arayüzden todoları silme
if (confirm ("tüm todoları silmek istediğinize emin misiniz?")) {
todoList.innerHTML = "";

};
localStorage.removeItem("todos");
}




function filterTodos(e) {
const filterValue = e.target.value.toLowerCase();
const listItems   = document.querySelectorAll(".list-group-item");

listItems.forEach(function(listItem){
const text = listItem.textContent.toLowerCase();

if (text.indexOf(filterValue) === -1) {
// bulamadı
listItem.setAttribute("style", "display:none !important");
}else {
    listItem.setAttribute("style", "display:block");
}

});
}








function deleteTodo (e) {
if (e.target.className === "fa fa-remove"){
e.target.parentElement.parentElement.remove();
deleteTodoFromStorage (e.target.parentElement.parentElement.textContent);
showAlert ("success", "Todo silindi");
}

}
function deleteTodoFromStorage (deletetodo) {
let todos = getTodosFromStorage ();
todos.forEach(function(todo, index){
    if (todo === deletetodo) {
        todos.splice (index,1); // array'dan değeri silme
    }
});
localStorage.setItem("todos", JSON.stringify(todos));

}




function loadAllTodosToUI (e) {
let todos = getTodosFromStorage();
todos.forEach(function(todo) {
    addTodoToUI(todo);
})
}


function formfonksiyonu (e) {
const newTodo = todoInput.value.trim();


if (newTodo === "") {
    /* <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div> */
    showAlert("danger", "lütfen bir todo girin");
}else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert ("success", "başarıyla eklendi");

}

    e.preventDefault();
}
function getTodosFromStorage () { // storage dan tüm todoları alma
    let todos;

    if(localStorage.getItem("todos")=== null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
return todos;
}
function addTodoToStorage (newTodo) {
   let todos = getTodosFromStorage();

   todos.push(newTodo);
   localStorage.setItem("todos", JSON.stringify (todos))
}










function showAlert (type, message) {
    const alert = document.createElement("div");
alert.className = `alert alert-${type}`;
alert.textContent = message;

firstCardBody.appendChild(alert);

// BELİRLİ BİR SÜRE SONRA SİLİNMESİ İÇİN setTimeout

setTimeout(function () {
alert.remove();
},1000);

}
function addTodoToUI (newTodo) { // string değerini list item olarak UI'a eklenecek

    /* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>
*/

const listItem = document.createElement("li");
const aItem    = document.createElement("a");
// link oluşturma
aItem.id = "#";
aItem.className = "delete-item";
aItem.innerHTML = "<i class = 'fa fa-remove'></i>";

listItem.className = "list-group-item d-flex justify-content-between";

// TEXT NODE EKLEME
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(aItem);

// todo list e list ıtem ı ekleme 

todoList.appendChild(listItem);

// inputta yazı kalmaması için
todoInput.value ="";
}