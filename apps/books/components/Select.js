/**
 * Author: Arkady Zelensky
 */

import React from "react";
import PropTypes from "prop-types";

const App = ({ items, handleClick, id }) => (
    <select className="form-control" id={id} onChange={ handleClick }>
      { items.map( i => <option>{i}</option>) }
    </select>
);

App.propTypes = {
  items: PropTypes.array.isRequired, 
  handleClick: PropTypes.func.isRequired
};

export default App;