/**
 * Author: Arkady Zelensky
 */

const initialState = {
  items: [] 
};

import {SET_BOOKS} from '../actions/constants';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      state = {
        ...state,
        items: action.payload
      };
      break;
  }
  return state;
};

export default reducer;