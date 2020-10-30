import loadItems from './loadItems';
import {createNewItem, removeItem } from './saveItem'


 
document.getElementById('saveItem').addEventListener('click', createNewItem);
document.querySelectorAll('.removeButton').forEach(button => button.addEventListener('click', removeItem));