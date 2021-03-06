let restaurantmenucontent = () => {
	let content = document.querySelector('#content');
	let headerImage = document.querySelector('header img');
	let breakfast = '<div id="restaurantmenu" class=""><h4>Breakfast</h4><p>Eggs $8</p><p>Bacon $10</p><p>Pancakes $11</p><p>Hash Browns $4</p><p>Omelette $10</p><p>Tofu Scramble $9</p></div>';
	let lunch = '<div id="tab-2-content" class=""><h4>Lunch</h4><p>Turkey Club Sandwich $11</p><p>Bacon Lettuce Tomato $10</p><p>Tuna Salad Sandwich $9</p><p>Cheeseburger and Fries $14</p><p>Pasta of the Day $10</p><p>Caprese Salad $9</p></div>';
	let dinner ='<div id="tab-3-content" class=""><h4>Dinner</h4><p>Turkey Dinner for the Family $61</p><p>Bacon Rigatone $20</p><p>Seared Tuna $29</p><p>Roast Beef $41</p><p>Pasta of the Day $21</p><p>Chicken $19</p></div>';
	let apps = '<div id="tab-4-content" class=""><h4>Apps</h4><p>Bacon & Cheese Tatortots $12</p><p>Tuna Takaki $19</p><p>Roasted Brusselsprouts $12</p><p>Mozzerella Sticks $11</p><p>Chicken Fingers $9</p></div>';
	let drinks = '<div id="tab-5-content" class=""><h4>Drinks</h4><p>Soda $2</p><p>Beer $9</p><p>Wine (Red/White) $12</p><p>Juice $6</p><p>Sparkling Water $5</p></div>';
	let menuOption = [breakfast,lunch, dinner, apps,drinks];
	
	let createFoodMenu = (() => {
		let div = document.createElement('div');
		div.innerHTML = breakfast;
		content.appendChild(div);
	})();

	function updateContent() {
		let div = document.querySelector('#restaurantmenu');
		let current = document.querySelectorAll('#menu li');
		current.forEach(li => li.classList.remove('current'));
		this.classList.add('current');
		let classString = this.textContent;
		let whatIsId = this.id;
	 	div.innerHTML = menuOption[whatIsId];
		headerImage.src = "../images/" + classString + ".jpg"
		let siteTitle = document.querySelector('header h1');
		let siteTagline = document.querySelector('header .tagline');
		siteTitle.textContent = classString;
		siteTagline.textContent = 'View our Menus';
	}
 	let menuLi = document.querySelectorAll('#menu li');
	menuLi.forEach(menu => menu.addEventListener('click', updateContent));
};
export default restaurantmenucontent