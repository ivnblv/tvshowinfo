import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Episodes from "./Episodes";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { getSeasons } from "../routines";
import noImage from "../img/noImage.png";

class Seasons extends Component {
  componentDidMount() {
    this.props.getSeasons(
      `http://api.tvmaze.com/shows/${
        this.props.match.params.id
      }?embed[]=seasons`
    );
  }
  render() {
    const { name, image, id, _embedded } = this.props.seasons;
    // const {seasons} = this.props.seasons._embedded;
    return (
      <React.Fragment>
        {!this.props.fetchingSeasons &&
        Object.keys(this.props.seasons).length > 0 ? (
          <div className="container seasons secondaryBg">
            <div className="seasonsShowInfo">
              <Link to={`/show/${id}`}>
                <h2>{name}</h2>
              </Link>

              {image !== null ? (
                <img className="seasonsPoster" src={image.medium} />
              ) : (
                <img src={noImage} />
              )}

              <select
                className="seasonSelect"
                value={Number(this.props.match.params.seasonNumber)}
                onChange={this.seasonSelect}
              >
                {_embedded.seasons.map(season => (
                  <option
                    value={Number(season.number)}
                    data-seasonId={season.id}
                  >{`Season ${season.number}`}</option>
                ))}
              </select>
            </div>

            <Episodes
              seasonNumber={Number(this.props.match.params.seasonNumber)}
              showId={this.props.match.params.id}
              seasonid={
                _embedded.seasons.find(
                  x => x.number == this.props.match.params.seasonNumber
                ).id
              }
            />
          </div>
        ) : (
          <div className="loader">
            <Loader type="Oval" color="#4E5E7C" height="50" width="50" />
          </div>
        )}
      </React.Fragment>
    );
  }
  seasonSelect = e => {
    this.props.history.push(`${e.target.value}`);
  };
}

const mapStateToProps = state => ({
  // show: state.show.data
  seasons: state.show.seasons,
  fetchingSeasons: state.show.fetchingSeasons
});
export default connect(
  mapStateToProps,
  { getSeasons }
)(Seasons);
