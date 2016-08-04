import React from 'react';

const Recorder = ({ recording, playing, startRecording, stopRecording}) => (
    <div>
    <button
      onClick={startRecording}
      disabled={recording || playing}>
    Start
    </button>
    <button
      onClick={stopRecording}
      disabled={!recording || playing}>
    Stop
    </button>
  </div>
);


export default Recorder;
