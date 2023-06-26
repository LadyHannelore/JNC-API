newFunction();

function newFunction() {
  document.addEventListener('DOMContentLoaded', function () {
    fetch('en.json')
      .then(response => response.json())
      .then(data => {
        const booksContainer = document.getElementById('books');
        const books = data.pageProps.data.titlesLatest;

        books.forEach(book => {
          if (book.credits.author === 'Miya Kazuki') {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';

            const titleElement = document.createElement('h2');
            titleElement.className = 'name';
            titleElement.textContent = book.name;

            const imageElement = document.createElement('img');
            imageElement.src = book.thumbnail;
            imageElement.alt = 'Book Cover';

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = 'Description: ' + book.description;

          

            const authorElement = document.createElement('p');
            authorElement.className = 'auth';
            authorElement.textContent = 'Author: ' + book.credits.author;

            bookElement.appendChild(titleElement);
            bookElement.appendChild(imageElement);
            bookElement.appendChild(descriptionElement);
            bookElement.appendChild(authorElement);
            booksContainer.appendChild(bookElement);
          }
        });
      })
      .catch(error => console.log(error));
  });
}
