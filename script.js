const myLibrary = [];
addBookToLibrary();

// Book constructor.
function Book(author, title, numOfPages, isRead) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}


function addBookToLibrary() {
    // Prompt user for input for each of the book properties.
    const author = prompt("Author: ");
    const title = prompt("Title: ");
    const numOfPages = prompt("Number of Pages: ");
    const isRead = prompt("Have you read this book? ");

    // Create a new book object with user input and add to library array.[]
    const book = new Book(author, title, numOfPages, isRead);
    myLibrary.push(book);
}

