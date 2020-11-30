import loadItems from './loadItems';
import { createNewTask, createNewProject, showTodaysTasks, showAllTasksFolder, showAllProjectFolders, displayProjectTasks } from './saveItem'

// load saved items
loadItems;
// show today's tasks
showTodaysTasks();

// show all project folders and show all tasks in all tasks folder
document.getElementById('viewAllProjectFolders').addEventListener('click', showAllProjectFolders);
document.getElementById('viewAllTasksFolders').addEventListener('click', showAllTasksFolder);

// show todays tasks when view all tasks is clicked
let viewAllTasks = document.querySelectorAll('.viewTodayTasksFolder');
viewAllTasks.forEach(div =>
	div.addEventListener('click', showTodaysTasks));

// display create new task form
let showCreateNewTask = document.querySelectorAll('.showCreateNewTask');
showCreateNewTask.forEach(div =>
	div.addEventListener('click', displayCreateNewTaskForm));
 
function displayCreateNewTaskForm() {
	    document.getElementById('createNewTask').classList.toggle('display');
	    document.getElementById('taskList').classList.toggle('hide');
	    console.log('yes')
	};
// hide create new task form 
document.querySelector('[data-close="task"]').addEventListener('click', function() {
	    document.getElementById('createNewTask').classList.toggle('display');
	    document.getElementById('taskList').classList.toggle('hide');
	});
document.getElementById('showCreateNewProject').addEventListener('click', function() {
    document.getElementById('createNewProject').classList.toggle('display');
    document.getElementById('projectList').classList.toggle('hide');
	document.getElementById('taskList').classList.toggle('hide');
});

//
document.getElementById('saveProject').addEventListener('click', createNewProject);
document.getElementById('saveProject').addEventListener('click', function (){
    document.getElementById('createNewProject').classList.remove('display');
    document.getElementById('projectList').classList.toggle('hide');
});
// click on project name to view tasks assigned to that project folder
let projectNames = document.querySelectorAll('[data-project]');
projectNames.forEach(div =>
	div.addEventListener('click', displayProjectTasks));

//
document.getElementById('saveTask').addEventListener('click', createNewTask);
document.getElementById('saveTask').addEventListener('click', function (){
    document.getElementById('createNewTask').classList.remove('display');
    document.getElementById('taskList').classList.toggle('hide');
});

// document.querySelectorAll('.removeTaskButton').forEach(button => button.addEventListener('click', removeTask));