/**
 * Author: Arkady Zelensky
 */

import { SET_PAGES, SET_ACTIVE_PAGE } from '../actions/constants';

const initialState = {
    count: 1,
    active: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_PAGES:
          state = {
              ...state,
              count: action.payload
          };
          break;
      case SET_ACTIVE_PAGE:
          state = {
              ...state,
              active: action.payload
          };
          break;
  }
  return state;
};

export default reducer;