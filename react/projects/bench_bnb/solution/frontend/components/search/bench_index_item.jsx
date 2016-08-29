import React from 'react';
import { hashHistory } from 'react-router';

class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const benchID = this.props.bench.id;
    hashHistory.push("benches/" + benchID );
  }

  render() {
    const bench = this.props.bench;
    return (
      <div className="bench-index-item"
           onClick={this.handleClick}>
        <div className="index-item-info">
          <span className="index-item-category">Rating: </span>
          <span className="index-item-copy">
            {bench.average_rating || "No reviews yet"}
          </span>
          <span className="index-item-category">Number of Likes: </span>
          <span className="index-item-copy">
          {/*TODO remove the  || 0 below*/}
            {/*{bench.favorite_users.length || 0 }*/}
          </span>
          <span className="index-item-category">Description: </span>
          <span className="index-item-copy">
            {bench.description}
          </span>
        </div>
        <img src={bench.picture_url}/>
      </div>
    );
  }
}

export default IndexItem;
