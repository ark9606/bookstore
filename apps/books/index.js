/**
 * Author: Arkady Zelensky
 */

import { render } from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import App from "./containers/BookShelf";
import store from "./store";

const wrapper = document.getElementById("books_app");

if(wrapper) {
  render(
    <Provider store={store}>
        <App />
    </Provider>,
    wrapper);
}


