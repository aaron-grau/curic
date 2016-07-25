'use strict';

const React = require('react');

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
    let url = 'https://crossorigin.me/https://api.forecast.io/forecast/';
    let params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
    // This is our API key; please use your own!
    const apiKey = '33ae65481642d588cf0890b4ae858cc0';
    url += apiKey;

    url += `/${params.lat},${params.lon}`;

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
    let content = <div></div>;

    if (this.state.weather) {
      let weather = this.state.weather;
      let temp = weather.currently.temperature;
      content = <div>
                  <p>San Francisco</p>
                  <p>{temp.toFixed(1)} degrees</p>
                </div>;
    } else {
      content = <div className='loading'>loading weather...</div>;
    }
    return (
      <div>
        <h1>Weather</h1>
        <div className='weather'>
          {content}
        </div>
      </div>
    );
  }
});

module.exports = Weather;
