"use strict";

const React = require('react');

const Clock = React.createClass({
  getInitialState: function () {
    return { time: new Date() };
  },

  componentDidMount: function () {
    this.intervalId = setInterval(this.tick, 1000);
  },

  tick: function () {
    this.setState({
      time: new Date(),
    });
  },

  render: function () {
    return (
      <div className='clock'>
        <p>Time: { this.state.time.toTimeString() }</p>
        <p>Date: { this.state.time.toDateString() }</p>
      </div>
    );
  }
});

function toQueryString(obj) {
  let parts = [];
  for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
          parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
      }
  }
  return parts.join("&");
};

const Weather = React.createClass({
  getInitialState: function () {
    return {weather: null};
  },

  componentDidMount: function () {
    navigator.geolocation.getCurrentPosition(this.pollWeather);
  },

  pollWeather: function (location) {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    let url = "http://api.openweathermap.org/data/2.5/weather?";
    let params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
    url += toQueryString(params)
    const apiKey = "f816d7f39052e3a98b21952097a43076";
    // This is our API key; please use your own!
    url += `&APPID=${apiKey}`

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      //ready state of DONE means this is complete
      if (xmlhttp.status == 200 && xmlhttp.readyState == XMLHttpRequest.DONE) {
        const data = JSON.parse(xmlhttp.responseText);
        this.setState({ weather: data });
      }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  },

  render: function () {
    let content = "";

    if (this.state.weather) {
      let weather = this.state.weather;
      let temp = (weather.main.temp - 273.15) * 1.8 + 32;
      content += weather.name + "\n";
      content += temp.toFixed(1)  + " degrees";
    } else {
      content = "loading weather...";
    }
    return (
      <div className="weather">
        {content}
      </div>
    );
  }
});

module.exports = {
  Clock: Clock,
  Weather: Weather
};
