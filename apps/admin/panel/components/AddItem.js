/**
 * Author: Arkady Zelensky
 */

import React, {Component} from "react";

export default class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value})

  }


  onSubmit(e){
    e.preventDefault();

    const { value } = this.state;
    const { onAdd } = this.props;
    onAdd(value);
    this.form.reset();
  }

  render(){

    return(
      <li class="list-group-item">
        <form method="post" ref={r => {this.form = r;}} onSubmit={(e) => this.onSubmit(e)} className="row">
            <div className='col-10'>
              <div className="row">  
                <div className="col col-6">
                    <input type='text' id='new_item' name='new_item'
                        className="form-control" required maxLength={45}
                        minLength={4} placeholder='New item'
                        onChange={(e) => this.handleChange(e)}/>
                </div>
              </div>
            </div>
            <button type="submit" class='btn btn-primary col-2'>Add</button>   
        </form>
      </li>
    )
  }
}

