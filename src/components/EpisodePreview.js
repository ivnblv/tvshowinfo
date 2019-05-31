import React, { Component } from 'react';

class EpisodePreview extends Component {
  render() {
      const {name, season, number, airdate, airtime, summary} = this.props.episode;
    return (
      <div className = 'episodePreview'>
        
        <h4>{name}</h4>
        <p>Season {season} Episode {number}</p>  
        <p dangerouslySetInnerHTML={{__html:summary}}></p>     
        <p>Episode Air Time: {airdate}<span style = {{marginLeft: '.25rem'}}>{airtime}</span></p>
        
        
      </div>
    )
  }
}

export default EpisodePreview;
