const addTodoBtn = document.getElementById("addTodoBtn")
const inputTag = document.getElementById("todoInput")
const todoListUl = document.getElementById("todoList")
const remaining = document.getElementById("remaining count")
const clearComplitedBtn = document.getElementById("clearComplitedBtn")

let TodoText;
let todos = [];
let todosString = localStorage.getItem("todos")
if (todosString) {
    todos = JSON.parse(todosString);
    remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
}
const populateTodos = () => {
    let String = "";
    for (const todo of todos) {
        String += ` <li id="${todo.id}"class="todo-item ${todo.isCompleted ? "completed" : ""}">
        <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
        <span class="todo-text">${todo.title}</span>
        <button class="delete-btn">×</button>
    </li>`
    }
    todoListUl.innerHTML = String

    const todoCheckboxes = document.querySelectorAll(".todo-checkbox")
    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.ckecked) {
                element.parentNode.classList.add("complited")
                console.log(element.parentNode.id)
                todos = todos.map(todo => {
                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    }
                    else {

                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todo", JSON.stringify(todos))
            }
            else {
                element.parentNode.classList.remove("complited")
                todos = todos.map(todo => {
                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {

                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todo", JSON.stringify(todos))
            }
        })
    })

    clearComplitedBtn.addEventListener("click", () => {
        todos = todos.filter((todo) => todo.isCompleted == false)
        populateTodos()
        localStorage.setItem("todo", JSON.stringify(todo))
    })
    let deleteBtn = document.querySelectorAll(".delete-btn")
    deleteBtn.forEach((element) => {
        element.addEventListener("click", (e) => {
            const confirmation = confirm("Do you want to delete this todo ")
            if (confirmation) {
                todos = todos.filter((todo) => {
                    return (todo.id) !== (e.target.parentNode.id)
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
                populateTodos()
            }
        })
    })
}
addTodoBtn.addEventListener("click", () => {
    TodoText = inputTag.value
    if (TodoText.trim().length < 4) {
        alert("YOU CAN'T ADD A TODO THAT SMALL !")
        return
    }
    console.log(TodoText)
    inputTag.value = ""
    let todo = {
        id: "todo-" + Date.now(),
        title: TodoText,
        isCompleted: false
    }
    todos.push(todo)
    remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos()
})
populateTodos()
remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;