import './styles/style.css';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
initFirebaseAuth();

const picElement = document.querySelector('.profile-pic');

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

function signOutUser() {
  // Sign out of Firebase.
  signOut(auth);
}

function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(auth, authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return auth.currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return auth.currentUser.displayName;
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();
    picElement.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    logIn.classList.add('hidden');
    logOut.classList.remove('hidden');
    picElement.classList.remove('hidden');
  } else {
    logIn.classList.remove('hidden');
    logOut.classList.add('hidden');
    picElement.classList.add('hidden');
  }
}

const logIn = document.querySelector('.logInBtn');
const logOut = document.querySelector('.logOutBtn');
logIn.addEventListener('click', signIn);
logOut.addEventListener('click', signOutUser);

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
