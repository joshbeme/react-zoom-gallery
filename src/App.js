import React, { Component } from 'react';
import logo from './logo.svg';
import Frame from './components/frame'
import './index.css';

class App extends Component {

  render() {
    const links = [{
      x: 10,
      y: 36,
      nest: <img src={logo}/>
    },{
      x: 10,
      y: 86,
      nest: <img src={logo}/>

    },{
      x: 80,
      y: 36,
      nest: <img src={logo}/>

    }];
    return (
      <div className="app" style={{height: "100%", width:"100%"}}>
  <Frame image={logo} imageLinks={links} />
  
      </div>
    );
  }
}

export default App;
