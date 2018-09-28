/**
 * Author: Arkady Zelensky
 */

import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunk from 'redux-thunk';

import AppReducer from "./reducers";

export default createStore(
    AppReducer,
    {},
    applyMiddleware(createLogger, thunk)
);