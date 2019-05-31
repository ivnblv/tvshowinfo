import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { getPerson, getCastCredits, getCrewCredits } from "../routines";

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

  render() {
    const { name, image, birthday, deathday, country } = this.props.person;

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
                  <img src={image.medium} className="posterImg" />
                ) : null}
                <p>Born: {birthday}</p>
                {deathday ? <p>Died: {deathday}</p> : null}
                {country !== null ? <p>Country: {country.name}</p> : null}
              </div>
              <div className="personCredits">
                {this.props.castCredits.length < 1 ? null : (
                  <div className="castCredits">
                    <h4>Actor:</h4>
                    <ul>
                      {this.props.castCredits.map(castCredit => {
                        const {
                          id,
                          name,
                          premiered
                        } = castCredit._embedded.show;
                        return (
                          <li className="personRole">
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
      <div className="crewCredit">
        <h4>{x}:</h4>
        <ul>
          {arr
            .filter(i => i.type == x)
            .map(show => {
              const { id, name, premiered } = show._embedded.show;
              return (
                <li className="personRole">
                  <p>
                    <Link to={`/tvshowinfo/show/${id}`}>
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
const mapStateToProps = state => ({
  person: state.people.person,
  castCredits: state.people.castCredits,
  crewCredits: state.people.crewCredits,
  fetchingCast: state.people.fetchingCast,
  fetchingCrew: state.people.fetchingCrew,
  fetchingPerson: state.people.fetchingPerson
});

export default connect(
  mapStateToProps,
  { getPerson, getCastCredits, getCrewCredits }
)(Person);
