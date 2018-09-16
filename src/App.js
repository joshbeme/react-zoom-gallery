import React, { Component } from 'react';
import logo from './area1.JPG';
import Frame from './components/frame'
import './index.css';
import logo1 from './area2.JPG';
import option1 from './option1.JPG';
import option2 from './option2.JPG';

class App extends Component {

  render() {
    const links2 = [{
      x: 90,
      y: 30,
      nest: (<img src={option1} style={{height: "100%", width:"100%"}}/>)

    },
    {
      x: 40,
      y: 70,
      nest: (<img src={option2} style={{height: "100%", width:"100%"}}/>)

    }]
    const links = [{
      x: 50,
      y: 50,
      nest: (<Frame image={logo1} imageLinks={links2}/>)

    }];
    return (
      <div className="app" style={{height: "100%", width:"100%"}}>
  <Frame image={logo} imageLinks={links} />
  
      </div>
    );
  }
}

export default App;
