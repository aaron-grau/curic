import React from 'react';
import {hashHistory} from 'react-router';

const IndexItem = React.createClass({
  handleClick() {
    const benchID = this.props.bench.id;
    hashHistory.push("benches/" + benchID );
  },
  render() {
    const bench = this.props.bench;

    return (
        <div className="bench-index-item"
             onClick={this.handleClick}
             key={this.props.key}>
          {bench.description}
          <br/>
          Rating: {bench.average_rating || "No reviews yet"}
          <br/>
          Number of Likes: {bench.favorite_users.length}
          <br/>
          <img src={bench.picture_url}/>
        </div>
    );
  }
});

module.exports = IndexItem;
