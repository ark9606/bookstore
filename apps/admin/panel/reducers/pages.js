/**
 * Author: Arkady Zelensky
 */

import { SET_PAGE } from '../actions/constants';

const initialState = {
    page: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_PAGE:
          state = {
              ...state,
              page: action.payload
          };
          break;
  }
  return state;
};

export default reducer;