import React from 'react';

const Recorder = ({ isRecording, playing, startRecording, stopRecording}) => (
    <div className='recorder'>
      <div className='recorder-title'>
        Recorder
      </div>
      <button
        className ='start-button'
        onClick={startRecording}
        disabled={isRecording || playing}>
        Start
      </button>
      <button
        className='stop-button'
        onClick={stopRecording}
        disabled={!isRecording || playing}>
        Stop
      </button>
  </div>
);


export default Recorder;
