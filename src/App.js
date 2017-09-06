import React, { Component } from 'react';
import FirebaseAuth from './FirebaseAuth.js';
import './App.css';
import config from './firebase-conf.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React Auth with Firebase</h2>
        </div>
        <div className="App-intro">
          <FirebaseAuth config={config} />
        </div>
      </div>
    );
  }
}

export default App;
