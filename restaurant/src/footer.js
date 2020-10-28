let footer = (() => {
	let content = document.querySelector('#content');
	let footer = document.createElement('footer');
	let section1 = '<section class="contact-details">'+
					'<div class="address"><h4>Address:</h4>' +
					'Keas 69 Str.<br/>' +
					'15234, Chalandri<br/>' + 
					'Athens, Greece<br/></div>' +
					'<div class="phone">+30-2106019311 (landline)<br/>'+
					'+30-6977664062 (mobile phone)<br/>' +
					'+30-2106398905 (fax)<br/></div></section>';
	let section2 = '<section class="hours"><h4>Hours:</h4>' +
					'Sunday-Thursday:<br/>' +
					'8am-Noon, 3pm-11pm<br/>' + 
					'Friday-Saturday:<br/>' +
					'8am-Midnight<br/>'
					'Sunday:<br/>'
					'8am-10pm</section>'				
	footer.innerHTML = section1 + section2;
	document.body.appendChild(footer);
})();

export default footer