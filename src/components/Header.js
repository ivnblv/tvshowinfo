import React, { Component } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

class Header extends Component {
  render() {
    return (
      <header className="highlight">
        <div className="headerContainer">
          <Link to="/" className="indexBtn">
            <i style={{ color: "white" }} className="fas fa-tv fa-lg" />
          </Link>
          <Searchbar />
        </div>
      </header>
    );
  }

  toggleMobile = () => {
    const element = document.getElementById("searchboxMobile");
    element.style.display === "none"
      ? (element.style.display = "grid")
      : (element.style.display = "none");
  };
}

export default Header;
