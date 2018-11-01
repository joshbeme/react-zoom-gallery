import React, {Component} from "react";

class ImageNode extends Component{
    
    render(){
      const heightWidth = this.props.imageHW;
      const x = this.props.imgX;
      const y = this.props.imgY;
  return (
    <img
    className={`img animated ${this.props.animate} `}
    src={this.props.image}
    style={{
      width: heightWidth,
      height: heightWidth,
      left: x,
      top: y,
      
      position: "absolute"
     
    }}
    alt=""
  />
  );}
};
export default ImageNode;
