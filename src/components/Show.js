import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CastPreview from "./CastPreview";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { getShow } from "../routines";
import noImage from "../img/noImage.png";
class Show extends Component {
  componentDidMount() {
    this.props.getShow(
      `https://api.tvmaze.com/shows/${
        this.props.match.params.id
      }?embed[]=seasons&embed[]=cast`
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getShow(
        `https://api.tvmaze.com/shows/${
          this.props.match.params.id
        }?embed[]=seasons&embed[]=cast`
      );
    }
  }

  render() {
    const {
      id,
      name,
      type,
      genres,
      status,
      runtime,
      premiered,
      rating,
      schedule,
      network,
      image,
      summary,
      officialSite,
      language,
      _embedded
    } = this.props.show;

    return (
      <React.Fragment>
        {!this.props.fetchingShow && Object.keys(this.props.show).length > 0 ? (
          <div className="container secondaryBg">
            <div className="show">
              <div className="showHeader">
                <h2 className="showTitle">{name}</h2>
                <p className="rating">
                  <i
                    style={{ color: "#4E5E7C" }}
                    className="fas fa-star fa-lg"
                  />
                  {rating.average}
                </p>
              </div>

              <div className="poster">
                {image !== null ? (
                  <img src={image.medium} className="posterImg" alt="" />
                ) : (
                  <img src={noImage} className="posterImg" alt="" />
                )}
              </div>

              <div className="showInfo">
                <h4>Details:</h4>
                <ul>
                  <li>Type: {type}</li>
                  <li>Status: {status}</li>
                  <li>Genres: {genres.join(", ") || "n/a"}</li>
                  <li>Episodes: {this.countEpisodes(_embedded.seasons)}</li>
                  <li>Language: {language}</li>
                  <li>Runtime: {runtime}min</li>
                  <li>
                    Country: {network !== null ? network.country.name : null}
                  </li>
                  <li>Network: {network !== null ? network.name : null}</li>
                  <li>Premiered: {premiered}</li>
                  <li>
                    Broadcast: {schedule.days.join(" ")}
                    <span style={{ marginLeft: "5px" }}>{schedule.time}</span>
                  </li>
                  <li>
                    <a href={officialSite}>Official Website</a>
                  </li>
                </ul>
              </div>
              <div className="seasonList">
                <h4>Seasons:</h4>
                <ul>
                  {_embedded.seasons.map(season => (
                    <li key={season.id}>
                      <Link to={`/show/${id}/seasons/${season.number}`}>
                        {season.number}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="trailer">
                <div className="videoWrapper">
                  <iframe
                    title={`${name} trailer`}
                    // src={`https://www.youtube.com/embed?listType=search&list=${name}trailer`}
                    src={`https://www.youtube.com/embed?listType=search&list=${name}tvshowtrailer`}
                  />
                </div>
              </div>
              <div className="summary">
                <h4>Summary:</h4>
                <p
                  className="summaryText"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
              </div>

              <CastPreview cast={_embedded.cast} id={id} />
            </div>
          </div>
        ) : (
          <div className="loader">
            <Loader type="Oval" color="#4E5E7C" height="50" width="50" />
          </div>
        )}
      </React.Fragment>
    );
  }
  countEpisodes = arr => {
    const amount = arr.reduce((total, x) => (total += x.episodeOrder), 0);
    if (amount > 0) {
      return amount;
    } else return "n/a";
  };
}
Show.propTypes = {
  show: PropTypes.object.isRequired,
  fetchingShow: PropTypes.bool.isRequired,
  getShow: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  show: state.show.data,
  fetchingShow: state.show.fetchingShow
});
export default connect(
  mapStateToProps,
  { getShow }
)(Show);
