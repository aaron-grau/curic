const $ = require("jquery");
const Track = require("./Track");
const AppDispatcher = require('../dispatcher/Dispatcher');
const TrackActions = require("../actions/TrackActions");
const OrganConstants = require("../constants/OrganConstants");

const TrackApiUtil = {
  createTrack(track) {
    $.ajax({
      url: '/api/tracks',
      method: 'POST',
      data: JSON.stringify({ track }),
      dataType: 'json',
      contentType: "application/json",

      // See http://stackoverflow.com/questions/7203304/warning-cant-verify-csrf-token-authenticity-rails
      beforeSend(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},

      success(track) {
        TrackActions.addTrack(new Track(track));
      }
    });
  },

  fetchTracks() {
    $.getJSON('/api/tracks', trackObjects => {
      const tracks = trackObjects.map(trackData => new Track(trackData));

      TrackActions.resetTracks(tracks);
    });
  }
};

AppDispatcher.register(payload => {
  switch(payload.actionType){
  case OrganConstants.CREATE_TRACK:
    TrackApiUtil.createTrack(payload.track);
    break;
  default:
  }
})

module.exports = TrackApiUtil;
