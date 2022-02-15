import './styles/style.css';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config';

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

// FIREBASE INIT
initializeApp(getFirebaseConfig());

// INIT SERVICES
const db = getFirestore();
const libraryRef = collection(db, 'library');

// FETCH DATA
let myLibrary = [];

getDocs(libraryRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      myLibrary.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    renderLibrary(myLibrary);
  })
  .catch((err) => {
    console.log(err.message);
  });

const bookConverter = {
  toFirestore: (book) => {
    return {
      title: book.title,
      author: book.author,
      pages: book.pages,
      readStatus: book.readStatus,
      id: book.id,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Book(
      data.title,
      data.author,
      data.pages,
      data.readStatus,
      data.id
    );
  },
};

// CREATE OR DELETE DATA
async function addBookToStore(obj) {
  const docRef = doc(db, 'library', `${obj.id}`).withConverter(bookConverter);
  await setDoc(
    docRef,
    new Book(obj.title, obj.author, obj.pages, obj.readStatus, obj.id)
  );
}

async function deleteBookFromStore(bookID) {
  await deleteDoc(doc(db, 'library', bookID));
}

async function updateBookFromStore(book) {
  console.log(book);
  let status = !book.readStatus;
  const ref = doc(db, 'library', `${book.id}`);
  await updateDoc(ref, { readStatus: status });
}

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
    newBookNode.id = book.id;
    nameNode.classList.add('name');
    pageNode.classList.add('page');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('book-checker');
    nameNode.textContent = `${book.title} by ${book.author}`;
    pageNode.textContent = `${book.pages} pgs`;
    checkbox.checked = book.readStatus;
    checkbox.checked
      ? newBookNode.classList.add('strike')
      : newBookNode.classList.remove('strike');
    deleteNode.textContent = 'X';
    //deleteNode.id = book.id;
    newBookNode.append(checkbox, nameNode, pageNode, deleteNode);
    bookList.append(newBookNode);
  });
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
  addBookToStore(newBook);
  myLibrary.push(newBook);
  renderLibrary(myLibrary);
  successNode.style.display = 'block';
  form.reset();
}

function updateLibrary(e) {
  const parent = e.target.parentNode;
  const elementType = e.target.tagName.toLowerCase();
  if (elementType === 'button') {
    myLibrary = myLibrary.filter((book) => book.id !== parent.id);
    deleteBookFromStore(parent.id);
    renderLibrary(myLibrary);
  }
  if (elementType === 'input') {
    for (const book of myLibrary) {
      if (book.id === parent.id) {
        book.readStatus = !book.readStatus; //updateReadStatus not working hmmmm
        updateBookFromStore(book);
      }
    }
    e.target.checked === true
      ? parent.classList.add('strike')
      : parent.classList.remove('strike');

    console.log(myLibrary);
  }
}

function openForm() {
  document.querySelector('.modal-container').style.display = 'flex';
}

function closeForm() {
  document.querySelector('.modal-container').style.display = 'none';
}

// EVENTS
form.addEventListener('submit', addBooks);
form.addEventListener(
  'click',
  () => (document.querySelector('.success-msg').style.display = 'none')
);
bookList.addEventListener('click', updateLibrary);
open.addEventListener('click', openForm);
close.addEventListener('click', closeForm);
