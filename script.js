newFunction();

function newFunction() {
  document.addEventListener('DOMContentLoaded', function () {
    fetch('https://labs.j-novel.club/app/v1/series/ascendance-of-a-bookworm/volumes?format=json')
      .then(response => response.json())
      .then(data => {
        const booksContainer = document.getElementById('books');
        const books = data.volumes;
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            

            const titleElement = document.createElement('h2');
            titleElement.className = 'name';
            titleElement.textContent = book.title;

            const imageElement = document.createElement('img');
            imageElement.src = book.cover.coverUrl;
            imageElement.alt = 'Book Cover';

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = 'Description: ' + book.description;

          

            const authorElement = document.createElement('p');
            authorElement.className = 'auth';
            authorElement.textContent = 'Author: Miya Kazuki';

            bookElement.appendChild(titleElement);
            bookElement.appendChild(imageElement);
            bookElement.appendChild(descriptionElement);
            bookElement.appendChild(authorElement);
            booksContainer.appendChild(bookElement);
          
        });
      })
      .catch(error => console.log(error));
  });
}
