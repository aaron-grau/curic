import React from 'react';
import IndexItem from './index_item';

const BenchIndex = function(props) {
  const benches = props.benches;
  const benchKeys = Object.keys(benches);
  return (
    <div>
      <h1>Benches: </h1>
      {
        benchKeys.map( key => (
          <IndexItem bench={benches[key]} key={key} />
        ))
      }
    </div>
  );
};

export default BenchIndex;
