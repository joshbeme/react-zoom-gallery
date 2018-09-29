import React from "react";
import ".././index.css";

const AnchorNode = props => {
  return (
    <a
      onClick={props.click}
      className="a imgLink "
      style={{ left: `${props.x}%`, top: `${props.y}%` }}
    />
  );
};
export default AnchorNode;
