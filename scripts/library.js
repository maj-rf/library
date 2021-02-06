let myLibrary = [];

function Book(title, author, pages, readStatus){ //constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.info = function(){
    //display.appendChild(newlyAdded);
    return `${this.title} by ${this.author}, ${this.pages}, ${this.readStatus}`;
}

function addBooks(e){
    e.preventDefault();
    newlyAdded = document.createElement("p");
    const newBook = new Book(inputs.item(0).value, inputs.item(1).value, inputs.item(2).value, inputs.item(3).value);
    myLibrary.push(newBook);
    newlyAdded.textContent = newBook.info();
    display.appendChild(newlyAdded);
    form.reset();
}

//const book1 = new Book("Noli Me Tangere", "Dr. Jose P. Rizal", 300, "Unread");
const form = document.forms[0];
const inputs = form.querySelectorAll("input");
const display = document.querySelector(".display");

form.addEventListener("submit", addBooks);

