var React = require('react');
var ReactDOM = require('react-dom');
var FilterActions = require('../actions/filter_actions');
var hashHistory = require('react-router').hashHistory;

function _getCoordsObj(latLng) {
  return {
    lat: latLng.lat(),
    lng: latLng.lng()
  };
}

var mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, //San Francisco
  zoom: 13
};

var Map = React.createClass({
  componentDidMount: function(){
    var map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, mapOptions);
    this.registerListeners();
    this.markers = [];
    this.eachBench(this.createMarkerFromBench);
  },
  eachBench: function(callback){
    var benches = this.props.benches;
    var keys = Object.keys(benches);
    keys.forEach(function(key){
      callback(benches[key]);
    });
  },

  componentDidUpdate: function () {
    this._onChange();
  },
  _onChange: function(){
    var benchesToAdd = [];
    var markersToRemove = [];
    //Collect markers to remove
    this.markers.forEach(function(marker){
      if (!this.props.benches.hasOwnProperty(marker.benchId)){
        markersToRemove.push(marker);
      }
    }.bind(this));
    //Collect benches to add
    var currentBenchIds = this.markers.map(function(marker){
      return marker.benchId;
    });
    this.eachBench(function(bench){
      if (!currentBenchIds.includes(bench.id)){
        benchesToAdd.push(bench);
      }
    });
    //Do the adding / removing
    benchesToAdd.forEach(this.createMarkerFromBench);
    markersToRemove.forEach(this.removeMarker);
  },
  _handleClick: function(coords){
    hashHistory.push({
      pathname: "benches/new",
      query: coords
    });
  },
  registerListeners: function(){
    var that = this;
    google.maps.event.addListener(this.map, 'idle', function() {
      var bounds = that.map.getBounds();
      var northEast = _getCoordsObj(bounds.getNorthEast());
      var southWest = _getCoordsObj(bounds.getSouthWest());
      //actually issue the request
      bounds = {
        northEast: northEast,
        southWest: southWest
      };
      FilterActions.updateBounds(bounds);
    });
    google.maps.event.addListener(this.map, 'click', function(event) {
      var coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      that._handleClick(coords);
    });
  },
  createMarkerFromBench: function (bench) {
    var pos = new google.maps.LatLng(bench.lat, bench.lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      benchId: bench.id
    });
    marker.addListener('click', function () {
      hashHistory.push("benches/" + bench.id );
    });
    this.markers.push(marker);
  },
  removeMarker: function(marker){
    for(var i = 0; i < this.markers.length; i++){
      if (this.markers[i].benchId === marker.benchId){
        this.markers[i].setMap(null);
        this.markers.splice(i, 1);
        break;
      }
    }
  },
  render: function(){
    return ( <div className="half" ref="map">Map</div>);
  }
});

module.exports = Map;
