var $ = require("jquery"),
    KeyActions = require('../actions/KeyActions'),
    TrackActions = require('../actions/TrackActions');

function Track(attrs) {
  var defaults = {
    name: "",
    roll: []
  };

  this.attributes = $.extend(defaults, attrs || {});
}

Track.prototype = {
  addNotes: function (notes) {
    var timeSlice = { time: this._timeDelta() };
    if (notes.length > 0) {
      //there are actually some keys held down
      timeSlice.notes = notes;
    }
    this.attributes.roll.push(timeSlice);
  },

  completeRecording: function () {
    //add an empty time slice to indicate the end
    this.addNotes([]);
  },

  get: function (attr) {
    return this.attributes[attr];
  },

  isBlank: function () {
    return this.attributes.roll.length === 0;
  },

  play: function () {
    if (this.interval) { return; } // don't play if already in progress

    var currentNote = 0,
        playBackStartTime = Date.now(),
        roll = this.attributes.roll,
        delta;

    this.interval = setInterval(function () {
      // if there are still notes to be played
      if (currentNote < roll.length) {
        delta = Date.now() - playBackStartTime;

        // if we are at a timeslice with a note, play it and move forward
        if (delta >= roll[currentNote].time) {
          // memoize because the notes might not be set; thanks Rails!
          var notes = roll[currentNote].notes || [];
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete this.interval;
      }
    }.bind(this), 1);
  },

  set: function (attr, val) {
    this.attributes[attr] = val;
  },

  save: function () {
    if (this.isBlank()) {
      throw "track can't be blank!";
    } else if (this.attributes.name === "") {
      throw "name can't be blank!";
    } else {
      TrackActions.createTrack(this.attributes);
    }
  },

  startRecording: function () {
    this.attributes.roll = [];
    this.start = Date.now();
  },

  _timeDelta: function () {
    return Date.now() - this.start;
  }
};

module.exports = Track;
