import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import * as firebase from 'firebase';
import PrivateRoute from './Auth/';
import Login from './Auth/Login.js';

class FirebaseAuth extends Component {
  constructor(props) {
    super();
    this.state = {
      auth: false,
      user: null,
    };

    // Initialize Firebase
    firebase.initializeApp(props.config);

    // Check for user login
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.setState({
          user: currentUser,
          auth: true,
        });
      } else {
        this.setState({
          auth: false,
        });
      }
    });
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
    return (
      <Router>
        <div className="App">
          <PrivateRoute
            exact
            path="/"
            component={User}
            user={this.state.user}
            value={this.state.auth}
          />

          <Route
            path="/login"
            render={() => (
              <Login
                loginUser={this.loginUser.bind(this)}
                auth={this.state.auth}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

const User = () => (
  <h1>User component</h1>
)

export default FirebaseAuth;
