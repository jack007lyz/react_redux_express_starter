import React, { Component } from 'react'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import store from './store'
import Customers from './components/Customer/customers'
import Create from './components/Customer/Form/Form'
import SearchRecipe from './components/SearchRecipe'
import Recipe from './components/Recipe'

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo"/>
            <h1 className="App-title">React/Redux Express Starter</h1>
          </header>
          <Customers/>
        </div>
        <Create/>
        <SearchRecipe/>
      </Provider>
    )
  }
}

export default App
