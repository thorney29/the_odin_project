	const Item = require('./item.js').default; /*Don't delete this*/
    let projectFolder = [];
    let template = "";

    if(localStorage.getItem('projectFolder', projectFolder)) {
        try {
            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
        } catch(e) {
            localStorage.removeItem('projectFolder')
        }
    }

 	let saveSavedProjectFolder = function (projectFolder) {
		localStorage.setObj('projectFolder', projectFolder);
		render(template, projectList);
	}   

	const createNewItem =() => {
		let title = document.getElementById("title").value;
	    let description = document.getElementById("description").value;
	    let dueDate = document.getElementById("dueDate").value;
	    let priority = document.getElementById("priority").value;
	    let notes = document.getElementById("notes").value;
	    let checklist = document.getElementById("checklist").value;
	    let item = new Item(title, description, dueDate, priority, notes, checklist);
		saveNewItem(item);
    };

	function saveNewItem (item) {
		projectFolder.push(item);
	 	projectFolder.reverse();
	 	saveSavedProjectFolder(projectFolder);
	}
 	
	let removeItem = function(e) { 
		let arrayIndex =  e.currentTarget.parentNode.getAttribute('data-array-index');
		projectFolder.splice(arrayIndex, 1);
	 	saveSavedProjectFolder(projectFolder);
	}
	
	function render (template, node) {
		if (!node) {return;}

		if(projectFolder.length <= 0) {
			template += 'There are no "to do" items in your folder.';
			node.innerHTML = template;
		} else {
			for (let p = 0; p < projectFolder.length; p++) {
				template += `
		            <div data-array-index="${p}" class="card">
	                <div class="title"><h2>Title: ${projectFolder[p].title}</h2></div>
	                <div class="description">Description: ${projectFolder[p].description}</div> 
	                <div class="dueDate">Due Date: ${projectFolder[p].dueDate}</div>
	                <div class="priority">Priority: ${projectFolder[p].priority}</div>
	                <div class="notes">Notes: ${projectFolder[p].notes} </div> 
	                <div class="checklist">Your Checklist: ${projectFolder[p].checklist}</div> 
	                <button data-array-index="${p}" class="editButton">Edit</button><button data-array-index="${p}" class="removeButton">Remove</button></div>
					</div>`;
				node.innerHTML = template;
			};
			document.querySelectorAll('.removeButton').forEach(button => button.addEventListener('click', removeItem));
			// return template;
		}	
	}	
 	render(template, projectList);

export {
  	createNewItem,
  	removeItem
}

