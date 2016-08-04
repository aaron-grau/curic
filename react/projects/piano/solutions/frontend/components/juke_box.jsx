import React from 'react';

const JukeBox = ({ tracks, recording , onDelete, onPlay }) => (
  <div>
    JukeBox
    <ul>
      {Object.keys(tracks).map(id => {
        return (
          <li key={id}>
            {tracks[id].name}
            <button
              disabled={recording}
              onClick={onPlay(tracks[id])}
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
