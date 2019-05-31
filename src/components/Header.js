import React, { Component } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

class Header extends Component {
  render() {
    return (
      <header className="highlight">
        <div className="headerContainer">
          {/* <div className="headerBtns"> */}
          <Link to="/tvshowinfo/" className="indexBtn">
            <i style={{ color: "white" }} class="fas fa-tv fa-lg" />
          </Link>
          {/* <button className="mobileBtn" onClick={this.toggleMobile}>
              <i style={{ color: "4E5E7C" }} class="fas fa-search fa-lg" />
            </button>
          </div> */}
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
