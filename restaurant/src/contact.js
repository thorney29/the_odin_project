let contact = () => {
let currentPage = document.getElementById('contactPageContent');
let div = document.createElement('div');
const message = '<h2>Get in Touch!RIght now</h2>';
const form = '<form action="">' +
		'<input type="text" name="" placeholder="Name">' +
		'<input type="email" placeholder="email">' +
		'<input type="textarea" placeholder="Your message">' +
		'<input type="submit" value="Submit"></form>';
	
currentPage.innerHTML = message + form;
};
export default contact