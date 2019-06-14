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
      `https://api.tvmaze.com/shows/${
        this.props.match.params.id
      }?embed[]=seasons`
    );
  }
  render() {
    const { name, image, id, _embedded } = this.props.seasons;

    return (
      <React.Fragment>
        {!this.props.fetchingSeasons &&
        Object.keys(this.props.seasons).length > 0 &&
        id === Number(this.props.match.params.id) ? (
          <div className="container seasons secondaryBg">
            <div className="seasonsShowInfo">
              <Link to={`/show/${id}`}>
                <h2>{name}</h2>
              </Link>

              {image !== null ? (
                <img
                  className="seasonsPoster posterImg"
                  src={image.medium}
                  alt=""
                />
              ) : (
                <img src={noImage} alt="" />
              )}
              <div className="selectContainer">
                <select
                  className="seasonSelect selectDark"
                  value={Number(this.props.match.params.seasonNumber)}
                  onChange={this.seasonSelect}
                >
                  {_embedded.seasons.map(season => (
                    <option
                      key={season.number}
                      value={Number(season.number)}
                      data-seasonid={season.id}
                    >{`Season ${season.number}`}</option>
                  ))}
                </select>
              </div>
            </div>

            <Episodes
              seasonNumber={Number(this.props.match.params.seasonNumber)}
              showId={this.props.match.params.id}
              seasonid={
                _embedded.seasons.find(
                  x => x.number === Number(this.props.match.params.seasonNumber)
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
Seasons.propTypes = {
  seasons: PropTypes.object.isRequired,
  fetchingSeasons: PropTypes.bool.isRequired,
  getSeasons: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  seasons: state.show.seasons,
  fetchingSeasons: state.show.fetchingSeasons
});
export default connect(
  mapStateToProps,
  { getSeasons }
)(Seasons);
