import React from 'react';

const Recorder = (props) => (
    <div>
    <button
      onClick={props.startRecording}
      disabled={props.recording}>
    Start
    </button>
    <button
      onClick={props.stopRecording}
      disabled={!props.recording}>
    Stop
    </button>
  </div>
);


export default Recorder;
