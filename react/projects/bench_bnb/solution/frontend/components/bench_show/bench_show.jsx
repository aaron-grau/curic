import React from 'react';
import { Link } from 'react-router';
// Components
import BenchDetail from './bench_detail';
import BenchMap from '../bench_map/bench_map';
import ReviewButton from './review_button';

const BenchShow = ({ bench, benchId, requestBench, children }) => {
  const benches = {
    [bench.id]: bench
  };
  
  return(
    <div className="single-bench-show">
      <div className="single-bench-map">
        <Link to="/" >Back to Benches Index</Link>
        <BenchMap
          benches={benches}
          benchId={benchId}
          singleBench={true}
          requestBench={requestBench}
          />
      </div>
      <div className="right-half bench-details">
        <BenchDetail bench={bench} />
        { children || <ReviewButton benchId={bench.id} /> }
      </div>
    </div>
  );
};

export default BenchShow;
