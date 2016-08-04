import React from 'react';

const JukeBox = ({ tracks, recording, playing, onDelete, onPlay }) => (
  <div>
    JukeBox
    <ul>
      {Object.keys(tracks).map(id => {
        return (
          <li key={id}>
            {tracks[id].name}
            <button
              disabled={recording || playing}
              onClick={onPlay(tracks[id])}
            >
              Play
            </button>
            <button
              disabled={recording || playing}
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
