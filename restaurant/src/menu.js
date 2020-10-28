let menu = (() => {
	let menuMenu = document.getElementById('menuPageContent');
	let nav = document.createElement('nav');	
	nav.id = 'menu';
	menuMenu.appendChild(nav);
	function menuComponent() {
		let ul = document.createElement('ul');
		let menuItems = ['breakfast', 'lunch', 'dinner', 'apps', 'drinks'];

	for (let i = 0; i < menuItems.length; i++) {
			ul.innerHTML +=`<li id="${i}">${menuItems[i]}</li>`;
		}  
		return ul;
	}
	nav.appendChild(menuComponent());
})();

export default menu