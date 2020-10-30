   // import {render} from './renderItems';

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return (this.getItem(key))
}

let loadItems = (() => {
    /* Get from local storage */
    let savedProjectFolder = [];
    let projectFolder = [];

    if(localStorage.getItem('projectFolder', projectFolder)) {
        try {
            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
        } catch(e) {
            localStorage.removeItem('projectFolder')
        }
    }
    savedProjectFolder = projectFolder;
    // let template = ''; 
    // let projectList = document.getElementById("projectList");
    // let render = function (template, node) {
    //     if (!node) {return;}

    //     if(savedProjectFolder.length <= 0) {
    //         template += 'There are no to do items in your folder.';
    //         node.innerHTML = template;
    //     } else {
    //         for (let p = 0; p < savedProjectFolder.length; p++) {
    //             template += `
    //             <div class="card" data-array-index="${p}">
    //             <div class="title"><h2>Title: ${savedProjectFolder[p].title}</h2></div>
    //             <div class="description">Description: ${savedProjectFolder[p].description}</div> 
    //             <div class="dueDate">Due Date: ${savedProjectFolder[p].dueDate}</div>
    //             <div class="priority">Priority: ${savedProjectFolder[p].priority}</div>
    //             <div class="notes">Notes: ${savedProjectFolder[p].notes} </div> 
    //             <div class="checklist">Your Checklist: ${savedProjectFolder[p].checklist}</div> 
    //             <button data-array-index="${p}" class="editButton">Edit</button><button data-array-index="${p}" class="removeButton">Remove</button></div>
    //             </div>`;
    //             node.innerHTML = template;
    //         };
    //     }   
    // }
    // render(template, projectList);
    // return {savedProjectFolder, template};
})();

export default loadItems;
