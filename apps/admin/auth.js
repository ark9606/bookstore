/**
 * Author: Arkady Zelensky
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { signin } from './requests';
import { TextInput, Label, SubmitButton, DangerAlert } from '../components';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      login: "",
      password: "",
      error: false,
      errorMessage: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, type) {
    this.setState({[type]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    const { login, password } = this.state;

    signin({login, password})
    .then(res => {
      if(!res || !res.status) {
        this.setState({
          error: true, 
          errorMessage: res.error
        })
        return;
      }
      
      window.location.href = res.data.redirect;
    })
  }

  render() {
    const { error, errorMessage } = this.state;

    return (
    <form method="post" ref={r => {this.form = r;}} onSubmit={(e) => this.onSubmit(e)} className="container">

      <div className="row form-group justify-content-md-center">  
          <Label forInput='login' title='Login'/>
          <TextInput name='login' onInput={this.handleChange} type='text'/>
      </div>

      <div className="row form-group justify-content-md-center">  
          <Label forInput='password' title='Password'/>
          <TextInput name='password' onInput={this.handleChange} type='password'/>
      </div>

      <div className="row form-group justify-content-md-center">  
        {error && <DangerAlert text={errorMessage}/>}
      </div>

      <div className="row justify-content-center">
        <SubmitButton/>
      </div>     

    </form>);
  }
}

const wrapper = document.getElementById("sign_app");
if(wrapper) {
  render( <App/>, wrapper);
}