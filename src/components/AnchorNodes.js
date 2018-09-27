import React from "react";
import ".././index.css";

const AnchorNode = props => {
  return (
    <a
      onClick={props.click}
      className="a imgLink grid-item2"
      style={{ left: `${props.x}%`, top: `${props.y}%` }}
    />
  );
};
export default AnchorNode;
