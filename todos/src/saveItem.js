	// Variables
	const Project = require('./project.js').default; /* get the Item object */
	const Task = require('./task.js').default; /* get the Item object */

    let projectFolder = [];
    let projectTasks = [];
    // let tempProjectFolder = [];
    let taskFolder = [];
    let template = ''; 
    
	// on page load
	const loadContentInStorage = (() => {
		if(localStorage.getItem('projectFolder', projectFolder)) {
	        try {
	            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
	            updateProjectDisplay(projectFolder, template, projectList);
	        } catch(e) {
	            localStorage.removeItem('projectFolder');
	        }
	    } 
	    if(localStorage.getItem('taskFolder', taskFolder)) {
	        try {
	            taskFolder = JSON.parse(localStorage.getItem('taskFolder'));
	            updateDisplay(taskFolder, template, taskList);	
	        } catch(e) {
	            localStorage.removeItem('taskFolder');
	        }
	    } 
	})();    
	// Add event listener to this element
	function delegate(el, evt, sel, handler) {
	    el.addEventListener(evt, function(event) {
	        var t = event.target;
	        while (t && t !== this) {
	            if (t.matches(sel)) {
	                handler.call(t, event);
	            }
	            t = t.parentNode;
	        }
	    });
	}
    // called through functions
 	function saveSavedProjectFolder (projectFolder) {
 		localStorage.setObj('projectFolder', projectFolder);
	}   
	function getSavedProjectFolder (projectFolder) {
		projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
		return projectFolder;
	}
	/* NEW  To save projects => add to project folder, update display, save project folder */ 
    function saveNewProject (project) {
		projectFolder.push(project);
	 	let projectName = projectFolder[projectFolder.length - 1].projectName;
	 	projectTasks  = taskFolder.filter(function (task) {
		  		return (projectName.toLowerCase() == task.project.toLowerCase());
		});
	 	updateDisplay(projectTasks, template, taskList);	 
	 	updateProjectDisplay(projectFolder, template, projectList);	 
	 	updateHeadingTitle(projectName);	
		saveSavedProjectFolder(projectFolder);
	} 
	function updateHeadingTitle (title) {
		document.getElementById('taskTitle').innerHTML = 'All Tasks in ' + title.toUpperCase() + ' Folder';
	}
	// on click
	const createNewProject = (projectName) => {
		let projectId = (projectFolder.length - 1) + 10; 

		// if projectName is not a string create project
		if(typeof projectName === 'object'|| projectName instanceof Object) {
		 	let projectName = document.getElementById("projectName").value;
		 	let projectColor = document.getElementById("projectColor").value;

		 	let project = new Project(projectId, projectName, projectColor);
			saveNewProject(project);
		} else {
			// projectName = projectName;
			let project = new Project(projectId, projectName, projectColor);
			saveNewProject(project);
		}
		document.getElementById('createNewProject').getAttribute('data-form-visible', 'no');
		document.getElementById('taskList').getAttribute('data-visible', 'yes');
	}
	function resetProjectList () {
		return template = '';
	}
	function showAllProjectFolders() {
		resetProjectList();
		updateProjectDisplay(projectFolder, template, projectList);
	}
	function displayProjectTasks (e) {
		resetTaskList();
		getSavedTaskFolder();

		let projectName = e.target.getAttribute('data-project');
		let projectTasks  = taskFolder.filter(function (task) {
		  		return (projectName.toLowerCase() == task.project.toLowerCase());
		});
		document.getElementById('taskTitle').innerHTML = 'Tasks in ' + projectName.toUpperCase() + ' Project Folder';
		updateDisplay(projectTasks, template, taskList);
	}
	function editProject(event, currentProjectTitle) {
		getSavedProjectFolder();
    	let project = [];
    	project = projectFolder.filter(({projectName}) => projectName.includes(currentProjectTitle));
    	if(project == null) {
    		alert('Something went wrong.Please try again.');
    	} else {
    		document.getElementById("projectId").value = project[0].projectId;
			document.getElementById("projectName").value = project[0].projectName;
			document.getElementById("projectColor").value = project[0].projectColor;

		}
		// let originalProjectName = project[0].projectName;
		// console.log(originalProjectName);
		
	}
	
	function updateProject (currentProjectId, currentProjectName, getOriginalProjectName, currentProjectColor) {
		if(currentProjectId == null)  {
			alert('Something went wrong.Please try again.');
		} else {
				console.log(getOriginalProjectName);
				// getSavedProjectFolder();
				let currentProject = projectFolder.filter( item => item['projectId'] == currentProjectId );
				let getProjectToUpdate = currentProject[0];
				let id = currentProjectId;
				let name = currentProjectName;
				let color = currentProjectColor;

				if(currentProjectColor == "undefined") {
					let color = transparent;
				} else{
					color = color;
				}
				getProjectToUpdate.projectId = id;
			    getProjectToUpdate.projectName = name;
			    getProjectToUpdate.projectColor = color;
				// console.log('getProjectToUpdate');
				// console.log(getProjectToUpdate);
				// console.log(getProjectToUpdate.projectName);
				// console.log(projectFolder);
			    saveSavedProjectFolder(projectFolder);
			    updateHeadingTitle(getProjectToUpdate.projectName);

			    let updatedProjectTaskFolder = taskFolder.map(obj =>
				    obj.project == getOriginalProjectName ? { ...obj, project: getProjectToUpdate.projectName } : obj
				);
				let projectTasks = updatedProjectTaskFolder.filter( item => item['project'] == getProjectToUpdate.projectName );

			    console.log(updatedProjectTaskFolder);
			    saveSavedTaskFolder(taskFolder);

			    console.log('did you get this?');
			    console.log(projectFolder);
			    console.log(updatedProjectTaskFolder);
				document.getElementById('saveProject').setAttribute('data-visible', 'yes');
				document.getElementById('saveEditedProject').setAttribute('data-visible', 'no');
				document.getElementById('taskList').setAttribute('data-visible', 'yes');
				document.getElementById('createNewProject').setAttribute('data-form-visible', 'no');
				updateProjectDisplay(projectFolder, template, projectList);
				updateDisplay(projectTasks, template, taskList);
		}
	}
	// remove project on click
	function removeProject(e, currentProjectTitle) {
		console.log(currentProjectTitle)
		const updatedProjectFolder = projectFolder.filter(({projectName}) => !projectName.includes(currentProjectTitle))
		updateProjectDisplay(updatedProjectFolder, template, projectList);
		projectFolder = updatedProjectFolder;
	 	saveSavedProjectFolder(projectFolder);
	}
	// render on page load, item save, and item remove 
	function updateProjectDisplay (array, template, node) {
		function render (template, node) {
			if (!node) {return;}
			if(array.length <= 0) {
				template += 'There is nothing to display.';
				node.innerHTML = template;
			} else { 
				for (let p = 0; p < array.length; p++) {
					template += `
			            <li id="${array[p].projectId}"><span data-project="${array[p].projectName}">${array[p].projectName}</span>
			             <button class="editProjectButton"><i data-edit-title="${array[p].projectName}" class="far fa-edit"></i></button>
			             <button data-array-index="${p}" class="removeProjectButton"><i class="far fa-trash-alt" data-edit-title="${array[p].projectName}"></i></button></div>
						</li>
		            `;
					node.innerHTML = template;
				};
			}	
		}
		render(template, node);
	}
	function saveSavedTaskFolder (taskFolder) {
 		localStorage.setObj('taskFolder', taskFolder);
	}  
	function getSavedTaskFolder(taskFolder) {
		taskFolder = JSON.parse(localStorage.getItem('taskFolder'));
		return taskFolder;
	}
	/* Save a new task --rename from item to task, update project folder to be task folder */ 
	function saveNewTask (task) {
		taskFolder.push(task);
		saveSavedTaskFolder(taskFolder);
		// console.log(taskFolder);
		// tempProjectFolder = [];
	}
	function resetTaskList () {
		return template = '';
	}
	/* Show all Tasks in the tasks folder */ 
	function showAllTasksFolder() {
		resetTaskList();
		document.getElementById('taskTitle').innerHTML = 'All Tasks';
		updateDisplay(taskFolder, template, taskList);
	}
 	const createNewTask = () => {
		let taskId = taskFolder.length + 11;
		let title = document.getElementById("title").value;
	    let description = document.getElementById("description").value;
	    let date = document.getElementById("dueDate").value; /* Format date */
	    let dueDate = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) { 
        return m + '/' + d + '/' + y;});
	    let priority = document.getElementById("priority").value;
	    let notes = document.getElementById("notes").value;
	    let projectName = document.getElementById("project").value;
	    let completionStatus = document.getElementById("completionStatus").value;
	    let task = new Task(taskId, title, description, date, dueDate, priority, notes, projectName, completionStatus);
		
		saveNewTask(task);
	    updateHeadingTitle(projectName);
	    getSavedProjectFolder();
	 	
	 	console.log(projectFolder);
	 	console.log(Object.values(projectFolder).indexOf(projectName) > -1);
	 	let updatedProjectFolder = [];
			updatedProjectFolder = projectFolder.filter( item => item['projectName'] == projectName );
	    // if projectfolder is not empty, loop through the project folder and push item into array
	    // if the array matches project name
	    if (updatedProjectFolder.length === 1 && updatedProjectFolder !== '') {
			   console.log('Do nothing since there is already a projectName = ');
			   console.log(projectName);
		} else {
			console.log('There are more than 0 projects. Creating new folder since there is not a project named = ' + projectName);
			createNewProject(projectName);
		}
    	projectTasks  = taskFolder.filter(function (task) {
	  		return (projectName.toLowerCase() == task.project.toLowerCase());
		});	
		document.getElementById('createNewTask').setAttribute('data-form-visible', 'no');
		document.getElementById('taskList').setAttribute('data-visible', 'yes');

    	updateDisplay(projectTasks, template, taskList);	 		    	
    };
    function updateTask(e, currentTask) {
    	if(currentTask == null) {
    		alert('Something went wrong.Please try again.');
    	} else {
	    	getSavedTaskFolder(taskFolder);
	    	getSavedProjectFolder();
	    	let currentTasks = [];
			currentTasks = taskFolder.filter( item => item['taskId'] == currentTask );
	    	// console.log(currentTasks);
	    	let getTaskToUpdate = currentTasks[0];
			let taskId = currentTask;
	    	let title = document.getElementById("title").value;
		    let description = document.getElementById("description").value;
		    let date = document.getElementById("dueDate").value; /* Format date */
		    let dueDate = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) { 
	        return m + '/' + d + '/' + y;});
		    let priority = document.getElementById("priority").value;
		    let notes = document.getElementById("notes").value;
		    let project = document.getElementById("project").value;
		    let completionStatus = document.getElementById("completionStatus").value;
		    console.log(completionStatus);

		    if(completionStatus === undefined || completionStatus == "undefined" || completionStatus == 'off') {
		    	completionStatus = false;
		    	console.log(completionStatus);
		    } else {
		    	completionStatus = 'checked';
		    }
		    getTaskToUpdate.taskId = taskId;
	    	getTaskToUpdate.title = title;
		    getTaskToUpdate.description = description;
		    getTaskToUpdate.date = date; /* Format date */
		    getTaskToUpdate.dueDate = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) { 
	        return m + '/' + d + '/' + y;});
		    getTaskToUpdate.priority = priority;
		    getTaskToUpdate.notes = notes;
		    getTaskToUpdate.project = project;

		    getTaskToUpdate.completionStatus = completionStatus;

		    saveSavedTaskFolder(taskFolder);
		    updateHeadingTitle(getTaskToUpdate.project);

		    // if projectfolder is not empty, loop through the project folder and push item into array
		    // if the array matches project name
			let updatedProjectFolder = [];
			updatedProjectFolder = projectFolder.filter( item => item['projectName'] == getTaskToUpdate.project );
			 	console.log('has projectFolder '); 
			 	console.log(projectFolder);
			 	console.log('has updatedProjectFolder ');
			  	console.log(updatedProjectFolder);
			  	console.log(updatedProjectFolder.length);
				if (Object.values(projectFolder).indexOf(getTaskToUpdate.projectName) > -1) {
					console.log('this project folder name already exists');
				}
				if(updatedProjectFolder.length == 1 && updatedProjectFolder !== ''){
				   console.log('has projectName ' + getTaskToUpdate.project);
				} else {
				 	console.log('need to create projectName ' + getTaskToUpdate.project);
					createNewProject(getTaskToUpdate.project);
				}
		    							
		    	projectTasks = taskFolder.filter( item => item['project'] == getTaskToUpdate.project );

				document.getElementById('createNewTask').setAttribute('data-form-visible', 'no');
				document.getElementById('taskList').setAttribute('data-visible', 'yes');

		    	updateDisplay(projectTasks, template, taskList);
	  	}
    }
    function editTask(event, currentTaskId) {
    	getSavedTaskFolder(taskFolder);
    	let tasks = [];
    	tasks = taskFolder.filter(({title}) => title.includes(currentTaskId));
    	if(currentTaskId == null) {
    		alert('Something went wrong.Please try again.');
    	} else {
			document.getElementById("id").value = tasks[0].taskId;
			document.getElementById("title").value = tasks[0].title;
		    document.getElementById("description").value = tasks[0].description;
		    document.getElementById("dueDate").value = tasks[0].date;
		    document.getElementById("priority").value  = tasks[0].priority;
		    document.getElementById("notes").value = tasks[0].notes;
		    document.getElementById("project").value  = tasks[0].project;
		    document.getElementById("completionStatus").value  = tasks[0].completionStatus;
	    }
    }
	let showTodaysTasks = (task) => {
		resetTaskList();
		getSavedTaskFolder();
		let todaysTasks = [];
		if(taskFolder !== null) {
	 		todaysTasks  = taskFolder.filter(function (task) {
			  		var date = new Date().toLocaleString().split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("/");
			  		return (date == task.dueDate);
			});
		 } else {
		 	todaysTasks = [];
		 }
		document.getElementById('taskTitle').innerHTML = 'Today\'s Tasks';
		updateDisplay(todaysTasks, template, taskList);
	}
	// on click remove task
	function removeTask(taskName) { 	
		const updatedTaskFolder = taskFolder.filter(({title}) => !title.includes(taskName));
		updateDisplay(updatedTaskFolder, template, taskList);
		taskFolder = updatedTaskFolder;
	 	saveSavedTaskFolder(taskFolder);
	}
	// render on page load, item save, and item remove 
	function updateDisplay (array, template, node) {
		function render (template, node) {
			if (!node) {return;}
			if(array.length <= 0) {
				template += '<p class="tasks">There is nothing to display. <span class="showCreateNewTask" >Create a new task.</span></p>';
				node.innerHTML = template;
			} else { 
				for (let p = 0; p < array.length; p++) {
					template += `
			            <div class="card taskCard" id="${array[p].taskId}" data-title="${array[p].title}">
		                <div class="title"><h2>Title: ${array[p].title}</h2></div>
		                <div class="details" data-visible="no">
		                <div class="description"><strong>Description:</strong> ${array[p].description}</div> 
		                <div class="dueDate"><strong>Due Date:</strong> ${array[p].dueDate}</div>
		                <div class="priority"><strong>Priority:</strong> ${array[p].priority}</div>
		                <div class="notes"><strong>Notes:</strong> ${array[p].notes} </div> 
		                <div class="project"><strong>Project:</strong> <span data-project="${array[p].project}">${array[p].project}</span></div> 
		                 <div class="completionStatus"><strong>Status:</strong><label class="checkbox-container">Completed
                                    <input type="checkbox" name="completionStatus" id="completionStatus" ${array[p].completionStatus}>
                                    <span class="checkmark"></span>
                                	</label></div> 
		                <button class="editTaskButton"><i class="far fa-edit" data-edit="${array[p].title}"></i></button><button class="removeTaskButton"><i class="far fa-trash-alt" data-remove="${array[p].title}"></i></button></div>
						</div></div>`;
					node.innerHTML = template;
				};
			}	
		 }
		render(template, node);
	}

export {
	delegate,
  	createNewTask,
  	showTodaysTasks,
  	showAllTasksFolder,
  	createNewProject,
  	editTask,
  	updateTask,
  	removeTask,
  	displayProjectTasks,
  	showAllProjectFolders,
  	removeProject,
  	editProject,
  	updateProject
}

