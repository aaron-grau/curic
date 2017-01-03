import React, { Component } from 'react';

const giphyIndexItems = (giphys) => {
  if (giphys) {
    return giphys.map( (giphy, idx) => (
        <li key={idx} className='giphy-li'>
          <img src={giphy.images.fixed_height.url}/>
        </li>
      )
    );
  } else {
    return (
      <div></div>
    );
  }
};

class GiphysIndex extends Component {

  render() {
    const { giphys } = this.props;
    return (
      <div>
        <ul>
          { giphyIndexItems(giphys) }
        </ul>
      </div>
    );
  }
}

export default GiphysIndex;
