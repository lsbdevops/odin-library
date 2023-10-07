const myLibrary = [];
const bookProperties = ["author", "title", "numOfPages", "isRead"]

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


function createCard() {
    // Create card wrapper element.
    const card = document.createElement("div");
    card.classList.add("card");

    // Create elements for each book property.
    for(const property of bookProperties) {
        const spanEl = document.createElement("span");
        spanEl.setAttribute("data-property", property);

        const divEl = document.createElement("div");
        divEl.classList.add("book-details");
        divEl.textContent = getBookPropertyText(property);

        divEl.appendChild(spanEl);
        card.appendChild(divEl);
    }

    // Add card to the document.
    document.querySelector("body").appendChild(card);
}

function getBookPropertyText(bookProperty) {
    switch(bookProperty) {
        case "author":
            return "Author:";
        case "title":
            return "Title:";
        case "numOfPages":
            return "Number of Pages:"
        case "isRead":
            return "Read Status:"
    }
}
