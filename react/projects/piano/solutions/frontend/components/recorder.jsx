import React from 'react';

const Recorder = (props) => {
  const stopRecording = () => {
    props.stopRecording();
    console.log(props.tracks);
  }

  return (
      <div>
      <button
        onClick={props.startRecording}
        disabled={props.recording}>
      Start
      </button>
      <button
        onClick={stopRecording}
        disabled={!props.recording}>
      Stop
      </button>
    </div>
  );
};

export default Recorder;
