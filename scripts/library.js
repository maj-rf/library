/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = title.slice(0, 3).toLowerCase() + pages;
  }
}
// const LOCAL_STORAGE_LIBRARY_KEY = 'myLibrary';
const myLibrary = [];
const defaultBook = new Book('Noli Me Tangere', 'Dr. Jose Rizal', 123, true);
const form = document.getElementById('book-form');
const bookList = document.querySelector('.book-list');

function renderLibrary(currentLibrary) {
  let checker;
  const newDisplay = document.createElement('div');
  newDisplay.classList.add('book');
  currentLibrary.forEach((book) => {
    if (book.readStatus === false) checker = 'unchecked';
    else checker = 'checked';
    newDisplay.setAttribute('id', `${book.id}`);
    newDisplay.innerHTML = `
        <h3>${book.title}</h3>
        <div>by ${book.author}</div>
        <div>${book.pages} pages</div>
        <div>
          <input type="checkbox" name="read-status" class="toggle" ${checker}>
          <label for="read-status">I've Read This?</label>
        </div>
        <button class="delete" id="remove"> X </button>
        `;
    bookList.appendChild(newDisplay);
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

// eslint-disable-next-line consistent-return
function searchBook(myLib, id) {
  for (const book of myLib) {
    if (book.id === id) return myLib.indexOf(book);
  }
}

function updateLibrary(e) {
  const item = e.target;
  if (item.classList[0] === 'delete') {
    myLibrary.splice(searchBook(myLibrary, item.parentElement.id), 1);
    item.parentElement.remove();
  } else if (item.classList[0] === ('toggle')) {
    if (myLibrary[searchBook(myLibrary, item.parentElement.parentElement.id)].readStatus
     === false) {
      myLibrary[searchBook(myLibrary, item.parentElement.parentElement.id)].readStatus = true;
      item.parentElement.parentElement.classList.remove('done');
    } else if (myLibrary[searchBook(myLibrary, item.parentElement.parentElement.id)].readStatus
     === true) {
      myLibrary[searchBook(myLibrary, item.parentElement.parentElement.id)].readStatus = false;
      item.parentElement.parentElement.classList.add('done');
    }
  }
}

function openForm() {
  document.getElementById('addbook').style.display = 'block';
}

function closeForm() {
  document.getElementById('addbook').style.display = 'none';
}

myLibrary.push(defaultBook);
renderLibrary(myLibrary);
form.addEventListener('submit', addBooks);
bookList.addEventListener('click', updateLibrary);
