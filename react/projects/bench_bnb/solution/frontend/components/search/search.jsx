import React from 'react';
//Components
import FilterForm from './filter_form';
import BenchIndex from './bench_index';
import BenchMap from './../bench_map/bench_map';

const Search = ({benches, minSeating, maxSeating, updateFilter, push}) => (
  <div className="user-pane">
    <div className="left-half">
      <h5>Click Map to Add Bench!</h5>
      <BenchMap
        benches={benches}
        updateFilter={updateFilter}
        singleBench={false}
        push={push}/>
    </div>
    <div className="right-half">
      <FilterForm
        minSeating={minSeating}
        maxSeating={maxSeating}
        updateFilter={updateFilter}/>
      <BenchIndex benches={benches} push={push}/>
    </div>
  </div>
);

export default Search;
