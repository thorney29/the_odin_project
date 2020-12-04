import loadItems from './loadItems';
import { createNewTask, createNewProject, showTodaysTasks, showAllTasksFolder, showAllProjectFolders, displayProjectTasks, delegate, removeTask, removeProject, editTask, updateTask, editProject, updateProject } from './saveItem'

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
delegate(document, "click", ".tasks", function(event) {
    displayCreateNewTaskForm();
});
// if(document.querySelector('tasks') !== null){
// let updateThis = document.querySelector('tasks');
// updateThis.addEventListener('click', function () {
// 	alert('alert')
let getIt = document.querySelector('.showCreateNewTask');
getIt.addEventListener('click', displayCreateNewTaskForm);

function displayCreateNewTaskForm() {
	    // document.getElementById('createNewTask').classList.toggle('display');
	    document.getElementById('createNewTask').setAttribute('data-form-visible', 'yes');
	    document.getElementById('taskList').setAttribute('data-visible', 'no');
		document.getElementById('taskFormTitle').innerHTML  = 'Create New Task';
		document.getElementById('saveTask').setAttribute('data-visible', 'yes');
		document.getElementById('saveEditedTask').setAttribute('data-visible', 'no');

	    document.getElementById("id").value = '';
		document.getElementById("title").value = '';
	    document.getElementById("description").value = '';
	    document.getElementById("dueDate").value = '';
	    document.getElementById("priority").value  = '';
	    document.getElementById("notes").value = '';
	    document.getElementById("project").value  = '';
	    console.log('yes');
};

// hide create new task form 
document.querySelector('[data-close="task"]').addEventListener('click', function() {
    document.getElementById('createNewTask').setAttribute('data-form-visible', 'no');
    document.getElementById('taskList').setAttribute('data-visible', 'yes');
});
// click on showCreateNewProject to display the create new project form and hide the tasks 
document.getElementById('showCreateNewProject').addEventListener('click', function() {
    document.getElementById('createNewProject').setAttribute('data-form-visible', 'yes');
	document.getElementById('taskList').setAttribute('data-visible', 'no');
	document.getElementById('projectFormTitle').innerHTML  = 'Create New Project';	
	document.getElementById('saveProject').setAttribute('data-visible', 'yes');
	document.getElementById('saveEditedProject').setAttribute('data-visible', 'no');
	document.getElementById('projectId').value = '';	
	document.getElementById("projectName").value = '';
});

// click on save project to create and save new project
document.getElementById('saveProject').addEventListener('click', createNewProject);
document.getElementById('saveProject').addEventListener('click', function (){
	document.getElementById('createNewProject').setAttribute('data-form-visible', 'no');

});
// click on project name to view tasks assigned to that project folder

delegate(document, "click", '[data-project]', function(e) {
	let projectName = e.target.getAttribute('data-project').toLowerCase();
    displayProjectTasks(e, projectName);
});
// remove this task on click
delegate(document, "click", '.removeTaskButton', function(e) {
	let taskName = e.target.getAttribute('data-remove');	
    removeTask(taskName);
});

delegate(document, "click", '.editProjectButton', function(event) {
	document.getElementById('createNewProject').setAttribute('data-form-visible', 'yes');
	document.getElementById('taskList').setAttribute('data-visible', 'no');
	document.getElementById('saveProject').setAttribute('data-visible', 'no');
	document.getElementById('saveEditedProject').setAttribute('data-visible', 'yes');

	document.getElementById('projectFormTitle').innerHTML  = 'Edit Project';	
	let currentProjectTitle = event.target.getAttribute('data-edit-title');
	let orgProjectName  = document.getElementById("projectName").value;
	let projectColor = document.getElementById("projectColor").value;

    sessionStorage.setItem("projectname", orgProjectName);  
    editProject(event, currentProjectTitle, projectColor);
});
// remove this project on click
delegate(document, "click", '.removeProjectButton', function(e) {
	let currentProjectTitle = event.target.getAttribute('data-edit-title');
    removeProject(e, currentProjectTitle);
});

function displayEditTaskForm() {
	document.getElementById('createNewTask').setAttribute('data-form-visible', 'yes');
	document.getElementById('taskList').setAttribute('data-visible', 'no');
	document.getElementById('taskFormTitle').innerHTML  = 'Edit Task';
	document.getElementById('saveTask').setAttribute('data-visible', 'no');
	document.getElementById('saveEditedTask').setAttribute('data-visible', 'yes');
}

// Edit task on click
delegate(document, "click", '.editTaskButton', function(event) {
	displayEditTaskForm();
	document.getElementById('taskFormTitle').innerHTML  = 'Edit Task';	
	let currentTaskId = '';
	currentTaskId = event.target.getAttribute('data-edit');
	console.log(currentTaskId);
    editTask(event, currentTaskId);
});

// close project
document.querySelector('[data-close="project"]').addEventListener('click', function() {
    document.getElementById('createNewProject').setAttribute('data-form-visible', 'no');
    document.getElementById('taskList').setAttribute('data-visible', 'yes');
});

// create new task on save
document.getElementById('saveTask').addEventListener('click', createNewTask);

// update edited task on save
delegate(document, "click", '#saveEditedTask', function(e) {
	document.getElementById('saveTask').setAttribute('data-visible', 'no');
	document.getElementById('saveEditedTask').setAttribute('data-visible', 'yes');
	let currentTask = '';
	currentTask = document.getElementById('id').value;	
	console.log(currentTask);
	updateTask(e, currentTask); 
});

// update edited task on save
delegate(document, "click", '#saveEditedProject', function() {
	document.getElementById('saveProject').setAttribute('data-visible', 'no');
	document.getElementById('saveEditedProject').setAttribute('data-visible', 'yes');
	let currentProjectId = document.getElementById('projectId').value;	
	let currentProjectName = document.getElementById("projectName").value;
	let currentProjectColor = document.getElementById("projectColor").value;

    let getOriginalProjectName = sessionStorage.getItem("projectname"); 
    console.log(getOriginalProjectName);

	updateProject(currentProjectId, currentProjectName, getOriginalProjectName, currentProjectColor); 
});
// show tasklist and hide form on save
document.getElementById('saveTask').addEventListener('click', function (){
    document.getElementById('createNewTask').setAttribute('data-form-visible', 'no');
    document.getElementById('taskList').setAttribute('data-visible', 'yes');
});

delegate(document, "click", '.taskCard', function() {
	// this.firstElementChild.('details').setAttribute('data-visible', 'yes');
	let visibleStatus = this.querySelector('.details').getAttribute('data-visible');
	if(visibleStatus == 'yes') {
		this.querySelector('.details').setAttribute('data-visible', 'no');
	} else {
		this.querySelector('.details').setAttribute('data-visible', 'yes');
	}
});

