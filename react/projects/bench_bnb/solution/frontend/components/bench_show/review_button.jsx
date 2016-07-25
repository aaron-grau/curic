import React from 'react';
import { hashHistory } from 'react-router';

function showReviewForm(id) {
  hashHistory.push(`/benches/${id}/review`);
}

export default ({benchId}) => {
  return (
  <button className="review-button"
          onClick={showReviewForm.bind(null, benchId)}
  >
    Leave a Review
  </button>
)}
