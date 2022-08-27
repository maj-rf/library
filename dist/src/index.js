import './styles/style.css';
var Book = /** @class */ (function () {
    function Book(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        this.id = title.slice(0, 3).toLowerCase() + pages;
    }
    return Book;
}());
Book.prototype.updateReadStatus = function () {
    //not working
    return (this.readStatus = !this.readStatus);
};
var myLibrary = JSON.parse(localStorage.getItem('library')) || [];
//const defaultBook = new Book('Noli Me Tangere', 'Dr. Jose Rizal', 123, true);
var form = document.querySelector('.modal');
var bookList = document.querySelector('.book-list');
var booksCount = document.querySelector('.count');
var open = document.querySelector('.open-button');
var close = document.querySelector('.cancel');
function renderLibrary(currentLibrary) {
    localStorage.setItem('library', JSON.stringify(currentLibrary));
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
    currentLibrary.forEach(function (book) {
        var newBookNode = document.createElement('div');
        var checkbox = document.createElement('input');
        var nameNode = document.createElement('p');
        var pageNode = document.createElement('p');
        var deleteNode = document.createElement('button');
        newBookNode.classList.add('book');
        nameNode.classList.add('name');
        pageNode.classList.add('page');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('book-checker');
        checkbox.setAttribute('id', book.id);
        nameNode.textContent = "".concat(book.title, " by ").concat(book.author);
        pageNode.textContent = "".concat(book.pages, " pgs");
        checkbox.checked = book.readStatus;
        checkbox.checked
            ? newBookNode.classList.add('strike')
            : newBookNode.classList.remove('strike');
        deleteNode.textContent = 'X';
        deleteNode.id = book.id;
        newBookNode.append(checkbox, nameNode, pageNode, deleteNode);
        bookList.append(newBookNode);
    });
    booksCount.textContent = "Books: ".concat(currentLibrary.length);
    if (myLibrary.length === 0) {
        var sign = document.createElement('h3');
        bookList.append((sign.textContent = 'No Books to show.'));
    }
}
function addBooks(e) {
    e.preventDefault();
    var successNode = document.querySelector('.success-msg');
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;
    var status = document.getElementById('read-status')
        .checked;
    if (title.length === 0 || author.length === 0 || pages.length === 0) {
        alert('Please, fill all the fields');
        return;
    }
    var newBook = new Book(title, author, parseInt(pages), status);
    myLibrary.push(newBook);
    renderLibrary(myLibrary);
    successNode.style.display = 'block';
    form.reset();
}
function updateLibrary(e) {
    var parent = e.target.parentNode;
    var elementType = e.target.tagName.toLowerCase();
    if (elementType === 'button') {
        myLibrary = myLibrary.filter(function (book) { return book.id !== e.target.id; });
        renderLibrary(myLibrary);
    }
    if (elementType === 'input') {
        for (var _i = 0, myLibrary_1 = myLibrary; _i < myLibrary_1.length; _i++) {
            var book = myLibrary_1[_i];
            if (book.id === e.target.id) {
                book.readStatus = !book.readStatus;
                localStorage.setItem('library', JSON.stringify(myLibrary));
            }
        }
        e.target.checked === true
            ? parent.classList.add('strike')
            : parent.classList.remove('strike');
    }
}
function openForm() {
    document.querySelector('.modal-container').style.display =
        'flex';
}
function closeForm() {
    document.querySelector('.modal-container').style.display =
        'none';
}
renderLibrary(myLibrary); //init
form.addEventListener('submit', addBooks);
form.addEventListener('click', function () {
    return (document.querySelector('.success-msg').style.display =
        'none');
});
bookList.addEventListener('click', updateLibrary);
open.addEventListener('click', openForm);
close.addEventListener('click', closeForm);
