import './styles/style.css';

interface BookType {
  title: string;
  author: string;
  pages: number;
  readStatus: boolean;
  id: string;
  updateReadStatus: () => boolean;
}

class Book {
  title: string;
  author: string;
  pages: number;
  readStatus: boolean;
  id: string;
  updateReadStatus: () => boolean;

  constructor(
    title: string,
    author: string,
    pages: number,
    readStatus: boolean
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = title.slice(0, 3).toLowerCase() + pages;
  }
}

Book.prototype.updateReadStatus = function () {
  //not working
  return (this.readStatus = !this.readStatus);
};

let myLibrary: BookType[] = JSON.parse(localStorage.getItem('library')) || [];
//const defaultBook = new Book('Noli Me Tangere', 'Dr. Jose Rizal', 123, true);
const form = document.querySelector('.modal') as HTMLFormElement;
const bookList = document.querySelector('.book-list');
const booksCount = document.querySelector('.count');
const open = document.querySelector('.open-button');
const close = document.querySelector('.cancel');

function renderLibrary(currentLibrary: BookType[]) {
  localStorage.setItem('library', JSON.stringify(currentLibrary));
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
  currentLibrary.forEach((book) => {
    const newBookNode = document.createElement('div');
    const checkbox = document.createElement('input');
    const nameNode = document.createElement('p');
    const pageNode = document.createElement('p');
    const deleteNode = document.createElement('button');
    newBookNode.classList.add('book');
    nameNode.classList.add('name');
    pageNode.classList.add('page');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('book-checker');
    checkbox.setAttribute('id', book.id);
    nameNode.textContent = `${book.title} by ${book.author}`;
    pageNode.textContent = `${book.pages} pgs`;
    checkbox.checked = book.readStatus;
    checkbox.checked
      ? newBookNode.classList.add('strike')
      : newBookNode.classList.remove('strike');
    deleteNode.textContent = 'X';
    deleteNode.id = book.id;
    newBookNode.append(checkbox, nameNode, pageNode, deleteNode);
    bookList.append(newBookNode);
  });
  booksCount.textContent = `Books: ${currentLibrary.length}`;
  if (myLibrary.length === 0) {
    const sign = document.createElement('h3');
    bookList.append((sign.textContent = 'No Books to show.'));
  }
}

function addBooks(e: any) {
  e.preventDefault();
  const successNode = document.querySelector('.success-msg') as HTMLElement;
  const title = (document.getElementById('title') as HTMLInputElement).value;
  const author = (document.getElementById('author') as HTMLInputElement).value;
  const pages = (document.getElementById('pages') as HTMLInputElement).value;
  const status = (document.getElementById('read-status') as HTMLInputElement)
    .checked;

  if (title.length === 0 || author.length === 0 || pages.length === 0) {
    alert('Please, fill all the fields');
    return;
  }
  const newBook: BookType = new Book(title, author, parseInt(pages), status);
  myLibrary.push(newBook);
  renderLibrary(myLibrary);
  successNode.style.display = 'block';
  form.reset();
}

function updateLibrary(e: any) {
  const parent = e.target.parentNode;
  const elementType = e.target.tagName.toLowerCase();
  if (elementType === 'button') {
    myLibrary = myLibrary.filter((book) => book.id !== e.target.id);
    renderLibrary(myLibrary);
  }
  if (elementType === 'input') {
    for (let book of myLibrary) {
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
  (document.querySelector('.modal-container') as HTMLElement).style.display =
    'flex';
}

function closeForm() {
  (document.querySelector('.modal-container') as HTMLElement).style.display =
    'none';
}

renderLibrary(myLibrary); //init

form.addEventListener('submit', addBooks);
form.addEventListener(
  'click',
  () =>
    ((document.querySelector('.success-msg') as HTMLElement).style.display =
      'none')
);
bookList.addEventListener('click', updateLibrary);
open.addEventListener('click', openForm);
close.addEventListener('click', closeForm);
