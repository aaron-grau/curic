import React from 'react';

const Track = ({ track, disabled, onPlay, onDelete }) => (
  <div className='track' key={track.id}>
    {track.name}
    <div className='track-buttons'>
      <button
        className='play-button'
        disabled={disabled}
        onClick={onPlay}>
        Play
      </button>
      <button
        className='delete-button'
        disabled={disabled}
        onClick={onDelete}>
        Delete
      </button>
    </div>
  </div>
);

export default Track;
