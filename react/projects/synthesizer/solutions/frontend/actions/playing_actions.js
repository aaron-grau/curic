export const PlayingConstants = {
  START_PLAYING: "START_PLAYING",
  STOP_PLAYING: "STOP_PLAYING"
};

export const startPlaying = () => ({
  type: PlayingConstants.START_PLAYING
});

export const stopPlaying = () => ({
  type: PlayingConstants.STOP_PLAYING
})
