import { connect } from 'react-redux';
import Search from './search';
// Actions
import { updateFilter } from '../../actions/filter_actions';
// Selectors
import { asArray } from '../../reducers/selectors';

const mapStateToProps = state => ({
  benches: asArray(state.benches),
  minSeating: state.filters.minSeating,
  maxSeating: state.filters.maxSeating
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
