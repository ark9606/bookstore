/**
 * Author: Arkady Zelensky
 */

import { SET_GENRES, ADD_NEW_GENRE, 
    DELETE_ONE_GENRE, EDIT_ONE_GENRE
} from '../actions/constants';


const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_GENRES:
          state = action.payload;          
          break;
      case ADD_NEW_GENRE:
          state = [...state, action.payload];          
          break;
      case DELETE_ONE_GENRE:
          state = state.filter(g => g.id !== action.payload);          
          break;
      case EDIT_ONE_GENRE:
          state = state.map(a => {
              if(a.id !== action.payload.id){
                  a.name = action.payload.value;
              }
              return a;
            });          
          break;
  }
  return state;
};

export default reducer;