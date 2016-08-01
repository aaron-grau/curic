// const React = require('react');
// const Note = require('../util/note');
// const TONES = require('../constants/tones');
//
// // how to get store
//
// const NoteKey = ({ keys, keyPressed, keyReleased }) => (
//
// );
//

// written as a function component
const NoteKey = (props) => {
 const noteName = props.noteName;
 const note = new Note(TONES[key]);

 let className = `note-key key-${props.idx}`;
 if(this.state.pressed){
   className += " pressed";
 }

 return (
   <div className={className}>
   {noteName}
   </div>
 );
}


//
// // import React from 'react';
// // //Components
// // import FilterForm from './filter_form';
// // import BenchIndex from './bench_index';
// // import BenchMap from './../bench_map/bench_map';
// //
// //
// // const Search = ({benches, minSeating, maxSeating, updateFilter}) => (
// //   <div className="user-pane">
// //     <div className="left-half">
// //       <h5>Click Map to Add Bench!</h5>
// //       <BenchMap
// //         benches={benches}
// //         updateFilter={updateFilter}
// //         singleBench={false}/>
// //     </div>
// //     <div className="right-half">
// //       <FilterForm
// //         minSeating={minSeating}
// //         maxSeating={maxSeating}
// //         updateFilter={updateFilter}/>
// //       <BenchIndex benches={benches}/>
// //     </div>
// //   </div>
// // );
// //
// //
// // export default Search;
