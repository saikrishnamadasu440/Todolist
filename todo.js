let tasks = [];
const taskslist = document.getElementById('list');
const addtaskinput = document.getElementById('add');
const taskscounter = document.getElementById('task-counter');

// Add new task to the list
function addTask(task){  
  if (task){
    tasks.push(task);
    renderList();
    showNotification('Task added successfully');
    return;
  }
  showNotification('Task cannot be added');
}

// Delete task
function deleteTask(taskId){   
  const newTasks = tasks.filter(function(task){
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification('Task deleted successfully');
}

// Toggle task
function toggleTask(taskId){
  const task = tasks.filter(function(task){
    return task.id === taskId;
  });
  if (task.length > 0){
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();
    showNotification('Task toggled successfully');
    return;
  }
  showNotification('Could not toggle the task');
}

// Show notification
function showNotification(text){
  alert(text);
}

// Handle input keypress
function handleInputKeypress (e) {
  if (e.key === 'Enter') {
    const text = e.target.value;
    console.log('text', text);
    if (!text) {
      showNotification("Task is empty");
      return;
    }
    const task = {
      text,
      id: Date.now().toString(),
      done: false
    };
    e.target.value ='';
    addTask(task);
  }
}

// Add task to DOM
function addTaskDom(task){
  const li = document.createElement('li');
  li.innerHTML = `
    <li>
      <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
      <label for="${task.id}">${task.text}</label>
      <img src="https://img.icons8.com/material/24/null/filled-trash.png" class="delete" data-id="${task.id}" />
    </li> 
  `;
  taskslist.append(li);
}

// Render task list
function renderList() {
  taskslist.innerHTML = '';
  for (let i = 0; i < tasks.length; i++){
    addTaskDom(tasks[i]);
  }
  taskscounter.innerHTML = tasks.length;
}
function handleClickListener(e) {
  const target = e.target;
  console.log(target);


  if(target.className === 'delete'){
const taskId = target.dataset.id;
  deleteTask(taskId);
  return;
}
else if(target.className === 'custom-checkbox'){
  const taskId = target.id;
  toggleTask(taskId);
  return;

}

}
addtaskinput.addEventListener('keyup', handleInputKeypress);
document.addEventListener('click', handleClickListener);