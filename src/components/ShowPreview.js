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
      <div className="showPreview lightBg">
        <div className="showPreviewMainInfo">
          <Link to={`/show/${id}`}>
            <h2 className="showPreviewTitle">{name}</h2>
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
                className="showPreviewPoster posterImg"
                src={image.medium}
                alt=""
              />
            ) : (
              <img src={noImage} alt="" />
            )}
          </div>
          <div className="previewInfo">
            <div className="showInfo">
              <h4>{type}</h4>
              <ul className="genres">
                {genres.map(genre => (
                  <li key={genre}>{genre}</li>
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
