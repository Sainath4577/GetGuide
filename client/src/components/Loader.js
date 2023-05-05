import React from "react";

function Loader(props) {
  return (
    <div
      className="spinner-border"
      role="status"
      style={{ color: props.color }}
    >
      {" "}
      <span className="sr-only"></span>
    </div>
  );
}

export default Loader;
