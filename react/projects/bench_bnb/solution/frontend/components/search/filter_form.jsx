const React = require('react');

function handleChange(filter, updateFilter){
  return function(e){
    const value = e.currentTarget.value;
    return updateFilter(filter, value);
  }
}

const FilterForm = ({minSeating, maxSeating, updateFilter}) => (
  <div>
    <span className="filter">Filter results:</span>
    <br/>
    <label>Minimum Seats </label>
    <input type="number"
           value={minSeating}
           onChange={handleChange('minSeating', updateFilter)}
    />
     <br/>
    <label>Maximum Seats </label>
    <input type="number"
           value={maxSeating}
           onChange={handleChange('maxSeating', updateFilter)}
    />
  </div>
);

export default FilterForm;
