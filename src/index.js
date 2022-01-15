import './style.css';
import TodoList from './todolist.js';

const todoList = new TodoList();
todoList.displayTasks();
const clearBtn = document.getElementById('clear-completed');
clearBtn.addEventListener('click', () => {
  todoList.clearCompleted();
});
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newActivity = form.elements.new_task.value;
  todoList.addTask(newActivity);
  todoList.displayTasks();
  form.reset();
});
