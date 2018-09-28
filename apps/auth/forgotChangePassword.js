/**
 * Author: Arkady Zelensky
 * 
 * Unauthorized user change password from email url
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import {changeForgotPassword} from '../requests';
import { TextInput, Label, SubmitButton, DangerAlert, SuccessAlert } from '../components';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      newPassword: "",
      error: null,
      success: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, type) {
    this.setState({[type]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();
    const {newPassword} = this.state;

    changeForgotPassword({newPassword})
    .then(res => {

      if(!res || !res.status) {
        this.setState({
          error: res.error, 
          success: null
        })
        return;
      }

      this.setState({ success: res.message, error: null })
    })
  }

  render(){

    const {error, success} = this.state;

    return (
    <form method="post" ref={r => {this.form = r;}} onSubmit={(e) => this.onSubmit(e)} className="container">

      <div className="row form-group justify-content-md-center">  
          <Label forInput='newPassword' title='New password'/>
          <TextInput name='newPassword' onInput={this.handleChange} type='password'/>
      </div>

      <div className="row form-group justify-content-md-center">  
        {error && <DangerAlert text={error}/>}
        {success && <SuccessAlert text={success}/>}
      </div>

      <div className="row justify-content-center">
        <SubmitButton title='Change password'/>
      </div>     
    </form>);
  }
}

const wrapper = document.getElementById("forgot_change_pass_app");
if(wrapper) {
  render( <App/>, wrapper);
}