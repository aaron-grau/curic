import { connect } from 'react-redux';
import FruitStandList from './fruit_stand_list';
import { addFruits } from '../actions/fruits_actions';

const mapStateToProps = ({ fruits }) => ({
  fruits
});

const mapDispatchToProps = dispatch => ({
  addFruits: fruits => dispatch(addFruits(fruits))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FruitStandList);
