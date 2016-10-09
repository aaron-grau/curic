import React from 'react';
import BenchIndexItem from './bench_index_item';

const BenchIndex = ({benches, push}) => {
  return (
    <div>
      <h1>Benches: </h1>
      {
        benches.map( bench => (
          <BenchIndexItem bench={bench} key={bench.id} push={push} />
        ))
      }
    </div>
  );
};

export default BenchIndex;
