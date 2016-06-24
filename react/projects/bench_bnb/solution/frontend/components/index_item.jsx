"use strict";

const React = require('react');
const hashHistory = require('react-router').hashHistory;

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
          <div className="index-item-info">
            <span className="index-item-category">Rating: </span>
            <span className="index-item-copy">
              {bench.average_rating || "No reviews yet"}
            </span>
            <span className="index-item-category">Number of Likes: </span>
            <span className="index-item-copy">
              {bench.favorite_users.length}
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
});

module.exports = IndexItem;
