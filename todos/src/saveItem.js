	// Variables
	const Project = require('./project.js').default; /* get the Item object */
	const Task = require('./task.js').default; /* get the Item object */

    let projectFolder = [];
    let taskFolder = [];
    let template = ''; 
    
 //    let displayEditButton = document.createElement('button');
 //    displayEditButton.classList.add('editbButton');

 //    let displayRemoveButton = document.createElement('div');
 //    displayRemoveButton.classList.add('removeButton');
	// displayRemoveButton.addEventListener('click', removeItem);

	// on page load

	const loadContentInStorage = (() => {
		if(localStorage.getItem('projectFolder', projectFolder)) {
	        try {
	            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
	            updateProjectDisplay(projectFolder, template, projectList);	
	           	console.log('this ran');
	           	console.log(taskFolder);
	        } catch(e) {
	            localStorage.removeItem('projectFolder');
	        }
	    } 
	    if(localStorage.getItem('taskFolder', taskFolder)) {
	        try {
	            taskFolder = JSON.parse(localStorage.getItem('taskFolder'));
	            updateDisplay(taskFolder, template, taskList);	
	           	console.log('did this run');
	        } catch(e) {
	            localStorage.removeItem('taskFolder');
	            console.log('did this NOT run');
	        }
	    } 
	})();    

 //    function saveTaskToLocalStorage () {
	//     if(localStorage.getItem('taskFolder', taskFolder)) {
	//         try {
	//             taskFolder = JSON.parse(localStorage.getItem('taskFolder'));
	//             console.log("this is to get from storage");
	// 	} catch(e) {
	//             localStorage.removeItem('taskFolder')
	//         }
	//     }
	// }
	// function saveProjectToLocalStorage () {
	//     if(localStorage.getItem('projectFolder', projectFolder)) {
	//         try {
	//             projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
	//             console.log("this is to get from storage");
	// 	} catch(e) {
	//             localStorage.removeItem('projectFolder')
	//         }
	//     }
	// }
    // called through functions
 	function saveSavedProjectFolder (projectFolder) {
 		localStorage.setObj('projectFolder', projectFolder);
	}   
	 
	function saveSavedTaskFolder (taskFolder) {
 		localStorage.setObj('taskFolder', taskFolder);
	}  
	function getSavedProjectFolder() {
		projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
		return projectFolder;
	}

	 
	function getSavedTaskFolder() {
		taskFolder = JSON.parse(localStorage.getItem('taskFolder'));
		return taskFolder;
	}

	/* NEW  To save projects => add to project folder, update display, save project folder */ 
    function saveNewProject (projectName) {
		projectFolder.push(projectName);
	 	// projectFolder.reverse();
	 	updateProjectDisplay(projectFolder, template, projectList);	 	
		saveSavedProjectFolder(projectFolder);
	}  
	/* Save a new task --rename from item to task, update project folder to be task folder */ 
	function saveNewTask (task) {
		taskFolder.push(task);
	 	// projectFolder.reverse();
	 	updateDisplay(taskFolder, template, taskList);	 	
		saveSavedTaskFolder(taskFolder);
		console.log("this is in saveNewTask");
	}

	function resetProjectList () {
		return template = '';
	}

	function resetTaskList () {
		return template = '';
	}
	// function showAllItemsFolder() {
	// 	resetProjectList();
	// 	updateDisplay(projectFolder,template,projectList);
	// }
	function showAllProjectFolders() {
		resetProjectList();
		updateProjectDisplay(projectFolder, template, projectList);
	}
	
	/* Show all Tasks in the tasks folder */ 
	function showAllTasksFolder() {
		resetTaskList();
		document.getElementById('taskTitle').innerHTML = 'All Tasks';
		updateDisplay(taskFolder, template, taskList);
	}

	// on click
	const createNewProject = () => {
		let projectName = document.getElementById("projectName").value;
		let project = new Project(projectName);
		saveNewProject(project);
		document.getElementById('createNewProject').classList.remove('display');
	}

 	const createNewTask = (projectFolder) => {
		let title = document.getElementById("title").value;
	    let description = document.getElementById("description").value;
	    let date = document.getElementById("dueDate").value; /* Format date */
	    let dueDate = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) { 
        return m + '/' + d + '/' + y;});
	    let priority = document.getElementById("priority").value;
	    let notes = document.getElementById("notes").value;
	    let projectName = document.getElementById("project").value;
	    // console.log(project)
	    // if projectfolder is not empty, loop through the project folder and push item into array
	    // if the array matches project name
	    if(projectFolder.length !== 0) {
	    	for(let i = 0; i < projectFolder.length; i++) {
	    		if(projecFolder === projectName) {
	    			projectFolder.push(projectName);
	    		}
	    	}
	    }
	    let task = new Task(title, description, dueDate, priority, notes, projectName);
		saveNewTask(task);
		document.getElementById('createNewTask').classList.remove('display');
    };

 	// on click
	function removeTask(e) { 
		let arrayIndex =  e.currentTarget.parentNode.getAttribute('data-array-index');
		taskFolder.splice(arrayIndex, 1);
		updateDisplay(taskFolder, template, taskList);
	 	saveSavedTaskFolder(taskFolder);
	}
	// new
	function removeProject(e) { 
		let arrayIndex =  e.currentTarget.parentNode.getAttribute('data-array-index');
		projectFolder.splice(arrayIndex, 1);
		updateProjectDisplay(projectFolder, template, projectList);
	 	saveSavedProjectFolder(projectFolder);
	}
	function displayProjectTasks (e) {
		resetTaskList();
		getSavedTaskFolder();
		console.log("this ran too");
		console.log(taskFolder);
		let projectName = e.currentTarget.getAttribute('data-project').toLowerCase();
		let projectTasks  = taskFolder.filter(function (task) {
		  		// var date = new Date().toLocaleString().split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("/");
		  		console.log(projectName);
		  		console.log(task.project);
		  		return (projectName.toLowerCase() == task.project.toLowerCase());
		});
		document.getElementById('taskTitle').innerHTML = 'Tasks in ' + projectName.toUpperCase() + ' Project Folder';
		updateDisplay(projectTasks, template, taskList);
	}
	let showTodaysTasks = (task) => {
		resetTaskList();
		getSavedTaskFolder();
		// let tempFolder = projectFolder;
		console.log('taskFolder in show todays task');
		console.log(taskFolder);
 		let todaysTasks  = taskFolder.filter(function (task) {
		  		var date = new Date().toLocaleString().split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("/");
		  		console.log(date);
		  		console.log(task.dueDate);
		  		return (date == task.dueDate);
		});
		document.getElementById('taskTitle').innerHTML = 'Today\'s Tasks';
		updateDisplay(todaysTasks, template, taskList);
	}

	// render on page load, item save, and item remove 
	function updateProjectDisplay (array, template, node) {
		console.log('array');
		console.log(array);
		// console.log('node');
		// console.log(node);
		// console.log('template');
		// console.log(template);
		function render (template, node) {
			if (!node) {return;}
			if(array.length <= 0) {
				template += 'There is nothing to display.';
				node.innerHTML = template;
			} else { 
				for (let p = 0; p < array.length; p++) {
					template += `
			            <li data-project="${array[p].projectName}"> ${array[p].projectName}
			             <button data-array-index="${p}" class="editProjectButton"><i class="far fa-edit"></i></button>
			             <button data-array-index="${p}" class="removeProjectButton"><i class="far fa-trash-alt"></i></button></div>
						</li>
		            `;
					node.innerHTML = template;
				};
				document.querySelectorAll('.removeProjectButton').forEach(button => button.addEventListener('click', removeProject));
			}	
		}
		render(template, node);
	}
	// render on page load, item save, and item remove 
	function updateDisplay (array, template, node) {
		console.log('array');
		console.log(array);
		// console.log('node');
		// console.log(node);
		// console.log('template');
		// console.log(template);
		function render (template, node) {
			if (!node) {return;}
			if(array.length <= 0) {
				template += '<p class="tasks">There is nothing to display. <span class="showCreateNewTask" style="text-decoration:underline;cursor: pointer;">Create a new task.</span></p>';
				node.innerHTML = template;
			} else { 
				for (let p = 0; p < array.length; p++) {
					template += `
			            <div data-array-index="${p}" class="card">
		                <div class="title"><h2>Title: ${array[p].title}</h2></div>
		                <div class="description">Description: ${array[p].description}</div> 
		                <div class="dueDate">Due Date: ${array[p].dueDate}</div>
		                <div class="priority">Priority: ${array[p].priority}</div>
		                <div class="notes">Notes: ${array[p].notes} </div> 
		                <div class="project">Project: ${array[p].project}</div> 
		                <button data-array-index="${p}" class="editTaskButton"><i class="far fa-edit"></i></button><button data-array-index="${p}" class="removeTaskButton"><i class="far fa-trash-alt"></i></button></div>
						</div>`;
					node.innerHTML = template;
				};
				document.querySelectorAll('.removeTaskButton').forEach(button => button.addEventListener('click', removeTask));
			}	
		 }
		render(template, node);
	}

export {
  	createNewTask,
  	createNewProject,
  	showTodaysTasks,
  	showAllTasksFolder,
  	showAllProjectFolders,
  	displayProjectTasks
}

