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
        <td><button class="toggle">${books.readStatus}</button></td>
        <td><button class="delete" id="remove"> Remove </button></td>
        `;
        bookList.appendChild(newDisplay);
        });

}

function updateBook(e){
    const item = e.target;
    let itemcont = item.parentElement;
    if(item.classList[0] === "delete"){
        itemcont.parentElement.remove();
    }
    
    if(item.classList.contains("toggle") &&(itemcont.value = "Unread")){ //toggle not working atm (hint: Book.readStatus unchanged)
        itemcont.innerHTML= `<td><button class="toggle" value="Read">Read</button></td>`;
    }
    if(item.classList.contains("toggle") && (itemcont.value = "Read")){    
        itemcont.innerHTML= `<td><button class="toggle" value="Unread">Unread</button></td>`;
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