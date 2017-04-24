import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

import BenchDetail from './bench_detail';
import BenchMap from '../bench_map/bench_map';
import ReviewFormContainer from './review_form_container';
import ReviewButton from './review_button';
import { ProtectedRoute, ReviewLink } from '../../util/route_util';

const BenchShow = ({ bench, benchId, fetchBench, match, loggedIn }) => {
  const benches = {
    [benchId]: bench
  };

  return(
    <div className="single-bench-show">
      <div className="single-bench-map">
        <Link to="/">Back to Benches Index</Link>
        <BenchMap
          benches={benches}
          benchId={benchId}
          singleBench={true}
          fetchBench={fetchBench}
          />
      </div>
      <div className="right-half bench-details">
        <BenchDetail bench={bench} />
        <ReviewLink to={`/benches/${benchId}/review`} label="Leave a Review" />
        <ProtectedRoute path="/benches/:benchId/review" component={ReviewFormContainer}
          loggedIn={loggedIn} />
      </div>
    </div>
  );
};

export default BenchShow;
