import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCastCrew } from "../routines";
import Loader from "react-loader-spinner";
import noImage from "../img/noImage.png";
import PropTypes from "prop-types";
import { uniqBy } from "lodash";

class CastAndCrew extends Component {
  componentDidMount() {
    this.props.getCastCrew(
      `https://api.tvmaze.com/shows/${
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
                <img
                  src={image.medium}
                  alt=""
                  className="castCrewPoster posterImg"
                />
              ) : (
                <img
                  src={noImage}
                  alt=""
                  className="castCrewPoster posterImg"
                />
              )}
            </div>
            <div className="crew">
              <h3>Crew: </h3>
              {this.renderCrew(_embedded.crew)}
            </div>

            <div className="cast">
              <h3>Cast:</h3>
              <ul className="nthLi">
                {_embedded.cast.map((castMember, i) => {
                  const { person, character } = castMember;

                  return (
                    <li className="castLi" key={`castLi${person.id}${i}`}>
                      <Link to={`/name/${person.id}/`}>
                        <div className="castPerson">
                          {person.image !== null ? (
                            <img src={person.image.medium} alt="" />
                          ) : (
                            <img src={noImage} alt="" />
                          )}
                          <p>{person.name}</p>
                        </div>
                      </Link>
                      <div className="castCharacter">
                        <p>{character.name}</p>
                      </div>
                    </li>
                  );
                })}
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

  // groups crew members by their credit
  // crewCredit = arr => {
  //   const credit = arr.map(crewCredit => crewCredit.type);
  //   const unique = Array.from(new Set(credit));

  //   return (
  //     <ul className="nthLi">
  //       {unique.map(x => (
  //         <li key={`nthLi${x}`}>
  //           <h3>{x}</h3>
  //           {arr
  //             .filter(i => i.type == x)
  //             .map(crewMember => (
  //               <p key={`crewMember${crewMember.person.name}`}>
  //                 {crewMember.person.name}
  //               </p>
  //             ))}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  renderCrew = arr => {
    const crew = arr.map(crewCredit => [
      crewCredit.person.name,
      crewCredit.person.id
    ]);
    const unique = uniqBy(crew, x => x[1]);
    return (
      <ul className="nthLi">
        {unique.map(crewMember => (
          <li className="crewMember" key={crewMember[1]}>
            <p>
              <Link to={`/name/${crewMember[1]}`} className="crewName">
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
CastAndCrew.propTypes = {
  cast: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getCastCrew: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  cast: state.show.cast,
  fetching: state.show.fetchingCast
});
export default connect(
  mapStateToProps,
  { getCastCrew }
)(CastAndCrew);
