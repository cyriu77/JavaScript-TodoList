//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterT = document.querySelector('.filtr-t');
//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click", deleteCheck);
filterT.addEventListener('click', filterTod)

//functions
function addTodo (event)
{
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const liTodo = document.createElement("li");
    liTodo.innerText = todoInput.value;
    liTodo.classList.add("todo-item");
    todoDiv.appendChild(liTodo);
    //add todo to local
    saveLocalTodo(todoInput.value);
    //check mark button
    const complateButton = document.createElement("button");
    complateButton.innerHTML = '<i class="fas fa-check"></i>';
    complateButton.classList.add("compl-btn");
    todoDiv.appendChild(complateButton);
    //check trash button 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = "";
    /*const deleteE = document.addEventListener("li")*/
    console.log('hello');
}
function deleteCheck (e){
    /*e.stop.progression;*/
    const item = e.target;
    if(item.classList[0] === 'trash-btn')
    {
        const todo = item.parentElement;
        todo.classList.add('cat');
        removeLocalStorage(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
        
        
    }
    if(item.classList[0] === 'compl-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('complated');
    }
}
function filterTod(e)
{
    const todos = todoList.childNodes;
    todos.forEach((todo)=>{
        if(todo.classList !== null){
            switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
            break;
            case 'complated':
                if(todo.classList.contains('complated')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
               case 'uncomplated':
                   if(!todo.classList.contains('complated'))
                   {
                       todo.style.display = 'flex';
                   }
                   else{
                       todo.style.display = 'none';
                   }
                break;
            }
        }
        return;
    });
}
function saveLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todods', JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const liTodo = document.createElement("li");
    liTodo.innerText = todo;
    liTodo.classList.add("todo-item");
    todoDiv.appendChild(liTodo);
    //check mark button
    const complateButton = document.createElement("button");
    complateButton.innerHTML = '<i class="fas fa-check"></i>';
    complateButton.classList.add("compl-btn");
    todoDiv.appendChild(complateButton);
    //check trash button 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    });
}
function removeLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}