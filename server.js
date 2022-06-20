
const express = require('express');
const cors = require('cors');
const app = express();
var favouriteRecipes = [];

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
    {title: 'Title1', ingredients: ['test1'], instructions: ['noodle'], id: Date.now(),},
    {title: 'Title2', ingredients: ['test2'], instructions: ['noodle'], id: Date.now(),},
    {title: 'Title3', ingredients: ['test3'], instructions: ['noodle'], id: Date.now(),},
  ];

  res.json(customers);
});

var serverRecipes = [];
app.post('/create', function(req, res) {
  if(req.body.recipeTitle && req.body.recipeIngredients && req.body.recipeInstructions) {
  let ingredientsArr = req.body.recipeIngredients.split(',');
  let instructionsArr = req.body.recipeInstructions.split(',');
  // console.log(ingredientsArr);
  const newRecipes = {
    title: req.body.recipeTitle,
    ingredients: ingredientsArr,
    instructions: instructionsArr,
    id: String(Date.now()),
  };

  serverRecipes.push(newRecipes);
  // console.log(serverRecipes);
  return res.json(serverRecipes);
  }
  else {
    return res.status(400).json({error: 'Missing required fields'});
  }
});

app.post('/favourite', function(req, res) {
  const newFavourite = {
    title: req.body.recipe.label,
    url: req.body.recipe.url,
  };
  favouriteRecipes.push(newFavourite);
  console.log(favouriteRecipes);
});


app.delete('/api/customers/:id', (req, res) => {
  // delete in array according to id
  let id = String(req.body.deleteID);
  for(let i = 0; i < serverRecipes.length; i++) {
    if(serverRecipes[i].id === id) {
      serverRecipes.splice(i, 1);
    }
  }
  console.log(serverRecipes);
  return res.json(serverRecipes);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);