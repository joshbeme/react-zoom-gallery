import React, { Component } from "react";
import outside from "./area1.1.jpg";
import Frame from "./components/frame";
import "./index.css";
import inside from "./area2.1.jpg";
import option1 from "./option1.1.jpg";
import option2 from "./option2.1.jpg";

class App extends Component {
  render() {
    const links2 = [
      {
        x: 90,
        y: 45,
        nest: <Frame image={option1}  >{[]}</Frame>
      },
      {
        x: 25,
        y: 65,
        nest: <Frame image={option2}  >{[]}</Frame>
      }
    ];
    const links = [
      {
        x: 73,
        y: 49,
        nest: (
        <Frame image={inside}>{links2}</Frame>
        )
      }
    ];
    return (
      <div
        className="app gridcontainer"
     
      >
        <div className="grid-item1" >
        <h1>React Zooming Gallery!</h1></div>
        <div className="grid-item2">
          <Frame className="framing" image={outside} imageLinks={links} >
          {links}
          </Frame>

        </div>
        <div className="grid-item3" />
      </div>
    );
  }
}

export default App;
