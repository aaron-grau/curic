import React from 'react';

const JukeBox = (props) => {
  // console.log(props.tracks);
  return (
    <div>
      JukeBox
      <ul>
        {Object.keys(props.tracks).map(id => {
          return (
            <li key={id}>
              {id}
              <button
                disabled={props.recording}
              >
                Play
              </button>
              <button
                disabled={props.recording}
              >
                Delete
              </button>
            </li>
          );
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
