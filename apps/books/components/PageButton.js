/**
 * Author: Arkady Zelensky
 */

import React from "react";
import PropTypes from "prop-types";

const App = ({ active, handleClick, value }) => (
  <li className={`page-item ${active ? 'active' : ''}`}>
    <button type="button" className={`page-link`} onClick={handleClick}>{value}</button>
  </li>  
);

App.propTypes = {
  value: PropTypes.string.isRequired, 
  active: PropTypes.bool.isRequired, 
  handleClick: PropTypes.func.isRequired
};

export default App;