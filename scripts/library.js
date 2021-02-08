//variables
let myLibrary = [];
const form = document.getElementById("book-form");
const bookList = document.querySelector("#book-list");

//functions
function Book(title, author, pages, readStatus){ //constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBooks(e){
    e.preventDefault();
    const title = document.getElementById("title").value; //get values
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("read-status").value;
    const newBook = new Book(title, author, pages, status); //create new Books using the constructor
    myLibrary.push(newBook); //add books to array
    displayBooks(myLibrary); // display all books from array
    form.reset(); //reset text fields
}

function displayBooks(myLib){
    newlyAdded = document.createElement("tr");
    myLib.forEach(books =>{ //create a row for every books object
        newlyAdded.innerHTML = `
        <td>${books.title}</td>
        <td>${books.author}</td>
        <td>${books.pages}</td>
        <td><button class="toggle" id="rstatus">${books.readStatus}</button></td>
        <td><button class="delete" id="remove"> Remove </button></td>
        `;
        bookList.appendChild(newlyAdded);
        });

}

function updateBook(e){
    console.log(e.target);
    const item = e.target;
    if(item.classList[0] === "delete"){
        const itemcont = item.parentElement;
        itemcont.parentElement.remove();
    }
    if(item.classList[0] === "toggle"){ //toggle not working atm
        const itemcont2 = item.parentElement;
        if(itemcont2.value = "Read"){
            itemcont2.innerHTML= `<td><button class="toggle" id="rstatus">Unread</button></td>`;
            itemcont2.value = "Unread";
        }
        else if(itemcont2.value = "Unread"){
            itemcont2.innerHTML= `<td><button class="toggle" id="rstatus">Read</button></td>`;
            itemcont2.value = "Read";
        }
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
