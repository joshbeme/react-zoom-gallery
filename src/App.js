import React, { Component } from "react";
import logo from "./area1.JPG";
import Frame from "./components/frame";
import "./index.css";
import logo1 from "./area2.JPG";
import option1 from "./option1.JPG";
import option2 from "./option2.JPG";

class App extends Component {
  render() {
    const links2 = [
      {
        x: 90,
        y: 30,
        nest: <Frame image={option1} imageLinks={[]} />
      },
      {
        x: 30,
        y: 65,
        nest: <Frame image={option2} imageLinks={[]} />
      }
    ];
    const links = [
      {
        x: 70,
        y: 50,
        nest: <Frame image={logo1} imageLinks={links2} />
      }
    ];
    return (
      <div
        className="app gridcontainer"
        style={{ height: "75%", width: "75%" }}
      >
        <div className="grid-item1" />
        <div className="grid-item2">
          <Frame className="framing" image={logo} imageLinks={links} />
        </div>
        <div className="grid-item3" />
      </div>
    );
  }
}

export default App;
