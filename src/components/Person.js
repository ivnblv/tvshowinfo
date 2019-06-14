import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { getPerson, getCastCredits, getCrewCredits } from "../routines";
import noImage from "../img/noImage.png";
import PropTypes from "prop-types";

class Person extends Component {
  componentDidMount() {
    this.props.getPerson(
      `https://api.tvmaze.com/people/${this.props.match.params.id}`
    );
    this.props.getCastCredits(
      `https://api.tvmaze.com/people/${
        this.props.match.params.id
      }/castcredits?embed=show`
    );
    this.props.getCrewCredits(
      `https://api.tvmaze.com/people/${
        this.props.match.params.id
      }/crewcredits?embed=show`
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getPerson(
        `https://api.tvmaze.com/people/${this.props.match.params.id}`
      );
      this.props.getCastCredits(
        `https://api.tvmaze.com/people/${
          this.props.match.params.id
        }/castcredits?embed=show`
      );
      this.props.getCrewCredits(
        `https://api.tvmaze.com/people/${
          this.props.match.params.id
        }/crewcredits?embed=show`
      );
    }
  }

  render() {
    const {
      name,
      image,
      birthday,
      deathday,
      country,
      gender
    } = this.props.person;

    return (
      <React.Fragment>
        {!this.props.fetchingCast &&
        !this.props.fetchingPerson &&
        !this.props.fetchingCrew &&
        Object.keys(this.props.person).length > 0 ? (
          <div className="container secondaryBg">
            <h2 className="personName">{name}</h2>
            <div className="person">
              <div className="personInfo">
                {image !== null && image !== undefined ? (
                  <img src={image.medium} alt="" className="posterImg" />
                ) : (
                  <img src={noImage} alt="" className="posterImg" />
                )}
                <p>Born: {birthday}</p>
                {deathday ? <p>Died: {deathday}</p> : null}
                {country !== null ? <p>Country: {country.name}</p> : null}
              </div>
              <div className="personCredits">
                {this.props.castCredits.length < 1 ? null : (
                  <div className="castCredits">
                    <h3>{gender === "Male" ? "Actor:" : "Actress:"}</h3>
                    <ul>
                      {this.props.castCredits.map(castCredit => {
                        const {
                          id,
                          name,
                          premiered
                        } = castCredit._embedded.show;
                        return (
                          <li className="personRole" key={id}>
                            <p>
                              <Link to={`/show/${id}`}>
                                {`${name}`}
                                {premiered == null
                                  ? null
                                  : `(${premiered.slice(0, 4)})`}
                              </Link>
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {this.props.crewCredits.length < 1 ? null : (
                  <div className="crewCredits">
                    {this.crewCredit(this.props.crewCredits)}
                  </div>
                )}
              </div>
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

  crewCredit = arr => {
    const credit = arr.map(crewCredit => crewCredit.type);
    const unique = Array.from(new Set(credit));

    return unique.map(x => (
      <div className="crewCredit" key={x}>
        <h3>{x}:</h3>
        <ul>
          {arr
            .filter(i => i.type === x)
            .map(show => {
              const { id, name, premiered } = show._embedded.show;
              return (
                <li className="personRole" key={id}>
                  <p>
                    <Link to={`/show/${id}`}>
                      {`${name}`}
                      {premiered !== null ? `(${premiered.slice(0, 4)})` : null}
                    </Link>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    ));
  };
}
Person.propTypes = {
  person: PropTypes.object.isRequired,
  castCredits: PropTypes.array.isRequired,
  crewCredits: PropTypes.array.isRequired,
  fetchingCast: PropTypes.bool.isRequired,
  fetchingCrew: PropTypes.bool.isRequired,
  fetchingPerson: PropTypes.bool.isRequired,
  getPerson: PropTypes.func.isRequired,
  getCastCredits: PropTypes.func.isRequired,
  getCrewCredits: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  person: state.names.person,
  castCredits: state.names.castCredits,
  crewCredits: state.names.crewCredits,
  fetchingCast: state.names.fetchingCast,
  fetchingCrew: state.names.fetchingCrew,
  fetchingPerson: state.names.fetchingPerson
});

export default connect(
  mapStateToProps,
  { getPerson, getCastCredits, getCrewCredits }
)(Person);
