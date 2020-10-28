let setpage = (() => {
	let content = document.getElementById('content');
	const homePageContent = '<p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.</p>' +
		'<p>Dandelion cucumber earthnut pea peanut soko zucchini. Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.</p>';
		
	let createTopBarMenu = (() => {
		const topBar = document.createElement('div');
		topBar.id = 'set-page';
		topBar.innerHTML = '<ul><li id="homePage" class="">Home</li><li id="menuPage">Menus</li><li id="contactPage">Contact</li></ul>';
		
		document.body.appendChild(topBar);
	})();
	let createHeader = (() => {
		const header = document.createElement('header');
		header.innerHTML = '<img src="../images/home.jpg" alt="">'+
		'<div class="site-details"><h1>Rest Cafe</h1><p class="tagline">Serving delicious meals since 2010</p></div>';
		document.body.prepend(header);
	})();

	let homepageContentDefault = (() => {
		content.innerHTML =  homePageContent;
		return homePageContent;
	})();
	
	let siteTitle = document.querySelector('header h1');
	let siteTagline = document.querySelector('header .tagline')
	let headerImage = document.querySelector('header img');
	
	siteTitle.textContent = 'Rest Cafe';
	siteTagline.textContent = 'Serving delicious meals since 2010';
	headerImage.src = "../images/home.jpg";

	function addClassCurrent () {
		let current = document.querySelectorAll('#set-page > li');
		current.forEach(li =>  li.classList.remove('current'));
		this.classList.add('current');
	}

	function updatePage () {
		content.innerHTML = ''; 
		if(this.id == "homePage") {
			let updateHeader = (() => {
				siteTitle.textContent = 'Rest Cafe';
				siteTagline.textContent = 'Serving delicious meals since 2010';
				headerImage.src = "../images/home.jpg";
			})();
			let updatePageContent = (() => {
				content.innerHTML = homePageContent;
			})();
		} else if(this.id == "menuPage") {
			let updateHeader = (() => {
				headerImage.src = "../images/menu.jpg";
				siteTitle.textContent = 'Menus';
				siteTagline.textContent = 'View our Menus';
			})();
			let updatePageContent = (() => {
				const menuPage = document.createElement('div');
				menuPage.id = "menuPageContent";
				menuPage.innerHTML = '';
				content.appendChild(menuPage);
				let menuMenu = document.getElementById('menuPageContent');
				let nav = document.createElement('nav');	
				nav.id = 'menu';
				menuMenu.appendChild(nav);
				function menuComponents() {
					let ul = document.createElement('ul');
					let menuItems = ['breakfast', 'lunch', 'dinner', 'apps', 'drinks'];

					for (let i = 0; i < menuItems.length; i++) {
						ul.innerHTML +=`<li id="${i}">${menuItems[i]}</li>`;
					}  
					return ul;
				}
				nav.appendChild(menuComponents());
			})();
		} else if(this.id == "contactPage") {
			let updateHeader = (() => {
				siteTitle.textContent = 'Contact';
				siteTagline.textContent = 'We appreciate your suggestions';
				headerImage.src = "../images/contact.jpg";
			})();
			let updatePageContent = (() => {
				const contactPage = document.createElement('div');
				contactPage.id="contactPageContent";
				content.appendChild(contactPage);
			})();
		}
	}

	let topBarLi = document.querySelectorAll('#set-page li');
	topBarLi.forEach(li => li.addEventListener('click', updatePage));
	topBarLi.forEach(li => li.addEventListener('click', addClassCurrent));
})();

export default setpage