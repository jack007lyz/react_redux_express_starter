import React, { Component, useState } from 'react';
import axios from 'axios';
import Cards from '../../Cards';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'redux';

class Create extends Component {

  constructor(props) {
    super(props);
    var recipes;
    this.state = {
      bookID: '',
      bookTitle: '',
      bookAuthor: '',
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
    const { bookID, bookTitle, bookAuthor } = this.state;

    const book = {
      bookID,
      bookTitle,
      bookAuthor,
    };

    const sendPost = async () => {
      const res = await axios.post('http://localhost:5000/create', book)
      .then((res) =>{
        this.setState({allRecipes: res.data});
      })
      console.log(this.state.allRecipes);
    }
    sendPost();
      // this.setState(this.allRecipes.concat(<Cards key = {uuidv4()} title = {this.recipes.bookID} ingredients = {this.recipes.bookAuthor} instructions = {this.recipes.bookTitle}/>)); 
  };

  render() {
    return (
      <div>
        <br />
        <div className="container" align="center">
          <form onSubmit={this.handleSubmit}>
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="bookID"
                placeholder="Title"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="bookTitle"
                placeholder="Ingredients"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="bookAuthor"
                placeholder="Instructions"
                onChange={this.handleInputChange}
              />
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
                <div>
                <Cards key = {numbers.id} title = {numbers.BookID} ingredients = {numbers.Title} instructions = {numbers.Author}/>
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