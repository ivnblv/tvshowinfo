import React, { Component } from "react";
import { connect } from "react-redux";
// import {getCast} from '../actions/showActions';
import { Link } from "react-router-dom";
import { getCastCrew } from "../routines";
import Loader from "react-loader-spinner";
import noImage from "../img/noImage.png";

class CastAndCrew extends Component {
  componentDidMount() {
    this.props.getCastCrew(
      `http://api.tvmaze.com/shows/${
        this.props.match.params.id
      }?embed[]=crew&embed[]=cast`
    );
  }

  render() {
    const { name, image, id, _embedded } = this.props.cast;

    return (
      <React.Fragment>
        {!this.props.fetching && Object.keys(this.props.cast).length > 0 ? (
          <div className="container castCrew secondaryBg">
            <div className="showInfo">
              <h2 className="castCrewTitle">
                <Link to={`/show/${id}`}>{name}</Link>
              </h2>
              {image !== null ? (
                <img src={image.medium} className="castCrewPoster" />
              ) : (
                <img src={noImage} />
              )}
            </div>
            <div className="crew">
              <h3>Crew: </h3>
              {this.test(_embedded.crew)}
            </div>

            <div className="cast">
              <h3>Cast:</h3>
              <ul className="nthLi">
                {_embedded.cast.map(castMember => {
                  const {person,character} = castMember;    
                  
                  
                  return(
                  <li className="castLi">
                    <Link to={`/name/${person.id}/`}>
                      <div className="castPerson">
                        {person.image !== null ? (
                          <img src={person.image.medium} />
                        ) : (
                          <img src={noImage} />
                        )}
                        <p>{person.name}</p>
                      </div>
                    </Link>
                    <div className="castCharacter">
                      <p>{character.name}</p>
                    </div>
                  </li>
                )})}
              </ul>
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
    const credit = arr.map(crewCredit => crewCredit.types);
    const unique = Array.from(new Set(credit));

    return (
      <ul className="nthLi">
        {unique.map(x => (
          <li>
            <h3>{x}</h3>
            {arr
              .filter(i => i.type == x)
              .map(crewMember => (
                // <Link to = {`/show/${show._embedded.show.id}`}><p>{show._embedded.show.name}</p></Link>
                <p>{crewMember.person.name}</p>
              ))}
          </li>
        ))}
      </ul>
    );
  };

  test = arr => {
    const crew = arr.map(crewCredit => [
      crewCredit.person.name,
      crewCredit.person.id
    ]);
    const unique = [];
    let temp;
    for (let i = 0; i < crew.length; i++) {
      if (crew[i][0] !== temp) {
        unique.push(crew[i]);
      }
      temp = crew[i][0];
    }
    return (
      <ul className="nthLi">
        {unique.map(crewMember => (
          <li className="crewMember">
            <p>
              <Link className="crewName" to={`/name/${crewMember[1]}`}>
                {crewMember[0]}
              </Link>
            </p>
            {
              <p className="crewType">
                {arr
                  .filter(x => x.person.name === crewMember[0])
                  .map(y => y.type)
                  .join(", ")}
              </p>
            }
          </li>
        ))}
      </ul>
    );
  };
}

const mapStateToProps = state => ({
  cast: state.show.cast,
  fetching: state.show.fetchingCast
});
export default connect(
  mapStateToProps,
  { getCastCrew }
)(CastAndCrew);
