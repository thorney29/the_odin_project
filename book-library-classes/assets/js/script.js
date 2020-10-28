
let displayLibrary = document.querySelector('#displayLibrary');
let form = document.querySelector('form');

// Create Book mother object
class Book {
	constructor(booktitle, author, numberofpages, readpreference, readstatus) {
		this.booktitle = booktitle;
		this.author = author;
		this.numberofpages = numberofpages;
		this.readpreference = readpreference;
		this.readstatus = readstatus;
	}

}
/* What are the things that we could create using classes? A library, a Book, with functions:  */ 
function showAddBook() {
	 form.classList.add('show');
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


function createNewBook() {
	booktitle = document.querySelector('#bookTitle').value;
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
	book = new Book(booktitle, author, bookNumberofPages, bookLikeToRead, bookHaveRead);
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
	console.log(myLibrary)
	myLibrary.splice(arrayIndex, 1);
	saveMyLibrary();
	render(template, displayLibrary);
}

const book1 = new Book("The Hobbit","J.R.R. Tolkien",300,"","checked");
const book2 = new Book( "The Stand","Stephen King",1000,"","checked");
let myTempLibrary = [book1, book2];
let myLibrary = myTempLibrary;
// let book = {};
// let title = '';
// let author = '';
// let bookNumberofPages = 0;
// let bookLikeToRead = '';
// let bookHaveRead = '';

let template = '';
let arrayIndex = '';


// Use localStorage.setObj(key, value) to save an array or object and localStorage.getObj(key)
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return (this.getItem(key))
}

if(localStorage.getItem('myLibrary', myLibrary)) {
	try {
		myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
	} catch(e) {
		localStorage.removeItem('myLibrary')
	}
}

function saveMyLibrary () {
	localStorage.setObj('myLibrary', myLibrary);
}

var render = function (template, node) {
	if (!node) {return;}

	if(myLibrary.length <= 0) {
		template += 'There are no books in your library.';
		node.innerHTML = template;
	} else {
		for (let p = 0; p < myLibrary.length; p++) {
			template +=`<div class="card" data-array-index="${p}"><h1 class="title">${myLibrary[p].booktitle}</h1>` +
					  `<p><em>${myLibrary[p].author}</em></p><p>Number of pages: <span class="pageNumbers">${myLibrary[p].numberofpages}`+
					  `</span></p><div><input class="liketoread" type="checkbox" ${myLibrary[p].readpreference}><label for="">Would like to read</label></div>`+
					  `<div><input class="haveread" type="checkbox" ${myLibrary[p].readstatus}><label for="">Have read book</label></div>`+
					  `<hr><p><button data-array-index="${p}" class="removeButton">Remove</button></p></div>`;
					  `<button data-array-index="${p}" class="editButton">Edit</button><button data-array-index="${p}" class="removeButton">Remove</button></div>`;
			node.innerHTML = template;
			let checkboxes = document.querySelectorAll('.card input[type="checkbox"]')
			checkboxes.forEach(checkbox => checkbox.addEventListener('click', editThis));
			let removeButtons = document.querySelectorAll('.removeButton')
			removeButtons.forEach(button => button.addEventListener('click', removeThis));	
		};
	}	
}
render(template, displayLibrary);

let openAddNewBook = document.querySelector('#openAddNewBook').addEventListener('click', showAddBook);
let addThisBookToLibrary = document.querySelector('#addNewBook').addEventListener('click', addBookToLibrary);
