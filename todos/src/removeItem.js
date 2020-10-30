import {saveSavedProjectFolder} from './saveItem';

 import {render} from './renderItems';




let projectFolder = [];
	 if(localStorage.getItem('projectFolder', projectFolder)) {
    try {
        projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
    } catch(e) {
        localStorage.removeItem('projectFolder')
    }
}





function removeItem (e) { 
console.log(template)
	console.log(projectFolder);
	let arrayIndex =  e.currentTarget.parentNode.getAttribute('data-array-index');
	// console.log('arrayindex');
	console.log(arrayIndex);
	
	projectFolder.splice(arrayIndex, 1);
	console.log(projectFolder)
render(template, projectList);
	// saveSavedProjectFolder();	
}


export default removeItem;