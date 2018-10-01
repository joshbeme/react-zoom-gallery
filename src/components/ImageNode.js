import React from "react";
import ".././index.css";

const ImageNode = props => {
    const heightWidth = props.imageHW
  return (
    <img
    className={`img animated ${props.animate} `}
    src={props.image}
    style={{
      width: heightWidth,
      height: heightWidth,
      left: props.imgX,
      top: props.imgY
     
    }}
  />
  );
};
export default ImageNode;
