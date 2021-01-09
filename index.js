import './style.css';

const PROXY_SERVER = 'https://cors-anywhere.herokuapp.com/'
const API_URL = 'https://www.goodreads.com/book/auto_complete?format=json&q=';

const searchFraseInput = document.querySelector('.form__input')
const searchBtn = document.querySelector('#form__button')
const results = document.querySelector('.results')
results.innerHTML = ''

async function fetchBooks(booksUrl) {
  const response = await fetch(booksUrl)

  if (response.ok) return await response.json()
  throw new Error(`The call is not ok: ${res.status}`)
}

const getBooksList = (e) => {
  e.preventDefault()
  if(searchFraseInput.value.trim() === '') return
  let searchFrase = encodeURIComponent(searchFraseInput.value)
  let FETCH_URL = `${PROXY_SERVER}${API_URL}${searchFrase}`
  searchFraseInput.value = ''
  fetchBooks(FETCH_URL)
    .then(books =>  displayBooks(books))
    .then(booksEntry => booksEntry.map(book => results.innerHTML += book))
}

const displayBooks = (books) => {
  const booksList = []
  results.innerHTML = ''
  books.forEach(book => {
    const { imageUrl, title, author, description } = book
    const entry = `
      <li class="entry">
        <img class="entry__image" src="${imageUrl}" alt="${title}">
        <div>
        <p class="entry__name">${title}</p>
        <p class="entry__author">${author.name}</p>
        <a class="entry__description" href="${description.fullContentUrl}" rel=”nofollow noopener noreferrer” target="_blank">Czytaj opis...</a>
        </div>
      </li>
    `
    booksList.push(entry)
  })
  return booksList
}

searchBtn.addEventListener('click', getBooksList)