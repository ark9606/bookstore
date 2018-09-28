/**
 * Author: Arkady Zelensky
 */

import { combineReducers } from "redux";

import books from "./books";
import pages from "./pages";

export default combineReducers({
  books,
  pages
})
