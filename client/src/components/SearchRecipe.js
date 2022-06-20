// API used: Edamam
// https://www.pinterest.ca/pin/276830708334610981/
// https://developer.edamam.com/

import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./Recipe";
import axios from "axios";

function SearchRecipe() {
  const [userInput, setUserInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);

  const APP_ID = "ff2561f5";
  const APP_KEY = "6af973653cbb6b9a8edf5b0967b68b65";

  const url = `https://api.edamam.com/search?q=${userInput}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getRecipes = async () => {
      const result = await Axios.get(url);
      setRecipes(result.data.hits);
      setUserInput("");
  };

  const onChange = event => {
    setUserInput(event.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    getRecipes();
  };

  const handleFavorite = async (favrecipe) => {
    const temp = await axios.post("http://localhost:5000/favourite", favrecipe)
      .then((res) => {
        setFavRecipes(res.data);
      });
  }

  return (
    <div>
      <h4 align = "center">Feeling Lucky?</h4>
      <form onSubmit={onSubmit} align = "center">
        <input type="text" onChange={onChange} value={userInput}/>
        <input type="submit" value="Search" />
      </form>
      <div className="recipes" align = "center">
        {recipes.map(recipe => {
          return (
            <div key = {uuidv4()}>
                <Recipe key={uuidv4()} recipeList={recipe} />
                <button onClick={()=> handleFavorite(recipe)}>Add to favourite</button>
            </div>
          );
        })}
        {/* {recipes.map(recipeList => <Recipe key={uuidv4()} recipeList={recipeList} />)} */}
      </div>
    </div>
  );
}

export default SearchRecipe;