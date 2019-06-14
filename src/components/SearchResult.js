import React, { Component } from "react";

import { connect } from "react-redux";
import noImage from "../img/noImage.png";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { searchShows, searchNames } from "../routines";
import PropTypes from "prop-types";

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
                  {this.props.shows.map(show => {
                    const { id, name, image, premiered } = show.show;
                    return (
                      <Link to={`/show/${id}`} key={id}>
                        <div className="searchResultItem darkBg">
                          {image !== null ? (
                            <img src={image.medium} alt="" />
                          ) : (
                            <img src={noImage} alt="" />
                          )}
                          <p>
                            {`${name}`}
                            {premiered !== null
                              ? `(${premiered.slice(0, 4)})`
                              : null}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}

              {type === "all" || type === "names" ? (
                <div className="searchContainer">
                  <h4>Names:</h4>
                  {this.props.names.map(x => {
                    const { id, image, name } = x.person;
                    return (
                      <Link to={`/name/${id}`} key={id}>
                        <div className="searchResultItem darkBg">
                          {image == null ? (
                            <img src={noImage} alt="" />
                          ) : (
                            <img src={image.medium} alt="" />
                          )}
                          <p>{name}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
  fetchData = () => {
    const { type, query } = this.props.match.params;
    if (type === "all") {
      this.props.searchShows(`https://api.tvmaze.com/search/shows?q=${query}`);
      this.props.searchNames(`https://api.tvmaze.com/search/people?q=${query}`);
    } else if (type === "shows") {
      this.props.searchShows(`https://api.tvmaze.com/search/shows?q=${query}`);
    } else if (type === "names") {
      this.props.searchNames(`https://api.tvmaze.com/search/people?q=${query}`);
    } else return null;
  };
}
SearchResult.propTypes = {
  shows: PropTypes.array.isRequired,
  names: PropTypes.array.isRequired,
  fetchingShows: PropTypes.bool.isRequired,
  fetchingNames: PropTypes.bool.isRequired,
  searchShows: PropTypes.func.isRequired,
  searchNames: PropTypes.func.isRequired
};

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
