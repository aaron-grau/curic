const $ = require("jquery");
const KeyActions = require('../actions/key_actions');
const TrackActions = require('../actions/track_actions');

function Track(attrs) {
  const defaults = {
    name: "",
    roll: []
  };

  this.attributes = $.extend(defaults, attrs || {});
}

Track.prototype = {
  addNotes(notes) {
    const timeSlice = { time: this._timeDelta() };
    if (notes.length > 0) {
      //there are actually some keys held down
      timeSlice.notes = notes;
    }
    this.attributes.roll.push(timeSlice);
  },

  completeRecording() {
    //add an empty time slice to indicate the end
    this.addNotes([]);
  },

  get(attr) {
    return this.attributes[attr];
  },

  isBlank() {
    return this.attributes.roll.length === 0;
  },

  play() {
    if (this.interval) { return; } // don't play if already in progress

    let currentNote = 0;
    const playBackStartTime = Date.now();
    const roll = this.attributes.roll;
    let delta;

    this.interval = setInterval(() => {
      // if there are still notes to be played
      if (currentNote < roll.length) {
        delta = Date.now() - playBackStartTime;

        // if we are at a timeslice with a note, play it and move forward
        if (delta >= roll[currentNote].time) {
          // memoize because the notes might not be set; thanks Rails!
          const notes = roll[currentNote].notes || [];
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete this.interval;
      }
    }, 1);
  },

  set(attr, val) {
    this.attributes[attr] = val;
  },

  save() {
    if (this.isBlank()) {
      throw "track can't be blank!";
    } else if (this.attributes.name === "") {
      throw "name can't be blank!";
    } else {
      TrackActions.createTrack(this.attributes);
    }
  },

  startRecording() {
    this.attributes.roll = [];
    this.start = Date.now();
  },

  _timeDelta() {
    return Date.now() - this.start;
  }
};

module.exports = Track;
