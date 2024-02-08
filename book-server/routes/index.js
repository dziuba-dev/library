var express = require('express');
var router = express.Router();

let books = []; // Przechowywanie książek w pamięci

/* GET home page. */
router.get('/books', (req, res) => {
  res.status(200).json(books);
});

router.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).send();
});

router.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = updatedBook;
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

router.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter(book => book.id !== id);
  res.status(204).send();
});

module.exports = router;
