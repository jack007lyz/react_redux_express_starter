
import React from "react";


const Recipe = ({recipeList}) => {
  // console.log(recipeList);

  return (
    <div>
      <h2>{recipeList.recipe.label}</h2>
      <img src={recipeList.recipe.image}/>
      <a href={recipeList.recipe.url} rel="noopener noreferrer">
        URL
      </a>
    </div>
  );
};

export default Recipe;