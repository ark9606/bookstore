/**
 * Author: Arkady Zelensky
 * 
 * Authorized user changes password
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import {changePassword} from './requests';
import { TextInput, Label, SubmitButton, DangerAlert, SuccessAlert } from './components';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      error: false,
      errorMessage: "",
      success: null,
      opened: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, type) {
    this.setState({[type]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();
    const {oldPassword, newPassword} = this.state;

    changePassword({oldPassword, newPassword})
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
    .catch(err => {
      console.log(err);
      alert('Some error happens');
    })
  }

  onChangeOpen() {
    this.setState(prevState => ({
      opened: !prevState.opened
    }));

  }

  render(){

    const {error, errorMessage, success, opened} = this.state;

    return (
    <form method="post" ref={r => {this.form = r;}} onSubmit={(e) => this.onSubmit(e)} className="container">

      <div className="row form-group justify-content-center">  
        <button type="button" onClick={() => this.onChangeOpen()} className={`btn btn-${ opened ? 'dark' : 'light'}`}>Change password</button>
      </div>
      { opened &&
      <div>
        <div className="row form-group justify-content-md-center">  
            <Label forInput='oldPassword' title='Old password'/>
            <TextInput name='oldPassword' onInput={this.handleChange} type='password'/>
        </div>

        <div className="row form-group justify-content-md-center">  
            <Label forInput='newPassword' title='New password'/>
            <TextInput name='newPassword' onInput={this.handleChange} type='password'/>
        </div>

        <div className="row form-group justify-content-md-center">  
          {error && <DangerAlert text={errorMessage}/>}
          {success && <SuccessAlert text={success}/>}

        </div>

        <div className="row justify-content-center">
          <SubmitButton/>
        </div>   
      </div>
      }

  
    </form>);
  }
}

const wrapper = document.getElementById("change_pass_app");
if(wrapper) {
  render( <App/>, wrapper);
}