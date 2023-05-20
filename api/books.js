$(document).ready(() => {
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const keyword = document.getElementById('keyword').value;
    const publisherAge = document.getElementById('publisherAge').value;
    const bookTypeCheckboxes = document.querySelectorAll('input[name="bookType"]:checked');
    const bookType = Array.from(bookTypeCheckboxes).map((checkbox) => checkbox.value);

    const data = { keyword, publisherAge, bookType };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const books = await response.json();
      displayResults(books);
    } catch (error) {
      console.error(error);
      // Handle error scenario
    }
  });

  function displayResults(books) {
    const tbody = document.querySelector('#books-table tbody');
    tbody.innerHTML = '';

    books.forEach((book, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${book.bookName}</td>
          <td>${book.publisherName}</td>
          <td>${book.publisherDate}</td>
        `;

      tbody.appendChild(row);
    });
  }
});
