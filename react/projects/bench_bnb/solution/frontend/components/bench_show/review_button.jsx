import React from 'react';
import { hashHistory } from 'react-router';

class ReviewButton extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const benchId = this.props.benchId;
    const url = `/benches/${benchId}/review`;
    hashHistory.push(url);
  }

  render() {
    return (
      <button
        className="review-button"
        onClick={this.handleClick}>
        Leave a Review
      </button>
    );
  }
};

export default ReviewButton;
