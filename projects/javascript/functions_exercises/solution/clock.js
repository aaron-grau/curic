#!/usr/bin/env node

function Clock () {
  // 1. Create a Date object.
  var currentTime = new Date();

  // 2. Store the hour, minute, and second.
  this.hours = currentTime.getHours();
  this.minutes = currentTime.getMinutes();
  this.seconds = currentTime.getSeconds();

  // 3. Call printTime.
  this.printTime();

  // 4. Schedule the tick at 1 second intervals.
  setInterval(this._tick.bind(this), 1000);
}

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  var timeString = [this.hours, this.minutes, this.seconds].join(":");

  // Use console.log to print it.
  console.log(timeString);
};

Clock.prototype._tick = function () {
  // 1. Increment the time by one second.
  this._incrementSeconds();

  // 2. Call printTime.
  this.printTime();
};

Clock.prototype._incrementSeconds = function () {
  // 1. Increment the time by one second.
  this.seconds += 1;
  if (this.seconds === 60) {
    this.seconds = 0;
    this._incrementMinutes();
  }
};

Clock.prototype._incrementMinutes = function () {
  this.minutes += 1;
  if (this.minutes === 60) {
    this.minutes = 0;
    this._incrmentHours();
  }
};

Clock.prototype._incrementHours = function () {
  this.hours = (this.hours + 1) % 24;
};

var clock = new Clock();
