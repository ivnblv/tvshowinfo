import React, { Component } from "react";

import { connect } from "react-redux";
import noImage from "../img/noImage.png";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { searchShows, searchNames } from "../routines";

class SearchResult extends Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    const { query, type } = this.props.match.params;

    if (
      query !== prevProps.match.params.query ||
      type !== prevProps.match.params.type
    ) {
      this.fetchData();
    }
  }

  render() {
    const { query, type } = this.props.match.params;
    return (
      <React.Fragment>
        {this.props.fetchingShows || this.props.fetchingNames ? (
          <div className="loader">
            <Loader type="Oval" color="#4E5E7C" height="50" width="50" />
          </div>
        ) : (
          <div className="container secondaryBg">
            <p className="searchQuery">
              Search results for <b>{`"${query}"`}</b>
            </p>
            <div className="searchResultItems">
              {type === "shows" || type === "all" ? (
                <div className="searchContainer">
                  <h4>Shows:</h4>
                  {this.props.shows.map(show => (
                    <Link to={`/show/${show.show.id}`}>
                      <div className="searchResultItem darkBg">
                        {show.show.image !== null ? (
                          <img src={show.show.image.medium} />
                        ) : (
                          <img src={noImage} />
                        )}
                        <p>
                          {`${show.show.name}`}
                          {show.show.premiered !== null
                            ? `(${show.show.premiered.slice(0, 4)})`
                            : null}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}

              {type === "all" || type === "names" ? (
                <div className="searchContainer">
                  <h4>Names:</h4>
                  {this.props.names.map(name => (
                    <Link to={`/name/${name.person.id}`}>
                      <div className="searchResultItem darkBg">
                        {name.person.image == null ? (
                          <img src={noImage} />
                        ) : (
                          <img src={name.person.image.medium} />
                        )}
                        <p>{name.person.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
  searchResultItem = arr => {
    arr.map(show => {
      const { name, premiered, image } = show.show;
      return (
        <li>
          <div className="searchResultItem darkBg">
            {/* <img src = {image.medium}/> */}
          </div>
        </li>
      );
    });
  };
  fetchData = () => {
    const { type, query } = this.props.match.params;
    if (type === "all") {
      this.props.searchShows(`http://api.tvmaze.com/search/shows?q=${query}`);
      this.props.searchNames(`http://api.tvmaze.com/search/people?q=${query}`);
    } else if (type === "shows") {
      this.props.searchShows(`http://api.tvmaze.com/search/shows?q=${query}`);
    } else if (type === "names") {
      this.props.searchNames(`http://api.tvmaze.com/search/people?q=${query}`);
    } else return null;
  };
}

const mapStateToProps = state => ({
  shows: state.search.shows,
  names: state.search.names,
  fetchingShows: state.search.fetchingShows,
  fetchingNames: state.search.fetchingNames
});
export default connect(
  mapStateToProps,
  { searchShows, searchNames }
)(SearchResult);
