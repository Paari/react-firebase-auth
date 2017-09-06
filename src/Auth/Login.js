import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  Redirect,
} from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
    };
  }

  // FUNCTION TO UPDATE THE LOGIN STATUS
  loginUser() {
    // GOOGLE LOGIN USING A POPUP WINDOW
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token.
      const token = result.credential.accessToken;

      // update the state that the user is logged in
      this.setState({
        auth: true,
      });
    });
  }

  render() {
    if (this.props.auth) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div>
        <h2>Login Page</h2>
        <button onClick={this.loginUser.bind(this)}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
