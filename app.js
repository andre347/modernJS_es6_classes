// Book Constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}



//UI Constructor

function UI() {
}

// Add book to list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    // create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class='delete'>X<a></td>
    `;

    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
    // create a div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // remove after 3 secs
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}


// Delete book

UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
    }
}

// Clear fields

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}



// Event Listeners for add book

document.getElementById('book-form').addEventListener('submit', function (e) {

    // get values from form
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instatiate book
    const book = new Book(title, author, isbn);

    // Instatiate UI

    const ui = new UI()

    // Validate
    if (title === '' || author === '' || isbn === '') {
        //Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {

        // add book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book added', 'succes')

        //clear fields
        ui.clearFields();

    };


    e.preventDefault();

});

// Event Listener for delete

document.getElementById('book-list').addEventListener('click', function(e){
    // Instatiate UI

    const ui = new UI()
    //Delete book
    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book removed!', 'succes');
    e.preventDefault();
})