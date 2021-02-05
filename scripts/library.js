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

const book1 = new Book("Noli Me Tangere", "Dr. Jose P. Rizal", 300, "Unread");
book1.info();

function addBooks(){

}