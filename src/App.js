import React, { Component } from 'react';
import logo from './Head.jpg';
import Frame from './components/frame'
import './index.css';
import logo1 from './Header.jpg';

class App extends Component {

  render() {
    const links = [{
      x: 25,
      y: 36,
      nest: (<img src={logo1} style={{ height: "100%", width: "100%" }}/>)
    },{
      x: 70,
      y: 56,
      nest: (<img src={logo1} style={{ height: "100%", width: "100%" }}/>)

    },{
      x: 30,
      y: 5,
      nest: (<img src={logo1} style={{ height: "100%", width: "100%" }}/>)

    }];
    return (
      <div className="app" style={{height: "100%", width:"100%"}}>
  <Frame image={logo} imageLinks={links} />
  
      </div>
    );
  }
}

export default App;
