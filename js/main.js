/*----- constants -----*/


/*----- app's state (variables) -----*/
var todos, displayMode;

/*----- cached element references -----*/
var newTask = document.getElementById('newTodo');
var myList = document.getElementById('tasks');
/*----- event listeners -----*/
document.getElementById('submit').addEventListener('click', addTodo);

myList.addEventListener('click', markDone);
document.querySelector('.direct').addEventListener('click', function(e) {
    displayMode = e.target.textContent;
    render();
});
/*----- functions -----*/

function markDone(e) {
    if (e.target.tagName !== 'BUTTON') return;
    var text = e.target.parentElement.textContent;
    text = text.substring(0, text.length - 3);
    todos.find(t => t.task === text).done = true;
    render();
}

function initialize() {
    todos = [];
    displayMode = 'All';
    render();
}

function addTodo() {
    todos.push({task: newTask.value, done: false});
    newTask.value = '';
    render();
}

function render() {
    var displayTodos;
    // 
    if (displayMode === 'All') {
        displayTodos = todos;
    } else if (displayMode === 'Completed') {
        displayTodos = todos.filter(t => t.done);
    } else {
        displayTodos = todos.filter(t => !t.done);
    }
    var html = '';
    displayTodos.forEach(function(t, idx) {
        html += `<li ${t.done ? 'class="done"' : ''}>${t.task}&nbsp;&nbsp;<button>X</button></li>`;
    });
    myList.innerHTML = html;
}

initialize();