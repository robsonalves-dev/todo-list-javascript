const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'completed' : '';

    li.innerHTML = `
      <span>${task.text}</span>
      <button onclick="removeTask(${index})">❌</button>
    `;

    li.addEventListener('click', () => toggleTask(index));
    list.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text) {
  tasks.push({ text, done: false });
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  addTask(input.value);
  input.value = '';
});

renderTasks();
