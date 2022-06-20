import {GET_RECIPES} from './constants';

export const getCustomers = () => dispatch => {
  return fetch('/api/customers')
    .then(res => res.json())
    .then(customers => dispatch({type: GET_RECIPES, payload: customers}))
}
