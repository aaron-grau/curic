export const TracksConstants = {
  START_RECORDING: "START_RECORDING",
  STOP_RECORDING: "STOP_RECORDING",
  ADD_NOTES: "ADD_NOTES"
};

export const startRecording = () => ({
  type: TracksConstants.START_RECORDING,
  timeStart: Date.now()
});

export const stopRecording = () => ({
  type: TracksConstants.STOP_RECORDING,
  timeNow: Date.now()
});

export const addNotes = (notes) => ({
  type: TracksConstants.ADD_NOTES,
  timeNow: Date.now(),
  notes
});
