Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return (this.getItem(key))
}

let loadItems = (() => {
    /* Get from local storage */
    function loadProject () {
        let projectFolder = [];
         if(localStorage.getItem('projectFolder', projectFolder)) {
            try {
                projectFolder = JSON.parse(localStorage.getItem('projectFolder'));
                // console.log("did the get item from loaditems work?");

            } catch(e) {
                localStorage.removeItem('projectFolder')
            }
        } 
        return { projectFolder };
    }
    function loadTask () {
        let taskFolder = [];
        if(localStorage.getItem('taskFolder', taskFolder)) {
                try {
                    taskFolder = JSON.parse(localStorage.getItem('taskFolder'));
                    // console.log("did the get item from loaditems work?");
                } catch(e) {
                    localStorage.removeItem('taskFolder');
                    // console.log("didit not work?");
                }
        } 
        return { taskFolder };
    }
    loadProject();
    loadTask();
    
})();

export default {loadItems};
