import { BenchConstants } from '../actions/bench_actions';

const BenchesReducer = function(oldState = {}, action){
  switch(action.type){
    case BenchConstants.RECEIVE_BENCHES:
      return action.benches;
    case BenchConstants.RECEIVE_BENCH:
      const newBench = {[action.bench.id]: action.bench};
      return Object.assign({}, oldState, newBench);
    default:
      return oldState;
  }
};

export default BenchesReducer;

// State Shape
  // {
  //   "1": {
  //     id: 1,
  //     description: "alamo square, many dogs",
  //     lat: 37.775769,
  //     lng: -122.43496,
  //     seating: 4,
  //     picture_url:
  //      "https://c2.staticflickr.com/4/3035/2309664044_486f5a0327_z.jpg?zz=1"
  //   },
  //   "2": {
  //     id: 2,
  //     description: "UN plaza, food truck access",
  //     lat: 37.77976,
  //     lng: -122.41382,
  //     seating: 2,
  //     picture_url:
  //      "http://www.concretedecor.net/CD/assets/Image/archives/CD1405/1405i_Page_32_Image_0001_600.jpg"
  //   }
  // };
