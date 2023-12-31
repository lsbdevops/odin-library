const myLibrary = [];

const addBookBtn = document.querySelector("#add-book-button");
const addBookDialog = document.querySelector("#add-book-dialog");
const dialogConfirmBtn = document.querySelector("#add-book-confirm");

// Open add a book form.
addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
})

// Create a book.
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
    card.setAttribute("data-id", myLibrary.length)
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

        // Create a button for read status.
        if (property === "isRead") {
            const readBtn = document.createElement("button");
            readBtn.setAttribute("type", "button");
            if (value === "Read") {
                readBtn.classList.add("read");
            }
            readBtn.setAttribute("data-id", myLibrary.length)

            // Add event listen to change read status.
            readBtn.addEventListener("click", () => {
                // Update array with new read status.
                const bookArrayIndex = parseInt(readBtn.dataset.id) - 1;
                myLibrary[bookArrayIndex].isRead = getChangedReadStatus(readBtn)

                // Change the button display.
                readBtn.classList.toggle("read");
                readBtn.textContent = getChangedReadStatus(readBtn)
            })

            readBtn.appendChild(spanEl);
            divEl.appendChild(readBtn);
        }
        else {
            divEl.appendChild(spanEl);
        }

        card.appendChild(divEl);
    }

    // Create a delete button.
    const delBtn = document.createElement("button");
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("data-id", myLibrary.length)
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-button");

    // Add delete event listener.
    delBtn.addEventListener("click", () => {
        deleteCard(delBtn) 
    })

    // Append button to card.
    card.appendChild(delBtn);

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
            return "Total Pages:"
    }
}


function displayLibrary(library) {
    // Display any current books present in the library array.
    library.forEach(book => {
        if (book) {
            createCard(book);
        }
    });
}


function clearAddBookForm() {
    document.querySelector("#author").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#read-no").checked = true;
}


// Delete the book from library array and the associated card.
function deleteCard(btn) {
    // Remove book from array. 
    const bookArrayIndex = parseInt(btn.dataset.id) - 1;
    delete myLibrary[bookArrayIndex];

    // Delete card from the webpage.
    const cardToDelete = document.querySelector(`.card[data-id="${btn.dataset.id}"]`);
    cardToDelete.remove();
}

function getChangedReadStatus(element) {
    return (element.textContent === "Read") ? 
    "Not Read" : "Read";
}