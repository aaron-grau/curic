import React from 'react';

const JukeBox = ({ tracks, recording, playing, onDelete, onPlay }) => (
  <div className="juke-box">
    <div className='track-list'>
      {Object.keys(tracks).map(id => (
        <div key={id} className='track'>
          {tracks[id].name}
          <button
            className='play-button'
            disabled={recording || playing}
            onClick={onPlay(tracks[id])}>
            Play
          </button>
          <button
            className='delete-button'
            disabled={recording || playing}
            onClick={onDelete(id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default JukeBox;
