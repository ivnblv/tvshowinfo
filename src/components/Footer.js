import React from "react";
import tvmazeLogo from "../img/tvmazeLogo.png";

function Footer() {
  return (
    <div className="footer highlight">
      <div className="footerContainer">
        <p>Data Source:</p>
        <a href="https://www.tvmaze.com/api">
          <img className="tvmazeLogo" src={tvmazeLogo} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
