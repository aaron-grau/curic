import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import Search from './search';

// Actions
import { updateFilter } from '../../actions/filter_actions';
// Selectors
import { asArray } from '../../reducers/selectors';

const mapStateToProps = state => ({
  benches: asArray(state),
  minSeating: state.filters.minSeating,
  maxSeating: state.filters.maxSeating
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
  push: (location) => dispatch(push(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
