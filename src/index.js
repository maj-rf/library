import './styles/style.css';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyAy1TwID5BplRBJAkuOfVccX_mxXd4O_eg',
  authDomain: 'ilib-b98ff.firebaseapp.com',
  databaseURL:
    'https://ilib-b98ff-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ilib-b98ff',
  storageBucket: 'ilib-b98ff.appspot.com',
  messagingSenderId: '1026965389138',
  appId: '1:1026965389138:web:b518124d145f7cf668848b',
  measurementId: 'G-Z3KYF8MBZ8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// AUTH
const logInBtn = document.querySelector('.logInBtn');
const logOutBtn = document.querySelector('.logOutBtn');
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    console.log(user);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

logInBtn.addEventListener('click', (e) => signInWithRedirect(auth, provider));

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = title.slice(0, 3).toLowerCase() + pages;
  }
  updateReadStatus() {
    this.readStatus = !this.readStatus;
  }
}

let myLibrary = [];
const defaultBook = new Book('Noli Me Tangere', 'Dr. Jose Rizal', 123, true);
const form = document.querySelector('.modal');
const bookList = document.querySelector('.book-list');
const open = document.querySelector('.open-button');
const close = document.querySelector('.cancel');

function renderLibrary(currentLibrary) {
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
  // booksCount.textContent = `Books: ${currentLibrary.length}`;
  if (myLibrary.length === 0) {
    const sign = document.createElement('h3');
    bookList.append((sign.textContent = 'No Books to show.'));
  }
}

function addBooks(e) {
  e.preventDefault();
  const successNode = document.querySelector('.success-msg');
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
  successNode.style.display = 'block';
  form.reset();
}

function updateLibrary(e) {
  const parent = e.target.parentNode;
  const elementType = e.target.tagName.toLowerCase();
  if (elementType === 'button') {
    myLibrary = myLibrary.filter((book) => book.id !== e.target.id);
    renderLibrary(myLibrary);
  }
  if (elementType === 'input') {
    for (const book of myLibrary) {
      if (book.id === e.target.id) {
        myLibrary[myLibrary.indexOf(book)].updateReadStatus();
      }
    }
    e.target.checked === true
      ? parent.classList.add('strike')
      : parent.classList.remove('strike');
  }
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
form.addEventListener(
  'click',
  () => (document.querySelector('.success-msg').style.display = 'none')
);
bookList.addEventListener('click', updateLibrary);
open.addEventListener('click', openForm);
close.addEventListener('click', closeForm);
