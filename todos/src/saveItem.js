	// Variables
	const Item = require('./item.js').default; /* get the Item object */
    let projectFolder = [];
    let template = 'There is nothing to display.';
    
    let displayTitle = document.createElement('div');
    displayTitle.classList.add('title');
    let displayDescription = document.createElement('div');
    displayDescription.classList.add('description');
    let displayDueDate = document.createElement('div');
    displayDueDate.classList.add('dueDate');
    let diplayPriority = document.createElement('div');
    diplayPriority.classList.add('priority');
    let displayNotes = document.createElement('div');
    displayNotes.classList.add('notes');
    let displayChecklist = document.createElement('div');
    displayChecklist.classList.add('checklist');
    
    let displayEditButton = document.createElement('button');
    displayEditButton.classList.add('editbButton');

    let displayRemoveButton = document.createElement('div');
    displayRemoveButton.classList.add('removeButton');
	displayRemoveButton.addEventListener('click', removeItem);


	if(localStorage.getItem('projectFolder', projectFolder)) {
        try {
            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
        } catch(e) {
            localStorage.removeItem('projectFolder')
        }
    }

    function saveToLocalStorage () {
	    if(localStorage.getItem('projectFolder', projectFolder)) {
	        try {
	            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
	        } catch(e) {
	            localStorage.removeItem('projectFolder')
	        }
	    }
	}

    // called through functions
 	function saveSavedProjectFolder (projectFolder) {
 		saveToLocalStorage();
		localStorage.setObj('projectFolder', projectFolder);
	}   
                                                                               
	function saveNewItem (item) {
		projectFolder.push(item);
	 	projectFolder.reverse();
	 	updateDisplay(projectFolder,template,projectList);	 	
		saveSavedProjectFolder(projectFolder);

	}
	function resetProjectList () {
		return template = '';
	}

	function showAllItemsFolder() {
		resetProjectList();
		updateDisplay(projectFolder,template,projectList);
	}

	// on click
	const createNewItem =() => {
		let title = document.getElementById("title").value;
	    let description = document.getElementById("description").value;
	    let date = document.getElementById("dueDate").value;
	    let dueDate = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) { 
        return m + '/' + d + '/' + y;      });
	    // conso
	    let priority = document.getElementById("priority").value;
	    let notes = document.getElementById("notes").value;
	    let checklist = document.getElementById("checklist").value;
	    let item = new Item(title, description, dueDate, priority, notes, checklist);
		saveNewItem(item);
		document.getElementById('createToDoItem').classList.remove('display');
    };

 	// on click
	function removeItem(e) { 
		let arrayIndex =  e.currentTarget.parentNode.getAttribute('data-array-index');
		projectFolder.splice(arrayIndex, 1);
		updateDisplay(projectFolder,template,projectList);
	 	saveSavedProjectFolder(projectFolder);
	}

	let showTodaysTasks = (item) => {
		resetProjectList();
		console.log('projectFolder');
		console.log(projectFolder);
		console.log(projectFolder.length);
		let todaysTasks  = projectFolder.filter(function (item) {
		  		var date = new Date().toLocaleString().split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("/");
		  		console.log(date);
		  		console.log(item.dueDate);
		  		return (date == item.dueDate);
		});
		updateDisplay(todaysTasks,template,projectList);
	}

	// render on page load, item save, and item remove 
	function updateDisplay (array, template, node) {
		console.log('array');
		console.log(array);
		console.log('node');
		console.log(node);
		console.log('template');
		console.log(template);
		function render (template, node) {
			if (!node) {return;}
			if(array.length <= 0) {
				template += 'There is nothing to display.';
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
			                <div class="checklist">Your Checklist: ${array[p].checklist}</div> 
			                <button data-array-index="${p}" class="editButton">Edit</button><button data-array-index="${p}" class="removeButton">Remove</button></div>
							</div>`;
						node.innerHTML = template;
					};
					document.querySelectorAll('.removeButton').forEach(button => button.addEventListener('click', removeItem));
			}	
		 }
		render(template, node);
	}
	// function render (template, node) {
	// 	if (!node) {return;}

	// 	if(projectFolder.length <= 0) {
	// 		template += 'There are no "to do" items in your folder.';
	// 		node.innerHTML = template;
	// 	} else {
	// 		resetProjectList();
	// 		for (let p = 0; p < projectFolder.length; p++) {
	// 			template += `
	// 	            <div data-array-index="${p}" class="card">
	//                 <div class="title"><h2>Title: ${projectFolder[p].title}</h2></div>
	//                 <div class="description">Description: ${projectFolder[p].description}</div> 
	//                 <div class="dueDate">Due Date: ${projectFolder[p].dueDate}</div>
	//                 <div class="priority">Priority: ${projectFolder[p].priority}</div>
	//                 <div class="notes">Notes: ${projectFolder[p].notes} </div> 
	//                 <div class="checklist">Your Checklist: ${projectFolder[p].checklist}</div> 
	//                 <button data-array-index="${p}" class="editButton">Edit</button><button data-array-index="${p}" class="removeButton">Remove</button></div>
	// 				</div>`;
	// 			node.innerHTML = template;
	// 		};
	// 		document.querySelectorAll('.removeButton').forEach(button => button.addEventListener('click', removeItem));
	// 	}	
	// }	
 // 	render(template, projectList);

export {
  	createNewItem,
  	removeItem,
  	showTodaysTasks,
  	showAllItemsFolder
}

