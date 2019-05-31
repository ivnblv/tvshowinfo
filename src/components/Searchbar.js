import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import {searchShow} from '../actions/searchActions';
import {
  liveSearchNames,
  liveSearchShows,
  liveSearch,
  clearSearch
} from "../routines";
import Loader from "react-loader-spinner";
import placeholderPhoto from "../img/placeholderPhoto.png";
import noImage from "../img/noImage.png";
import { withRouter } from "react-router-dom";

class Searchbar extends Component {
  state = {
    query: "",
    type: "all",
    lastEntry: 0,
    displayAmount: 15,
    lockResults: false
  };

  componentDidUpdate() {
    if (this.state.lastEntry === 2 && this.state.query.length > 0) {
      console.log("fetch here");
      const { type, query } = this.state;

      // if (type === "shows") {
      //   this.props.liveSearchShows(
      //     `http://api.tvmaze.com/search/shows?q=${query}`
      //   );
      // } else if (type === "names") {
      //   this.props.liveSearchNames(
      //     `http://api.tvmaze.com/search/people?q=${query}`
      //   );
      // } else if (type === "all") {
      //   this.props.liveSearchNames(
      //     `http://api.tvmaze.com/search/people?q=${query}`
      //   );
      //   this.props.liveSearchShows(
      //     `http://api.tvmaze.com/search/shows?q=${query}`
      //   );
      // }
      // this.props.liveSearch(`http://api.tvmaze.com/search/shows?q=${query}`);
      if (type === "shows") {
        this.props.clearSearch([]);
        this.props.liveSearch(`http://api.tvmaze.com/search/shows?q=${query}`);
      } else if (type === "names") {
        this.props.clearSearch([]);
        this.props.liveSearch(`http://api.tvmaze.com/search/people?q=${query}`);
      } else if (type === "all") {
        this.props.clearSearch([]);
        this.props.liveSearch(`http://api.tvmaze.com/search/shows?q=${query}`);
        this.props.liveSearch(`http://api.tvmaze.com/search/people?q=${query}`);
      }

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
    const { type } = this.state;
    return (
      <React.Fragment>
        {/* onBlur={() => this.resultDisplay("none")} */}
        <div className="searchbars">
          <div className="searchbar">
            <form className="searchbarInput">
              <input
                onChange={this.handleInput}
                onFocus={() => this.resultDisplay("block")}
                onBlur={() => this.resultDisplay("none")}
                value={this.state.query}
                type="text"
                placeholder="Search..."
              />
              <select onChange={this.selectType}>
                <option value="all">All</option>
                <option value="shows">Shows</option>
                <option value="names">Names</option>
              </select>
              <button onClick={this.searchRedirect}>
                <i style={{ color: "4E5E7C" }} class="fas fa-search fa-lg" />
              </button>
            </form>
          </div>

          <div className="searchbarMobile">
            <button className="btnToggle" onClick={this.toggleMobile}>
              <i style={{ color: "4E5E7C" }} class="fas fa-search fa-2x" />
            </button>

            <form className="searchbarInput" id="searchbarMobileInput">
              <input
                onFocus={() => this.resultDisplay("block")}
                onBlur={() => this.resultDisplay("none")}
                onChange={this.handleInput}
                value={this.state.query}
                type="text"
                placeholder="Search..."
              />
              <select onChange={this.selectType}>
                <option value="all">All</option>
                <option value="shows">Shows</option>
                <option value="names">Names</option>
              </select>
              <button onClick={this.searchRedirect}>Search</button>
            </form>
          </div>
          <div id="results" className="searchResults secondaryBg">
            {this.props.names.length > 0 || this.props.shows.length > 0 ? (
              <React.Fragment>
                {/* {type === "shows"
                  ? this.resultRender(this.props.shows)
                  : type === "names"
                  ? this.resultRender(this.props.names)
                  : this.resultRender([
                      ...this.props.shows.slice(
                        0,
                        this.state.displayAmount / 2
                      ),
                      ...this.props.names.slice(0, this.state.displayAmount / 2)
                    ])} */}
                {this.resultRender(this.props.shows)}

                <button
                  className="btn"
                  onClick={this.searchRedirect}
                  onMouseEnter={() => this.lockResults(true)}
                  onMouseOut={() => this.lockResults(false)}
                >
                  All search results
                </button>

                {/* <a
                  onMouseEnter={() => this.lockResults(true)}
                  onMouseOut={() => this.lockResults(false)}
                  href="#"
                >
                  Test
                </a> */}
              </React.Fragment>
            ) : this.props.fetching ? (
              <div className="innerLoader">
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
          // .filter((x, i) => i < this.state.displayAmount)
          .slice(0, this.state.displayAmount)
          .map(item => {
            const type = Object.keys(item)[1];
            console.log(
              `/${type === "person" ? "name" : "show"}/${item[type].id}`
            );

            return (
              <li>
                <Link
                  to={`/${type === "person" ? "name" : "show"}/${
                    item[type].id
                  }`}
                  onMouseEnter={() => this.lockResults(true)}
                  onMouseOut={() => this.lockResults(false)}
                >
                  <div className="liveSearchItem secondaryBg">
                    {item[type].image !== null ? (
                      <img
                        className="liveSearchImg"
                        src={item[type].image.medium}
                      />
                    ) : (
                      <img className="liveSearchImg" src={noImage} />
                    )}
                    <p>
                      {item[type].name}
                      {item[type].premiered !== undefined &&
                      item[type].premiered !== null
                        ? `(${item[type].premiered.slice(0, 4)})`
                        : null}
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
  lockResults = b => {
    console.log(b);
    this.setState({
      lockResults: b
    });
  };

  resultDisplay = display => {
    const { liveSearchNames, liveSearchShows } = this.props;
    if (!this.state.lockResults) {
      document.getElementById("results").style.display = display;
    }
    console.log("123");
  };

  handleInput = e => {
    this.setState({
      query: e.target.value,
      lastEntry: 0
    });
    clearInterval(this.interval);
    this.interval = setInterval(this.count, 1000);
  };
  count = () => {
    console.log("count");
    if (this.state.lastEntry < 3) {
      this.setState({
        lastEntry: this.state.lastEntry + 1
      });
    } else {
      this.setState({
        lastEntry: 0
      });
      clearInterval(this.test);
    }
  };

  selectType = e => {
    this.setState({
      type: e.target.value
    });
  };
}

const mapStateToProps = state => ({
  // shows: state.searchbar.shows,
  names: state.searchbar.names,
  fetchingShows: state.searchbar.fetchingShows,
  fetchingNames: state.searchbar.fetchingNames,
  shows: state.searchbar.result,
  fetching: state.searchbar.searchbarFetching
});
export default connect(
  mapStateToProps,
  { liveSearchShows, liveSearchNames, liveSearch, clearSearch }
)(withRouter(Searchbar));
