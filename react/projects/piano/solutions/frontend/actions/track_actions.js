export const TrackConstants = {
  START_RECORDING: "START_RECORDING",
  STOP_RECORDING: "STOP_RECORDING",
  ADD_NOTES: "ADD_NOTES"
};

export const startRecording = timeStart => ({
  type: TrackConstants.START_RECORDING,
  timeStart
});

export const stopRecording = (timeNow) => ({
  type: TrackConstants.STOP_RECORDING,
  timeNow
});

export const addNotes = (timeNow, notes) => ({
  type: TrackConstants.ADD_NOTES,
  timeNow,
  notes
});
