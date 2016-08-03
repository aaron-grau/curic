import React from 'react';

const JukeBox = ({ tracks, recording , onDelete }) => (
  <div>
    JukeBox
    <ul>
      {Object.keys(tracks).map(id => {
        return (
          <li key={id}>
            {id}
            <button
              disabled={recording}
            >
              Play
            </button>
            <button
              disabled={recording}
              onClick={onDelete(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);

export default JukeBox;


// <ul>
//   {
//     props.tracks.map((t) => {
//       return <li>{t.id}</li>
//     })
//   }
// </ul>
