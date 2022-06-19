
const express = require('express');
const cors = require('cors');
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
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

var books = [];
app.post('/create', function(req, res) {
  let ingredientsArr = req.body.bookTitle.split(',');
  let instructionsArr = req.body.bookAuthor.split(',');
  // console.log(ingredientsArr);
  const newBook = {
    BookID: req.body.bookID,
    Title: ingredientsArr,
    Author: instructionsArr,
    id: String(Date.now()),
  };

  books.push(newBook);
  // console.log(books);
  return res.json(books);
});

app.get('/api/cards', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
  ];

  res.json(customers);
});

app.delete('/api/customers/:id', (req, res) => {
  // delete in books array according to id
  let id = String(req.body.deleteID);
  for(let i = 0; i < books.length; i++) {
    if(books[i].id === id) {
      books.splice(i, 1);
    }
  }
  console.log(books);
  return res.json(books);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);