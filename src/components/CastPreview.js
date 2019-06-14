import React, { Component } from "react";
import { Link } from "react-router-dom";
import noImage from "../img/noImage.png";

class CastPreview extends Component {
  render() {
    return (
      <div
        className="container castPreview"
        style={{ padding: "0", marginTop: ".5rem" }}
      >
        <h3>Cast:</h3>
        <ul className="nthLi castUl">
          {this.props.cast.slice(0, 7).map((name, i) => {
            const { person, character } = name;
            return (
              <li className="castMember" key={`${person.id}${i}`}>
                <Link to={`/name/${person.id}`}>
                  <div className="castPerson">
                    {person.image !== null ? (
                      <img
                        className="castImage imgSmall"
                        src={person.image.medium}
                        alt=""
                      />
                    ) : (
                      <img src={noImage} alt="" className="imgSmall" />
                    )}
                    <p className="castName">{person.name}</p>
                  </div>
                </Link>
                <div className="castCharacter">
                  <p>{character.name}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <Link to={`/show/${this.props.id}/cast&crew`}>
          <button className="btn darkBg">Full Cast & Crew</button>
        </Link>
      </div>
    );
  }
}

export default CastPreview;
