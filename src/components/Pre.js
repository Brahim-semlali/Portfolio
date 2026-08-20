import React from "react";

function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      <div className="preloader-inner">
        <div className="preloader-ring" />
        <span className="preloader-text">BS</span>
      </div>
    </div>
  );
}

export default Pre;
