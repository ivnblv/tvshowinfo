import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ShowPreview from "./ShowPreview";
import Loader from "react-loader-spinner";
import { getSchedule } from "../routines";

class Schedule extends Component {
  state = {
    display: 10
  };
  componentDidMount() {
    // this.props.getSchedule();
    this.props.getSchedule("https://api.tvmaze.com/schedule");
  }
  presentGenres = [];
  render() {
    const { schedule } = this.props;
    return (
      <React.Fragment>
        {!this.props.loading && Object.keys(this.props.schedule).length > 0 ? (
          <div className="container secondaryBg">
            <div className="schedule">
              <h2 style={{ color: "black" }}>Airing Today:</h2>
              {schedule
                .sort(function(a, b) {
                  if (a.show.rating.average > b.show.rating.average) {
                    return -1;
                  } else if (a.show.rating.average < b.show.rating.average) {
                    return 1;
                  } else return 0;
                })
                .filter((x, i) => i < this.state.display)
                .map(x => (
                  <ShowPreview key={x.id} scheduleItem={x} />
                ))}

              {this.state.display < schedule.length ? (
                <button
                  style={{ marginBottom: ".5rem" }}
                  className="btn secondaryBg"
                  onClick={this.showMore}
                >
                  Show More
                </button>
              ) : null}
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
  test = () => {
    console.log(this.presentGenres);
  };
  getUniqueGenres = () => {
    console.log("genres");
    const genres = [];
    this.props.schedule.map(item => {
      genres.push(...item.show.genres);
    });
    const unique = [...new Set(genres)];
    return unique;
  };
  showMore = () => {
    this.setState({ display: this.state.display + 10 });
  };

  filterGenres = e => {
    const arr = this.presentGenres;
    const value = e.target.value;
    arr.includes(value) ? arr.splice(arr.indexOf(value), 1) : arr.push(value);

    console.log(this.presentGenres);
  };
  filterArr = arr => {
    // const filtered = arr.filter(x=>!this.presentGenres.includes(x.show.genres));
    const filtered = arr.filter(
      x => !this.presentGenres.includes(x.show.genres)
    );
    console.log(filtered);
    return filtered;
  };
}

Schedule.propTypes = {
  schedule: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  schedule: state.schedule.data,
  loading: state.schedule.loading
});

export default connect(
  mapStateToProps,
  { getSchedule }
)(Schedule);
