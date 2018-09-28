/**
 * Author: Arkady Zelensky
 */

import { SET_BOOKS, ADD_NEW_BOOK, 
    DELETE_ONE_BOOK, EDIT_ONE_BOOK
} from '../actions/constants';


const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_BOOKS:
          state = action.payload;          
          break;
      case ADD_NEW_BOOK:
          state = [...state, action.payload]; 
                  
          break;
      case DELETE_ONE_BOOK:
          state = state.filter(b => b.id !== action.payload);          
          break;
      case EDIT_ONE_BOOK:

          state = state.map(b => {
              if(b.id === action.payload.id){
                  return action.payload;
              }
              return b;
            });          
          break;
  }
  return state;
};

export default reducer;