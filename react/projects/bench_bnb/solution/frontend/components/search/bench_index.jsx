import React from 'react';
import BenchIndexItem from './bench_index_item';

const BenchIndex = function(props) {
  const benches = props.benches;
  const benchKeys = Object.keys(benches);
  return (
    <div>
      <h1>Benches: </h1>
      {
        benchKeys.map( key => (
          <BenchIndexItem bench={benches[key]} key={key} />
        ))
      }
    </div>
  );
};

export default BenchIndex;
