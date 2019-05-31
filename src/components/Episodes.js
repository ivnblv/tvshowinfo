import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEpisodes } from "../routines";
import Loader from "react-loader-spinner";

class Episodes extends Component {
  componentDidMount() {
    // this.props.getEpisodes(`http://api.tvmaze.com/shows/${this.props.showId}/episodes`);
    this.props.getEpisodes(
      `http://api.tvmaze.com/seasons/${this.props.seasonid}/episodes`
    );
    console.log("EPISODES MOUNT");
  }
  componentDidUpdate(prevProps) {
    if (this.props.seasonid !== prevProps.seasonid) {
      this.props.getEpisodes(
        `http://api.tvmaze.com/seasons/${this.props.seasonid}/episodes`
      );
      console.log("new props");
    }
  }
  render() {
    return (
      <div className="episodes">
        {!this.props.fetchingEpisodes && this.props.episodes.length > 0 ? (
          <React.Fragment>
            <ul>
              {this.props.episodes.map(episode => {
                const {
                  number,
                  name,
                  season,
                  summary,
                  airdate,
                  image
                } = episode;
                return (
                  <div className="episode lightBg">
                    <h4>{name}</h4>
                    {image !== null ? <img src={image.medium} /> : null}
                    <p>
                      Season {season} Episode {number}
                    </p>
                    <p>Air Date: {airdate}</p>
                    <p dangerouslySetInnerHTML={{ __html: summary }} />
                  </div>
                );
              })}
            </ul>
          </React.Fragment>
        ) : this.props.fetchingEpisodes ? (
          <div className="innerLoader">
            <Loader type="Oval" color="#4E5E7C" height="50" width="50" />
          </div>
        ) : (
          <h4 style={{ alignSelf: "center" }}>No episode data available</h4>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  episodes: state.show.episodes,
  fetchingEpisodes: state.show.fetchingEpisodes
});
export default connect(
  mapStateToProps,
  { getEpisodes }
)(Episodes);
