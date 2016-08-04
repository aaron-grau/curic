import React from 'react';

const Track = ({ track, disabled, onPlay, onDelete }) => (
  <div className='track' key={track.id}>
    {track.name}
    <button
      className='play-button'
      disabled={disabled}
      onClick={onPlay(track)}>
      Play
    </button>
    <button
      className='delete-button'
      disabled={disabled}
      onClick={onDelete(track.id)}>
      Delete
    </button>
  </div>
);

export default Track;
