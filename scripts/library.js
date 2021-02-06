let myLibrary = [];

function Book(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function() {
        return console.log(`${title} by ${author}, ${pages}, ${readStatus}`);
    }
}

function addBooks(e){
    const bookNum = new Book(e.elements[0].value,e.elements[1].value, e.elements[2].value, e.elements[3].value);
    bookNum.info();
    e.preventDefault();
}

const book1 = new Book("Noli Me Tangere", "Dr. Jose P. Rizal", 300, "Unread");
const form = document.getElementById("book-form");
// const display =  document.querySelector(".display");
// const titleN = document.getElementById("#title");
// const authorN = document.getElementById("#author");
// const pagesN = document.getElementById("#pages");
// const readStatus = document.getElementById("#read-status");

form.addEventListener("submit", addBooks);
//book1.info();

