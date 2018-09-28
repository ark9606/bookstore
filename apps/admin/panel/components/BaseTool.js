/**
 * Author: Arkady Zelensky
 */

import React, {Component} from "react";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, title, renderItem,renderAddItem } = this.props;

    return (
        <div className="container">
          <h3>{ title }</h3>
          <ul class="list-group">            
            { renderAddItem() }
            {
              data.map( e => renderItem(e))
            }
          </ul>
        </div>
    );
  }
}


export default App;