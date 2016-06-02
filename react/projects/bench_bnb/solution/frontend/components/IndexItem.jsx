import React from 'react';
import ReactRouter from 'react-router';
import {hashHistory} from 'react-router';

var IndexItem = React.createClass({
  handleClick: function() {
    var benchID = this.props.bench.id;
    hashHistory.push("benches/" + benchID );
  },
  render: function(){
    var bench = this.props.bench;

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
