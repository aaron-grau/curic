import React from 'react';

const Recorder = ({ recording, startRecording, stopRecording}) => (
    <div>
    <button
      onClick={startRecording}
      disabled={recording}>
    Start
    </button>
    <button
      onClick={stopRecording}
      disabled={!recording}>
    Stop
    </button>
  </div>
);


export default Recorder;
