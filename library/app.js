let library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.info = function() {
    const status = `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`
    return status;
}

Book.prototype.toggleStatus = function(status, toggle) {
    if(toggle.checked) {
        status.textContent = 'read';
    } else{
        status.textContent = 'not read';
    }
}

Book.prototype.createBookCard = function(obj, index) {
    const wrapper = document.querySelector('.library');

    const div = document.createElement('div');
    div.classList.add('card');

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = obj.title;

    const author = document.createElement('p');
    author.classList.add('author');
    author.textContent = obj.author;

    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.textContent = obj.pages;

    const status = document.createElement('p');
    status.classList.add('status');
    status.textContent = obj.status;

    const toggle = document.createElement('input');
    toggle.classList.add('status-toggle', `_${index}`);
    toggle.type = 'checkbox';

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(status);
    div.appendChild(toggle);

    wrapper.appendChild(div);

    toggle.addEventListener('click', () => this.toggleStatus(status, toggle));

}

function addBookToLibrary(book) {
    library.push(book);
    return displayBooks(book);
}

function displayBooks(book) {
    const wrapper = document.querySelector('.library');
    wrapper.innerHTML = '';
    for(let i = 0; i <= library.length - 1; i++) {
        // console.log(library[i]);
        book.createBookCard(library[i], i);
    }
}

function showForm(form) {
    return form.classList.toggle('form-active');
}

function formSubmit(inputs) {
    let results = []; //title, author, pages, status
    inputs.forEach((input) => {
        if(input.type === 'checkbox') {
            // let status = '';
            if(input.checked) {
                results.push('read');
            } else {
                results.push('not read');
            }
            // results.push(input.checked);
        }else {
            results.push(input.value);
        }
    })
    let book = new Book(results[0], results[1], results[2], results[3]);
    // console.log('results arr', results);
    // console.log(library);
    resetForm(inputs, results);
    return addBookToLibrary(book);
}

function resetForm(inputs, results) {
    inputs.forEach(input => {
        input.value = '';
    })
}

function formBtnListener() {
    const btn = document.querySelector('.new');
    const form = document.querySelector('.form');
    btn.addEventListener('click', () => showForm(form));
}

function submitBtnListener() {
    const form = document.querySelector('.form');
    const btn = document.querySelector('.form-submit');
    const inputs = document.querySelectorAll('.form-input');
    btn.addEventListener('click', () => formSubmit(inputs));
    document.querySelector('.form').classList.toggle('form-active');
}

function statusListener() {
    const status = document.querySelectorAll('status-toggle');
    status.addEventListener('click', )
}

const prevent = (() => {
    const submit = document.querySelector('.form-submit');
    submit.addEventListener('click', (e) => e.preventDefault());
})()

document.addEventListener('DOMContentLoaded', () => {
    formBtnListener();
    submitBtnListener();
})
