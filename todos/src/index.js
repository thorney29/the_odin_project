import loadItems from './loadItems';
import {showAllItemsFolder, createNewItem, removeItem, showTodaysTasks } from './saveItem'


document.getElementById('viewAllProjectFolders').addEventListener('click', showAllItemsFolder);
document.getElementById('showCreateNewTask').addEventListener('click', function() {
    document.getElementById('createToDoItem').classList.toggle('display');
    document.getElementById('projectList').classList.toggle('hide');
})
document.getElementById('viewTodayProjectFolder').addEventListener('click', showTodaysTasks);


document.getElementById('saveItem').addEventListener('click', createNewItem)
document.getElementById('saveItem').addEventListener('click', function (){
    document.getElementById('createToDoItem').classList.remove('display');
    document.getElementById('projectList').classList.toggle('hide');
});
document.querySelectorAll('.removeButton').forEach(button => button.addEventListener('click', removeItem));