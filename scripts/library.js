//variables
let myLibrary = [];
const form = document.getElementById("book-form");


//functions
function Book(title, author, pages, readStatus){ //constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBooks(book){
    myLibrary.push(book);
}

function displayBooks(myLib){
    const bookList = document.querySelector("#book-list");
    newlyAdded = document.createElement("tr");
    myLib.forEach(books =>{ //create a row for every books object
        newlyAdded.innerHTML = `
        <td>${books.title}</td>
        <td>${books.author}</td>
        <td>${books.pages}</td>
        <td>${books.readStatus}</td>
        <td><button class="delete" id="remove"> Remove </button></td>
        `;
        bookList.appendChild(newlyAdded);
        // const remove = document.querySelector("#remove");
        // remove.addEventListener(function(){
        //}
        });

}

function openForm() {
    document.getElementById("addbook").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("addbook").style.display = "none";
  }


//events
form.addEventListener("submit", function(e){
    e.preventDefault();
    const title = document.getElementById("title").value; //get values
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("read-status").value;

    const newBook = new Book(title, author, pages, status); //create new Books using the constructor
    addBooks(newBook); //add Books to Library
    displayBooks(myLibrary); // display all books from Library

    form.reset(); //reset text fields
});



