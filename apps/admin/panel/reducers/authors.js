/**
 * Author: Arkady Zelensky
 */

import { SET_AUTHORS, ADD_NEW_AUTHOR, 
    DELETE_ONE_AUTHOR, EDIT_ONE_AUTHOR
} from '../actions/constants';


const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_AUTHORS:
          state = action.payload;          
          break;

      case ADD_NEW_AUTHOR:
          state = [...state, action.payload];          
          break;
      case DELETE_ONE_AUTHOR:
          state = state.filter(a => a.id !== action.payload);          
          break;
      case EDIT_ONE_AUTHOR:
          state = state.map(a => {
              if(a.id !== action.payload.id) {
                  a.name = action.payload.value;
              }
              return a;
            });          
          break;
  }
  return state;
};

export default reducer;