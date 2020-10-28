let setpage = (() => {
	const topBar = document.createElement('div');
	topBar.id = 'set-page';
	topBar.innerHTML = '<ul><li id="homePage">Home</li><li id="menuPage">Menus</li><li id="contactPage">Contact</li></ul>';
	document.body.appendChild(topBar);

	const addHeader = document.createElement('header');
	const pageTitle = document.createElement('header');

	addHeader.innerHTML = '<img src="../images/home.jpg" alt="">'+
	'<div class="site-details"><h1>Rest Cafe</h1><p class="tagline">Serving delicious meals since 2010</p></div>';
	let content = document.getElementById('content');

	document.body.prepend(addHeader);

	let topBarLi = document.querySelectorAll('#set-page li');
	topBarLi.forEach(li => li.addEventListener('click', updatePage));
	content.innerHTML = '<p>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.</p>' +
	'<p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.</p>' +
	'<p>Dandelion\' cucumber earthnut pea peanut soko zucchini. Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.</p>';
	console.log(topBarLi);
	function updatePage() {
		let siteTitle = document.querySelector('header h1');
		let siteTagline = document.querySelector('header .tagline')
		let headerImage = document.querySelector('header img');
		content.innerHTML = '';
		if(this.id == "homePage") {
			siteTitle.textContent = 'Rest Cafe';
			siteTagline.textContent = 'Serving delicious meals since 2010';
			headerImage.src = "../images/home.jpg"
			content.innerHTML = 'This is homepage content';
		} else if(this.id == "menuPage") {
			headerImage.src = "../images/menu.jpg"
			const menuPage = document.createElement('div');
			menuPage.id="menuPageContent";
			menuPage.innerHTML = '';
			content.appendChild(menuPage);
			siteTitle.textContent = 'Menus';
			siteTagline.textContent = 'View our Menus';
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
		}else if(this.id == "contactPage") {
			siteTitle.textContent = 'Contact';
			siteTagline.textContent = 'We appreciate your suggestions';
			headerImage.src = "../images/contact.jpg"
			const contactPage = document.createElement('div');
			contactPage.id="contactPageContent";
			content.appendChild(contactPage);
		} 
	}
})();

export default setpage