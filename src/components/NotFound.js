import React from "react";
import notFoundImg from "../img/notFoundImg.png";

function NotFound() {
  const style = {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <div className="container" style={style}>
      <img src={notFoundImg} alt="" />
      <h1
        style={{
          color: "black",
          fontFamily: "sans-serif",
          marginTop: "1.5rem"
        }}
      >
        Sorry, something went wrong
      </h1>
    </div>
  );
}

export default NotFound;
