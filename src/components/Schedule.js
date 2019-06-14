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
    this.props.getSchedule("https://api.tvmaze.com/schedule");
  }

  render() {
    const { schedule } = this.props;
    return (
      <React.Fragment>
        {!this.props.loading && Object.keys(this.props.schedule).length > 0 ? (
          <div className="container secondaryBg">
            <div className="schedule">
              <h2>Airing Today:</h2>
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

  showMore = () => {
    this.setState({ display: this.state.display + 10 });
  };
}

Schedule.propTypes = {
  schedule: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  getSchedule: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  schedule: state.schedule.data,
  loading: state.schedule.loading
});

export default connect(
  mapStateToProps,
  { getSchedule }
)(Schedule);
