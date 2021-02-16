//variables
let myLibrary = [];
const form = document.getElementById("book-form");
const bookList = document.querySelector("#book-list");

//functions
class Book {
    constructor(title, author, pages, readStatus){ //constructor
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}


function addBooks(e){
    e.preventDefault();
    const title = document.getElementById("title").value; //get values
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("read-status").value;

    if (title.length === 0 || author.length === 0 || pages.length === 0) {
        alert("Please, fill all the fields");
        return;
    }
    const newBook = new Book(title, author, pages, status); //create new Books using the constructor
    myLibrary.push(newBook); //add books to array
    displayBooks(myLibrary); // display all books from array
    form.reset(); //reset text fields
}

function displayBooks(myLib){
    let newDisplay = document.createElement("tr");
    newDisplay.classList.add("newbook");
    myLib.forEach(books =>{ //create a row for every books object
        newDisplay.innerHTML = `
        <td>${books.title}</td>
        <td>${books.author}</td>
        <td>${books.pages}</td>
        <td><button class="toggle" id="rstatus" value="${books.readStatus}">${books.readStatus}</button></td>
        <td><button class="delete" id="remove"> Remove </button></td>
        `;
        bookList.appendChild(newDisplay);
        });
}

function searchBook(myLib, name){
    console.log(name);
        if (myLib.length === 0 || myLib === null) {
          return;
        }
        else{
        for (book of myLib)
          if (book.title === name) {
            return myLib.indexOf(book);
          }
    }
}

function toggleRead(book){
    if (myLibrary[book].readStatus === "Read") {
        return myLibrary[book].readStatus = "Unread";
      } 
    else return myLibrary[book].readStatus = "Read";
    }

function updateBook(e){
    const item = e.target;
    const currentitem = e.target.parentElement.parentElement.parentElement.childNodes[0];
    let currentitemArr = currentitem.innerText.split("\t");
    let itemcont = item.parentElement;
    if(item.classList[0] === "delete"){
        itemcont.parentElement.remove();
    }

    if(item.classList.contains("toggle")){
        e.target.textContent= `${toggleRead(searchBook(myLibrary, currentitemArr[0]))}`;
    }
}

function openForm() {
    document.getElementById("addbook").style.display = "block";
}
  
function closeForm() {
    document.getElementById("addbook").style.display = "none";
}

//events
form.addEventListener("submit", addBooks);
bookList.addEventListener("click", updateBook);