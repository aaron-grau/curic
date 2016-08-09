import React from 'react';
import Track from './track';

const JukeBox = ({ tracks, recording, playing, onDelete, onPlay }) => (
  <div className="juke-box">
    <div className='juke-box-title'>
      Jukebox
    </div>
    <div className='track-list'>
      {Object.keys(tracks).map(id => (
        <Track
          key={id}
          track={tracks[id]}
          disabled={recording || playing}
          onPlay={onPlay(tracks[id])}
          onDelete={onDelete(id)} />
      ))}
    </div>
  </div>
);

export default JukeBox;
