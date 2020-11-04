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
})();

export default loadItems;
