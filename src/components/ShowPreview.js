import React, { Component } from "react";
import { Link } from "react-router-dom";
import EpisodePreview from "./EpisodePreview";
import noImage from "../img/noImage.png";

class ShowPreview extends Component {
  render() {
    const {
      id,
      type,
      name,
      rating,
      genres,
      image,
      summary
    } = this.props.scheduleItem.show;
    return (
      <div className="showPreview secondaryBg">
        <div className="showPreviewMainInfo">
          <Link to={`/show/${id}`}>
            <h1 className="showPreviewTitle">{name}</h1>
          </Link>
          <p className="rating">
            <i className="fas fa-star fa-lg" style={{ color: "#4E5E7C" }} />{" "}
            {rating.average}
          </p>
        </div>
        <div className="previewContainer">
          <div className="previewImage">
            {image !== null ? (
              <img
                className="showPreviewPoster"
                src={image.medium}
                alt="poster"
              />
            ) : (
              <img src={noImage} />
            )}
          </div>
          <div className="previewInfo">
            <div className="showInfo">
              <h4>{type}</h4>
              <ul className="genres">
                {genres.map((genre, i) => (
                  <li key={i}>{genre}</li>
                ))}
              </ul>
              <h5>Summary:</h5>
              <p
                className="previewSummary"
                dangerouslySetInnerHTML={{ __html: summary }}
              />
            </div>
            <EpisodePreview episode={this.props.scheduleItem} />
          </div>
        </div>
      </div>
    );
  }
}

export default ShowPreview;
