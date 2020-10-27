
let myTempLibrary = [{	
	title: "The Hobbit", 
	author: "J.R.R. Tolkien",
	numberofpages: "300",
	readpreference: "",
	readstatus: "checked"
	},
	{
	title: "The Stand", 
	author: "Stephen King",
	numberofpages: "1100",
	readpreference: "",
	readstatus: "checked"
	}];
let myLibrary = myTempLibrary;
console.log(myLibrary);
let book = {};
let title = '';
let author = '';
let bookNumberofPages = 0;
let bookLikeToRead = '';
let bookHaveRead = '';
let template = '';
let arrayIndex = '';

let displayLibrary = document.querySelector('#displayLibrary');
let form = document.querySelector('form');

// Use localStorage.setObj(key, value) to save an array or object and localStorage.getObj(key)
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return (this.getItem(key))
}
if(localStorage.getItem('myLibrary')) {
	try {
		myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
	} catch(e) {
		localStorage.removeItem('myLibrary')
	}
}
console.log(myLibrary);
var render = function (template, node) {
	if (!node) {return;}

	if(myLibrary.length <= 0) {
		template += 'There are no books in your library.';
		node.innerHTML = template;
	} else {
		// if(myTempLibrary) {
		// 	myTempLibrary.forEach((book, index) => {
		// 		myLibrary.push(myTempLibrary[index])
		// 		index++;
		// 	})
		// } 
		let i = 0;
		myLibrary.forEach((book) => {
		    template +=`<div class="card" data-array-index="${i}"><h1 class="title">${book['title']}</h1>` +
					  `<p><em>${book['author']}</em></p><p>Number of pages: <span class="pageNumbers">${book.numberofpages}`+
					  `</span></p><div><input class="liketoread" type="checkbox" ${book.readpreference}><label for="">Would like to read</label></div>`+
					  `<div><input class="haveread" type="checkbox" ${book.readstatus}><label for="">Have read book</label></div>`+
					  `<hr><p><button data-array-index="${i}" class="removeButton">Remove</button></p></div>`;
					  // `<button data-array-index="${i}" class="editButton">Edit</button><button data-array-index="${i}" class="removeButton">Remove</button></div>`;
			node.innerHTML = template;
			let checkboxes = document.querySelectorAll('.card input[type="checkbox"]')
			checkboxes.forEach(checkbox => checkbox.addEventListener('click', editThis));
			let removeButtons = document.querySelectorAll('.removeButton')
			removeButtons.forEach(button => button.addEventListener('click', removeThis));	
			i++;
		});
	}	
}
render(template, displayLibrary);
// Create Book mother object
function Book(title, author, numberofpages, readpreference, readstatus) {
	this.title = title
	this.author = author
	this.numberofpages = numberofpages
	this.readpreference = readpreference
	this.readstatus = readstatus
}
function showAddBook () {
	form.classList.add('show');
}
function createNewBook () {
	title = document.querySelector('#bookTitle').value;
	author = document.querySelector('#bookAuthor').value;
	bookNumberofPages = document.querySelector('#bookNumberofPages').value;
	bookLikeToRead = document.querySelector('#bookLikeToRead').checked;
	if(bookLikeToRead === true) {
		bookLikeToRead = 'checked'
	} else {
		bookLikeToRead = ''
	}
	bookHaveRead = document.querySelector('#bookHaveRead').checked;
	if(bookHaveRead === true) {
		bookHaveRead = 'checked'
	} else {
		bookHaveRead = ''
	}
	book = new Book(title, author, bookNumberofPages, bookLikeToRead, bookHaveRead);
}
function addBookToLibrary(e) {
	e.preventDefault();
	createNewBook();
	myLibrary.push(book);
	myLibrary.reverse();
	saveMyLibrary(); 
    render(template, displayLibrary);
    form.classList.remove('show');
}
function saveMyLibrary () {
	localStorage.setObj('myLibrary', myLibrary);
}
function editThis (e) {
	objectIndex = e.currentTarget.parentNode.parentNode.getAttribute('data-array-index');
	if(e.currentTarget.classList.contains('liketoread')) {
		bookLikeToRead = e.currentTarget;
		console.log('bookLikeToRead = e.currentTarget;')
		console.log(bookLikeToRead.checked)
		if(bookLikeToRead.checked === true) {
			myLibrary[objectIndex].readpreference = 'checked';
		} else {
			myLibrary[objectIndex].readpreference = ''
		}
	}
	if(e.currentTarget.classList.contains('haveread')) {
		haveread = e.currentTarget;
		console.log('haveread = e.currentTarget;')
		console.log(haveread.checked)
		if(haveread.checked === true) {
			console.log(myLibrary[objectIndex].haveread)
			myLibrary[objectIndex].readstatus = 'checked';
		} else {
			myLibrary[objectIndex].readstatus = ''
		}
	}
	saveMyLibrary();
}
function removeThis (e) {
	arrayIndex =  e.currentTarget.parentNode.getAttribute('data-array-index');
	myLibrary.splice(arrayIndex, 1);
	saveMyLibrary();
	render(template, displayLibrary);
}
let openAddNewBook = document.querySelector('#openAddNewBook').addEventListener('click', showAddBook);
let addThisBookToLibrary = document.querySelector('#addNewBook').addEventListener('click', addBookToLibrary);
