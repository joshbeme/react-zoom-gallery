import React from "react";
import ".././index.css";

const ImageNode = props => {
    const heightWidth = props.imageHW
  return (
    <img
    className="img"
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
