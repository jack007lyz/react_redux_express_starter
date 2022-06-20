import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getCustomers} from '../../store/actions/customer'
import './customers.css';
import Cards from '../Cards';
import { v4 as uuidv4 } from "uuid";

class Customers extends Component {

  static propTypes = {
    getCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
  }

  static defaultProps = {
    customers: []
  }

  componentWillMount() {
    this.props.getCustomers();
  }

  // deleteCards according to id
  // deleteCards = (item) => {
  //   for(let i = 0; i < this.props.customers.length; i++) {
  //     if(this.props.customers[i].id === item.id) {
  //       this.props.customers.splice(i, 1);
  //     }
  //   }
  //   // this.setState({
  //   //   customers: newCards
  //   // });
  //   console.log(this.props.customers);
  // }

  render() {
    return (
      <div>
        <h2>Example Recipes</h2>
        <div>
          {/* {this.props.customers.map(customer =>
            <Cards title = {customer.title} ingredients = {customer.ingredients} instructions = {customer.instructions}/>
          )} */}
          {this.props.customers.map((numbers) =>{
              return(
                <div key = {uuidv4()}>
                <Cards key = {numbers.id} title = {numbers.title} ingredients = {numbers.ingredients} instructions = {numbers.instructions}/>
                {/* <button onClick={()=> this.deleteCards(numbers)}>Delete</button> */}
                </div>
              );
            }
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customers: state.customers
})

const dispatchToProps = (dispatch) => ({
   getCustomers: () => dispatch(getCustomers())
})

export default connect(mapStateToProps, dispatchToProps)(Customers);
