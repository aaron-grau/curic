'use strict';

const React = require('react');

function toQueryString(obj) {
  let parts = [];
  for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
          parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
  }
  return parts.join('&');
}

const Weather = React.createClass({
  getInitialState() {
    return {weather: null};
  },

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.pollWeather);
  },

  pollWeather(location) {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
    let params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
    url += toQueryString(params);
    const apiKey = 'f816d7f39052e3a98b21952097a43076';
    // This is our API key; please use your own!
    url += `&APPID=${apiKey}`;

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      //ready state of DONE means this is complete
      if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(xmlhttp.responseText);
        this.setState({weather: data});
      }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  },

  render() {
    let content = '';

    if (this.state.weather) {
      let weather = this.state.weather;
      let temp = (weather.main.temp - 273.15) * 1.8 + 32;
      content += weather.name + '\n';
      content += temp.toFixed(1)  + ' degrees';
    } else {
      content = 'loading weather...';
    }
    return (
      <div className='weather'>
        {content}
      </div>
    );
  }
});

module.exports = Weather;
