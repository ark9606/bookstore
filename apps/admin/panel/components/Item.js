/**
 * Author: Arkady Zelensky
 */

import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.text,
      state: 'show'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }


  onClickEdit(){
    this.setState({state: 'edit'});
  }

  onClickDelete(){
    if(!confirm(`Delete item ${this.state.value}?`)){
      return;
    }

    const { deleteItem, id } = this.props;
    deleteItem({id});
  }

  onClickSave(){
    const { editItem, text, id } = this.props;
    const { value } = this.state;
    if(value === text){
      this.onClickCancel();
      return;
    }

    editItem({id, value});
    this.setState({state: 'show'});
  }

  onClickCancel(){
    this.setState({state: 'show', value: this.props.text})
  }

  render(){
    const { value, state } = this.state;

    return(
      <li class="list-group-item">
        <form method="post" ref={r => {this.form = r;}} className="row">
            <div className='col-10 d-flex align-items-center'>
              <div className="col col-6">

                  {
                    state === 'edit' &&
                    <input type='text' id='new_item' name='new_item'
                        className="form-control" required maxLength={45}
                        value={value}
                        minLength={4} placeholder='Item name'
                        onChange={(e) => this.handleChange(e)}/>
                  }

                  {
                    state === 'show' && value
                  }                

                </div>
            </div>

            {
              state === 'show' ? 
              <button type="button" class='btn btn-link col-1' onClick={() => this.onClickEdit()}>Edit</button> :
              <button type="button" class='btn btn-link col-1' onClick={() => this.onClickSave()}>Save</button> 
            }  
            {
              state === 'show' ?
              <button type="button" class='btn btn-link col-1' onClick={() => this.onClickDelete()}>Delete</button> :
              <button type="button" class='btn btn-link col-1' onClick={() => this.onClickCancel()}>Cancel</button>   
            }
        </form>
      </li>
    )
  }
}