import React from "react";
import '.././index.css';

const smallNode = props => {
  return (
    <a
    onClick={}
      className="imgLink"
      id={`link${props.index}`}
      style={{ position: "absolute", transform: translate(props.x, props.y) }}
    />
  );
  const xy = document.querySelector(`#links${props.index}`);
};
export default smallNode;
