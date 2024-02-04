class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        // Add book to library, set ID and reference back to the library.
        this.books.push(book);
        book.setID(this.getSize(), this);

        // Create card display on webpage.
        cardController.renderBook(book);
    }

    deleteBook(bookId) {
        // Account for zero array index.
        this.books[bookId - 1] = null;
    }

    getSize() {
        return this.books.length;
    }

    renderLibrary() {
        // Display any current books present in the library array.
        this.books.forEach(book => {
            if (book) {
                domController.renderBook(book);
            }
        });
    }
}

// Book constructor.
class Book {
    constructor(title, author, numOfPages, isRead) {
        // Default value to "Unknown" if no entry provided for title, author or number of pages.
        this.title = title || "Unknown";
        this.author = author || "Unknown";
        this.numOfPages = numOfPages || "Unknown";
        this.isRead = isRead;
    }

    changeReadStatus() {
        this.isRead = !this.isRead;
    }

    setID(id, library) {
        this.id = id;
        this.library = library;
    }
}

const cardController = function() {
    const renderBook = (book) => {
        // Create card wrapper element.
        const card = document.createElement("div");
        card.classList.add("card");

        // Set ID for the card to associate with the library.
        card.setAttribute("data-id", book.id);

        // Add card to the document.
        document.querySelector(".card-wrapper").appendChild(createCardElements(book, card));
    }

    const createCardElements = (book, card) => {
        // Create elements for each book property.
        for (const [property, value] of Object.entries(book)) {
            // Do not print id or library property to card.
            if (property == "id" || property == "library") {
                continue;
            }

            const divEl = document.createElement("div");
            divEl.classList.add("book-details");
            divEl.textContent = bookPropertyText(property);

            // Create a button for read status.
            if (property === "isRead") {
                const readBtn = document.createElement("button");
                readBtn.setAttribute("type", "button");
                if (value) {
                    readBtn.classList.add("read");
                    readBtn.textContent = "Read"
                }
                else {
                    readBtn.textContent = "Not Read"
                }
                readBtn.setAttribute("data-id", book.id);

                // Add event listener to change read status.
                readBtn.addEventListener("click", updateReadStatus(book));
                divEl.appendChild(readBtn);
            }
            else {
                const spanEl = document.createElement("span");
                spanEl.textContent = value;
                divEl.appendChild(spanEl);
            }
            card.appendChild(divEl);
        }

        // Create a delete button and append.
        card.appendChild(createDeleteButton(book));

        return card;
    }

    const updateReadStatus = function(book) {return function(e) {
        // Update book with new read status.
        book.changeReadStatus();

        // Change the button display.
        this.classList.toggle("read");
        this.textContent = book.isRead ? "Read" : "Not Read";
        }
    }
    
    const bookPropertyText = (bookProperty) => {
        switch(bookProperty) {
            case "author":
                return "Author:";
            case "title":
                return "Title:";
            case "numOfPages":
                return "Total Pages:"
        }
    }

    const createDeleteButton = (book) => {
        const delBtn = document.createElement("button");
        delBtn.setAttribute("type", "button");
        delBtn.setAttribute("data-id", book.id)
        delBtn.textContent = "Delete";
        delBtn.classList.add("delete-button");

        // Add delete event listener.
        delBtn.addEventListener("click", () => {
            // Delete card from the webpage.
            const cardToDelete = document.querySelector(`.card[data-id="${book.id}"]`);
            cardToDelete.remove();

            // Remove book from array.
            book.library.deleteBook(book.id);
        })

        return delBtn;
    }
    return {renderBook}
    }()

const formController = function() {
    const addBookForm = () => {
        // Display the add book form.
        const addBookBtn = document.querySelector("#add-book-button");
        const addBookDialog = document.querySelector("#add-book-dialog");
        addBookBtn.addEventListener("click", () => {
            addBookDialog.showModal();
        })

        // Submit user input to create book.
        const dialogConfirmBtn = document.querySelector("#add-book-confirm");
        dialogConfirmBtn.addEventListener("click", (event) => {
            const bookCreated = createBook();
            if(bookCreated) {
                clearAddBookForm();
                event.preventDefault();
            }
        })

        // Close dialog if cancel button is clicked.
        const dialogCancelBtn = document.querySelector("#add-book-cancel");
        dialogCancelBtn.addEventListener("click", (event) => {
            event.preventDefault();
            clearAddBookForm();
            addBookDialog.close();
        })
    }

    const createBook = () => {
        if (!bookValidator().validate()) return false;
        // Get the user input from the form for each of the book properties.
        const titleElement = document.querySelector("#title");
        const title = titleElement.value;
        if (!title) {
            titleElement.classList.add("error");
            return false;
        }
        titleElement.classList.remove("error");

        const author = document.querySelector("#author").value;
        const numOfPages = document.querySelector("#pages").value;
        const isRead = (document.querySelector("input[name='read']:checked").value === "yes") ? true : false;

        const book = new Book(title, author, numOfPages, isRead);
        myLibrary.addBook(book);

        return true;
    }

    const clearAddBookForm = () => {
        document.querySelector("#author").value = "";
        document.querySelector("#title").value = "";
        document.querySelector("#pages").value = "";
        document.querySelector("#read-no").checked = true;
    }

    return {addBookForm}
}()

function bookValidator() {
    const validate = () => {
        return validateTitle() && validateAuthor();
    }

    const validateTitle = () => {
        const titleInput = document.querySelector('#title');

        if (titleInput.validity.valueMissing) {
            titleInput.setCustomValidity('Book title cannot be blank.');
            return false;
        }

        titleInput.setCustomValidity('');
        return true;
    }

    const validateAuthor = () => {
        const authorInput = document.querySelector('#author');
        console.log(authorInput)

        if (authorInput.validity.valueMissing) {
            authorInput.setCustomValidity('Book author cannot be blank.');
            return false;
        }
        if (authorInput.validity.patternMismatch) {
            authorInput.setCustomValidity('Book author must be letters only.');
            return false;
        }

        authorInput.setCustomValidity('');
        return true;
    }
        
    return {validate}
}

const myLibrary = new Library();
formController.addBookForm();