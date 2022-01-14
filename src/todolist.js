export default class TodoList {
a

constructor() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    this.tasks = savedTasks;
  } else {
    this.tasks = [];
  }
}

displayTasks() {
  this.sortAndSave();
  const check = 'fa-check';
  const uncheck = 'fa-square-o';
  const line_through = 'linethrough';
  const taskSection = document.querySelector('.task-list');
  taskSection.innerHTML = '';
  this.tasks.forEach((task) => {
    const Done = task.completed ? check : uncheck;
    const Line = task.completed ? line_through : '';
    const task_temp = `
        <li class="item d-flex">
          <div class="task d-flex">
            <i class="fa ${Done} update-status" job="complete" data="${task.index}"></i>
            <p class="ptag ${Line}" contenteditable="true"  data="${task.index}">${task.description}</p>
          </div>
          <i class="fa fa-trash-o delete-task" job="delete"  data="${task.index}"></i>
        </li>
        `;
    taskSection.innerHTML += task_temp;
  });
  this.attachEvents();
}

addTask(task) {
  this.tasks.push({
    description: task,
    completed: false,
    index: this.tasks.length,
  });
}

sortAndSave() {
  this.tasks.forEach((object, index) => {
    this.tasks[index].index = index + 1;
  });
  this.tasks.sort((a, b) => {
    if (a.index < b.index) return -1;
    if (a.index > b.index) return 1;
    return 0;
  });
  localStorage.setItem('tasks', JSON.stringify(this.tasks));
}

updateTaskStatus(index) {
  const target = this.tasks[index - 1];
  if (target.completed === true) {
    this.tasks[index - 1].completed = false;
  } else {
    this.tasks[index - 1].completed = true;
  }
  this.displayTasks();
}

deleteTask(index) {
  this.tasks.splice(index - 1, 1);
  this.displayTasks();
}

editTask(newValue, index) {
  this.tasks[index - 1].description = newValue;
  this.sortAndSave();
}

clearCompleted() {
  const pendingTasks = this.tasks.filter((task) => task.completed === false);
  this.tasks = pendingTasks;
  this.sortAndSave();
  this.displayTasks();
}

attachEvents() {
  // status update
  const listItems = document.querySelectorAll('.update-status');
  listItems.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
      const taskIndex = e.target.getAttribute('data');
      console.log(taskIndex);
      this.updateTaskStatus(taskIndex);
    });
  });

  // delete tasks
  const activity = document.querySelectorAll('.delete-task');
  activity.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', (e) => {
      const taskIndex = e.target.getAttribute('data');
      this.deleteTask(taskIndex);
    });
  });

  // edit tasks
  const binIcons = document.querySelectorAll('.ptag');
  binIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('input', (e) => {
      const taskIndex = e.target.getAttribute('data');
      const newValue = e.target.innerText;
      this.editTask(newValue, taskIndex);
    });
  });
}
}