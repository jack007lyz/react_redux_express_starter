const express = require('express');
const cors = require('cors');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/customers', (req, res) => {
  const customers = [
    {title: 'Title1', ingredients: ['test1'], instructions: ['noodle']},
    {title: 'Title2', ingredients: ['test2'], instructions: ['noodle']},
    {title: 'Title3', ingredients: ['test3'], instructions: ['noodle']},
  ];

  res.json(customers);
});

let books = [];
app.post('/create', function(req, res) {
  const newBook = {
    BookID: req.body.bookID,
    Title: req.body.bookTitle,
    Author: req.body.bookAuthor,
  };

  books.push(newBook);
  console.log(books);
  return res.json(books);
});

app.get('/api/cards', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
  ];

  res.json(customers);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);