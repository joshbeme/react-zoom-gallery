import React, { Component } from 'react';
import logo from './logo.svg';
import Frame from './components/frame'
import './index.css';

class App extends Component {

  render() {
    return (
      <div className="app" >
  <Frame image={logo} />
  
      </div>
    );
  }
}

export default App;
