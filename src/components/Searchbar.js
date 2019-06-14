import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { liveSearch, clearSearch } from "../routines";
import Loader from "react-loader-spinner";
import noImage from "../img/noImage.png";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Searchbar extends Component {
  state = {
    query: "",
    type: "all",
    lastEntry: 0,
    displayAmount: 15,
    lockResults: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.resultDisplay("hidden");
    }
    // fetching data after user input + set interval
    if (this.state.lastEntry === 2 && this.state.query.length > 0) {
      const { type, query } = this.state;
      if (type === "shows") {
        this.props.clearSearch([]);
        this.props.liveSearch(`https://api.tvmaze.com/search/shows?q=${query}`);
      } else if (type === "names") {
        this.props.clearSearch([]);
        this.props.liveSearch(
          `https://api.tvmaze.com/search/people?q=${query}`
        );
      } else if (type === "all") {
        this.props.clearSearch([]);
        this.props.liveSearch(`https://api.tvmaze.com/search/shows?q=${query}`);
        this.props.liveSearch(
          `https://api.tvmaze.com/search/people?q=${query}`
        );
      }
      // resetting last input counter and stopping timer
      this.setState({
        lastEntry: 0
      });
      clearInterval(this.interval);
    } else if (this.state.lastEntry > 2) {
      this.setState({
        lastEntry: 0
      });
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="searchbars">
          <div className="searchbar">
            <form className="searchbarInput">
              <input
                onChange={this.handleInput}
                onFocus={() => this.resultDisplay("visible")}
                onBlur={() => this.resultDisplay("hidden")}
                value={this.state.query}
                type="text"
                placeholder="Search..."
              />
              <select className="selectLight" onChange={this.selectType}>
                <option value="all">All</option>
                <option value="shows">Shows</option>
                <option value="names">Names</option>
              </select>
              <button
                onClick={this.searchRedirect}
                className="lightBg lightHover"
              >
                <i
                  style={{ color: "4E5E7C" }}
                  className="fas fa-search fa-lg"
                />
              </button>
            </form>
          </div>

          <div className="searchbarMobile">
            <button className="btnToggle" onClick={this.toggleMobile}>
              <i style={{ color: "4E5E7C" }} className="fas fa-search fa-2x" />
            </button>

            <form
              className="searchbarInput"
              id="searchbarMobileInput"
              style={{ display: "none" }}
            >
              <input
                onFocus={() => this.resultDisplay("visible")}
                onBlur={() => this.resultDisplay("hidden")}
                onChange={this.handleInput}
                value={this.state.query}
                type="text"
                placeholder="Search..."
              />
              <select onChange={this.selectType} className="selectLight">
                <option value="all">All</option>
                <option value="shows">Shows</option>
                <option value="names">Names</option>
              </select>
              <button onClick={this.searchRedirect} className="lightHover">
                Search
              </button>
            </form>
          </div>
          <div id="results" className="searchResults darkBg">
            {this.props.searchResult.length > 0 ? (
              <React.Fragment>
                {this.resultRender(this.props.searchResult)}
                <button
                  className="btn"
                  onClick={this.searchRedirect}
                  onMouseDown={() => this.lockResults(true)}
                  onMouseUp={() => this.lockResults(false)}
                >
                  All search results
                </button>
              </React.Fragment>
            ) : this.props.fetching ? (
              <div className="innerLoader ">
                <Loader type="Oval" color="#4E5E7C" height="25" width="25" />
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
  searchRedirect = e => {
    e.preventDefault();
    const { type, query } = this.state;
    this.props.history.replace(`/search/${type}&${query}`);
  };
  resultRender = arr => {
    return (
      <ul>
        {arr
          .sort((a, b) => b.score - a.score)
          .slice(0, this.state.displayAmount)
          .map(item => {
            // checks if data relates to a person or a show
            const type = Object.keys(item)[1];
            return (
              <li key={item[type].id}>
                <Link
                  onMouseDown={() => this.lockResults(true)}
                  onMouseUp={() => this.lockResults(false)}
                  to={`/${type === "person" ? "name" : "show"}/${
                    item[type].id
                  }`}
                >
                  <div className="liveSearchItem darkBg">
                    {item[type].image !== null ? (
                      <img
                        className="liveSearchImg"
                        src={item[type].image.medium}
                        alt=""
                      />
                    ) : (
                      <img className="liveSearchImg" src={noImage} alt="" />
                    )}
                    <p>
                      {item[type].name}
                      <span style={{ marginLeft: ".15rem" }}>
                        {item[type].premiered !== undefined &&
                        item[type].premiered !== null
                          ? `(${item[type].premiered.slice(0, 4)})`
                          : null}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    );
  };
  toggleMobile = () => {
    const element = document.getElementById("searchbarMobileInput");
    element.style.display === "none"
      ? (element.style.display = "block")
      : (element.style.display = "none");
  };
  lockResults = bool => {
    this.setState({
      lockResults: bool
    });
  };

  resultDisplay = visibility => {
    if (!this.state.lockResults) {
      document.getElementById("results").style.visibility = visibility;
    }
  };

  handleInput = e => {
    this.setState({
      query: e.target.value,
      lastEntry: 0
    });
    clearInterval(this.interval);
    // starts timer after user input
    this.interval = setInterval(this.count, 1000);
  };
  count = () => {
    if (this.state.lastEntry <= 2) {
      this.setState({
        lastEntry: this.state.lastEntry + 1
      });
    } else {
      clearInterval(this.interval);
      this.setState({
        lastEntry: 0
      });
    }
  };

  selectType = e => {
    this.setState({
      type: e.target.value
    });
  };
}
Searchbar.propTypes = {
  searchResult: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  liveSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  searchResult: state.searchbar.result,
  fetching: state.searchbar.searchbarFetching
});
export default connect(
  mapStateToProps,
  { liveSearch, clearSearch }
)(withRouter(Searchbar));
