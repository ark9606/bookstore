/**
 * Author: Arkady Zelensky
 */

import { combineReducers } from "redux";

import pages from "./pages";
import genres from "./genres";
import authors from "./authors";
import books from "./books";

export default combineReducers({
  pages,
  genres,
  authors,
  books
})
