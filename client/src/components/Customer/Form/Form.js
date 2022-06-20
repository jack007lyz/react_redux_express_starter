import React, { Component, useState } from 'react';
import axios from 'axios';
import Cards from '../../Cards';
import './Form.css'

class Create extends Component {

  constructor(props) {
    super(props);
    var recipes;
    this.state = {
      recipeTitle: '',
      recipeIngredients: '',
      recipeInstructions: '',
      allRecipes:[],
      ingredients: [],
    };
  }

  handleDelete = (item) => {
    const newRecipes = this.state.allRecipes.filter(recipe => recipe.id !== item.id);
    // axios.delete(`http://localhost:5000/api/customers/${item.id}`)
      // .then((res) => {
      //     this.setState({
      //       allRecipes: res
      //     });
      // });
      const sendDelete = async () => {
        axios.delete('http://localhost:5000/api/customers/'+JSON.stringify(item.id), {
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            deleteID: String(item.id)
          }
        })
          .then((res) => {
            this.setState({
              allRecipes: res.data
            });
        });
        // const res = await axios.delete(`http://localhost:5000/api/customers/${JSON.stringify(item.id)}`)
        // .then((res) =>{
        //   console.log(res.data);
        //   this.setState({allRecipes: res.data});
        // })
      }


      sendDelete();  
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { recipeTitle, recipeIngredients, recipeInstructions } = this.state;

    const book = {
      recipeTitle,
      recipeIngredients,
      recipeInstructions,
    };

    const sendPost = async () => {
      const res = await axios.post('http://localhost:5000/create', book)
      .then((res) =>{
        this.setState({allRecipes: res.data});
      }).catch((err) => {
        alert("Empty input");
      }
      );
      console.log(this.state.allRecipes);
    }
    sendPost();
      // this.setState(this.allRecipes.concat(<Cards key = {uuidv4()} title = {this.recipes.recipeTitle} ingredients = {this.recipes.recipeInstructions} instructions = {this.recipes.recipeIngredients}/>)); 
  };

  render() {
    return (
      <div>
        <br />
        <div className="container" align="center">
          <form onSubmit={this.handleSubmit}>
            <div style={{ width: '30%' }} className="form-group">
            <label className="labels">Recipe Title:
              <input
                type="text"
                className="inputFieldClass"
                name="recipeTitle"
                placeholder="Title"
                onChange={this.handleInputChange}
              />
            </label>
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
            <label className="labels">Ingredients:
              <input
                type="text"
                className="inputFieldClass"
                name="recipeIngredients"
                placeholder="Ingredients"
                onChange={this.handleInputChange}
              />
            </label>
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
            <label className="labels">Instructions:
              <input
                type="text"
                className="inputFieldClass"
                name="recipeInstructions"
                placeholder="Instructions"
                onChange={this.handleInputChange}
              />
            </label>
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </form>
          <div className = "Cards">
            {this.state.allRecipes.map((numbers) =>{
              return(
                <div key = {numbers.id + 10086}>
                <Cards key = {numbers.id} title = {numbers.title} ingredients = {numbers.ingredients} instructions = {numbers.instructions}/>
                <button onClick={()=> this.handleDelete(numbers)}>Delete</button>
                </div>
              );
            }
            )}
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Create;