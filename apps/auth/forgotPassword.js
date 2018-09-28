/**
 * Author: Arkady Zelensky
 * 
 * Unauthorized user enter the email to send change password url
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import {forgotPassword} from '../requests';
import { TextInput, Label, SubmitButton, DangerAlert, SuccessAlert } from '../components';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      error: false,
      errorMessage: "",
      success: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, type) {
    this.setState({[type]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();
    const {email} = this.state;

    forgotPassword({email})
    .then(res => {
      if(!res || !res.status) {
        this.setState({
          error: true, 
          errorMessage: res.error,
          success: null
        })
        return;
      }

      this.setState({ success: res.message, error: false })
    })
  }

  render(){

    const {error, errorMessage, success} = this.state;

    return (
    <form method="post" ref={r => {this.form = r;}} onSubmit={(e) => this.onSubmit(e)} className="container">

      <div className="row form-group justify-content-md-center">  
          <Label forInput='email' title='Email'/>
          <TextInput name='email' onInput={this.handleChange} type='email'/>
      </div>

      <div className="row form-group justify-content-md-center">  
        {error && <DangerAlert text={errorMessage}/>}
        {success && <SuccessAlert text={success}/>}
      </div>

      <div className="row justify-content-center">
        <SubmitButton title='Send mail'/>
      </div>     
    </form>);
  }
}

const wrapper = document.getElementById("forgot_pass_app");
if(wrapper) {
  render( <App/>, wrapper);
}