import React, { Component } from "react";
import  {Motion, spring } from 'react-motion';

class AnchorNode extends Component {
  constructor(props){
    super(props);
    this.state={
      toggle: true
    }
    this.onEnterHandler = this.onEnterHandler.bind(this);
    this.onLeaveHandler = this.onLeaveHandler.bind(this);
  }

  onEnterHandler(e){
    e.target.style.cursor = "pointer"
    this.setState({
      toggle: false
    })
  }
  onLeaveHandler(){
    
    this.setState({
      toggle: true
    })
  }

  render() {
    return (
      <Motion style={{xy: spring(this.state.toggle ? 1:2)}}>
     {({xy}) => <a
        onMouseEnter={(e)=>this.onEnterHandler(e)}
        onMouseLeave={(e)=>this.onLeaveHandler(e)}

        onClick={this.props.click}
        className="a imgLink "
        style={{
          left: `${this.props.x}%`, top: `${this.props.y}%`,
          zIndex: "1",
          borderColor: "#7d7280",
          borderStyle: "solid",
          borderWidth: "0.5px",
          height: "10%",
          width: "15%",
          borderRadius: "5%",
          transform: `translate(-50%, -50%) scale(${xy})`,
          position: "absolute",
          boxShadow: "3px 3px 5px",
        }}
      />}</Motion>
    );
  }
};
export default AnchorNode;
