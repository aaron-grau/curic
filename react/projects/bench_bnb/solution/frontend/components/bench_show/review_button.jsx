import React from 'react';
import { withRouter } from 'react-router';

const _handleClick = (router, url) => (
  () => router.push(url)
);

const ReviewButton = ({benchId, router}) => {
  return (
  <button className="review-button"
          onClick={_handleClick(router, `/benches/${id}/review`)}
  >
    Leave a Review
  </button>
)}

export default withRouter(ReviewButton);
