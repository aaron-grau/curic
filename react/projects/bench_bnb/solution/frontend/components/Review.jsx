import React from 'react';

var Review = React.createClass({
  render() {
    return (
      <div>
      <ul>
        <li>Rating: {this.props.rating}</li>
        <li>{this.props.body}</li>
      </ul>
      </div>
    );
  }
});

export default Review;
