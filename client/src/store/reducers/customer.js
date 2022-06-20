import {GET_RECIPES} from '../actions/constants'

const customerReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_RECIPES:
        return payload
      default:
        return state
    }
}

export default customerReducer;
