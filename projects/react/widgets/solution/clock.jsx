var React = require('react');

var Clock = React.createClass({
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
  var parts = [];
  for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
          parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
      }
  }
  return parts.join("&");
};

var Weather = React.createClass({
  getInitialState: function () {
    return {weather: null};
  },

  componentDidMount: function () {
    navigator.geolocation.getCurrentPosition(this.pollWeather);
  },

  pollWeather: function (location) {
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var url = "http://api.openweathermap.org/data/2.5/weather?";
    var params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
    url += toQueryString(params)
    url += "&APPID=YOUR_API_KEY_HERE"

    var xmlhttp = new XMLHttpRequest();
    var that = this;
    xmlhttp.onreadystatechange = function () {
      //ready state of means this is complete
      if (xmlhttp.status == 200 && xmlhttp.readyState == XMLHttpRequest.DONE) {
        var data = JSON.parse(xmlhttp.responseText);
        that.setState({ weather: data });
      }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  },

  render: function () {
    var content = "";

    if (this.state.weather) {
      var weather = this.state.weather;
      var temp = (weather.main.temp - 273.15) * 1.8 + 32;
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
