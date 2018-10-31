import React, { Component } from "react";
import 'animate.css';
import  {Motion, spring } from 'react-motion';
import { TiArrowBack } from "react-icons/ti";
class Back extends Component {
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
        <Motion style={{ xy: spring(this.state.toggle ? 1 : 1.3) }}>
        {({xy}) => <a 
        onMouseEnter={(e)=>this.onEnterHandler(e)}
        onMouseLeave={()=>this.onLeaveHandler()}
        style={{
          color: "#dfe1f0",
          position: "absolute",
          zIndex: "3",
          height: "5%",
          width: "5%", 
          transform: `scale(${xy})`
        }} className="back" onClick={this.props.back}
        >
          <TiArrowBack
            className="arrow"
            style={{ width: "100%", height: "100%" }}
            
          />
        </a>}</Motion>
    );
  }
};
export default Back;
