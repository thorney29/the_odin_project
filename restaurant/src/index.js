import setpage from './setpage';
import restaurantmenucontent from './restaurantmenucontent';
import contact from './contact';
import footer from './footer';


// let setPageLi = document.querySelectorAll('#set-page>li')
// setPageLi.forEach(li => li.addEventListener('click', addClassCurrent));

document.getElementById('menuPage').addEventListener('click', restaurantmenucontent);
document.getElementById('contactPage').addEventListener('click', contact);
	