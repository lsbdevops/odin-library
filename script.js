const myLibrary = [];

const addBookBtn = document.querySelector("#add-book-button");
const addBookDialog = document.querySelector("#add-book-dialog");
const dialogConfirmBtn = document.querySelector("#add-book-confirm");

addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
})

dialogConfirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const book = addBookToLibrary();
    if(book) {
        createCard(book);
        clearAddBookForm();
    }
})

// Book constructor.
function Book(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}


function addBookToLibrary() {
    // Get the user input from the form for each of the book properties.
    const titleElement = document.querySelector("#title");
    const title = titleElement.value;
    if (!title) {
        titleElement.classList.add("error");
        return false;
    }
    titleElement.classList.remove("error");

    let author = document.querySelector("#author").value;
    if (!author) {
        author = "Unknown";
    }

    let numOfPages = document.querySelector("#pages").value;
    if (!numOfPages) {
        numOfPages = "Unknown";
    }

    const isRead = document.querySelector("input[name='read']:checked").value;

    // Create a new book object with user input and add to library array.
    const book = new Book(title, author, numOfPages, isRead);
    myLibrary.push(book);

    return book;
}


function createCard(book) {
    // Create card wrapper element.
    const card = document.createElement("div");
    card.classList.add("card");

    // Create elements for each book property.
    for(const [property, value] of Object.entries(book)) {
        const spanEl = document.createElement("span");
        // Set data attribute and text for the current property of the book.
        spanEl.setAttribute("data-property", property);
        spanEl.textContent = value;

        const divEl = document.createElement("div");
        divEl.classList.add("book-details");
        divEl.textContent = getBookPropertyText(property);

        divEl.appendChild(spanEl);
        card.appendChild(divEl);
    }

    // Add card to the document.
    document.querySelector(".card-wrapper").appendChild(card);
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


function displayLibrary(library) {
    // Display any current books already present in the library array.
    library.forEach(book => {
        createCard(book);
    });
}


function clearAddBookForm() {
    document.querySelector("#author").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#read-no").checked = true;
}