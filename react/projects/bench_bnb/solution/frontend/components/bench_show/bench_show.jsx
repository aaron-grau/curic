import React from 'react';
import { Route, Link } from 'react-router-dom';

import BenchDetail from './bench_detail';
import BenchMap from '../bench_map/bench_map';
import ReviewFormContainer from './review_form_container';
import ReviewButton from './review_button';

const BenchShow = ({ bench, benchId, fetchBench, match }) => {
  const benches = {
    [benchId]: bench
  };  
  
  
  const ReviewLink = ({ label, to}) => (
    <Route path={to} children={({ match }) => (
      <div>
        {match ? '' : <Link to={to}>{label}</Link>}
      </div>
    )}/>
  )

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
        <Route path="/benches/:benchId/review" component={ReviewFormContainer} />
        
      </div>
      
    </div>
  );
};

export default BenchShow;
