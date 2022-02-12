class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = title.slice(0, 3).toLowerCase() + pages;
  }
  updateReadStatus(state) {
    this.readStatus = !state;
  }
}

const myLibrary = [];
const defaultBook = new Book('Noli Me Tangere', 'Dr. Jose Rizal', 123, true);
const form = document.querySelector('.modal');
const bookList = document.querySelector('.book-list');

function renderLibrary(currentLibrary) {
  const newBookNode = document.createElement('div');
  newBookNode.classList.add('book');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  const childNode = document.createElement('p');
  const deleteNode = document.createElement('button');
  currentLibrary.forEach((book) => {
    childNode.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
    checkbox.checked = book.readStatus;
    deleteNode.textContent = 'x';
    deleteNode.id = book.id;
    newBookNode.append(checkbox, childNode, deleteNode);
    bookList.append(newBookNode);
  });
}

function addBooks(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const status = document.getElementById('read-status').checked;

  if (title.length === 0 || author.length === 0 || pages.length === 0) {
    alert('Please, fill all the fields');
    return;
  }
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  renderLibrary(myLibrary);
  form.reset();
}

function searchBook(myLib, id) {
  for (const book of myLib) {
    if (book.id === id) return myLib.indexOf(book);
  }
}

function updateLibrary(e) {
  console.log(e.target.id);
}

function openForm() {
  document.querySelector('.modal-container').style.display = 'flex';
}

function closeForm() {
  document.querySelector('.modal-container').style.display = 'none';
}

myLibrary.push(defaultBook);
renderLibrary(myLibrary);
form.addEventListener('submit', addBooks);
bookList.addEventListener('click', updateLibrary);
