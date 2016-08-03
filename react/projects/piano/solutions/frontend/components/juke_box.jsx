import React from 'react';

const JukeBox = (props) => {
  // console.log(props.tracks);
  return (
    <div>
      JukeBox
      <ul>
        {Object.keys(props.tracks).map(id => {
          return <li>{id}</li>
        })}
      </ul>
    </div>
  )
};

export default JukeBox;


// <ul>
//   {
//     props.tracks.map((t) => {
//       return <li>{t.id}</li>
//     })
//   }
// </ul>
