"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const FilterActions = require('../actions/filter_actions');
const hashHistory = require('react-router').hashHistory;

const _getCoordsObj = function(latLng) {
  return ({
    lat: latLng.lat(),
    lng: latLng.lng()
  });
}

const mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, //San Francisco
  zoom: 13
};

const MapContainer = React.createClass({
  componentDidMount() {
    const map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, mapOptions);
    this.markers = [];
    this.registerListeners();
    this._onChange();
  },

  markersToRemove(){
    return this.markers.filter( marker => {
      return !this.props.benches.hasOwnProperty(marker.benchId);
    });
  },

  benchesToAdd(){
    const currentBenchIds = this.markers.map( marker => marker.benchId );
    const newBenches = this.props.benches;
    const newBenchIds = Object.keys(newBenches);

    return newBenchIds.reduce( (collection, benchId) => {
      if (!currentBenchIds.includes(benchId)) {
        return ( collection.concat( [newBenches[benchId]] ));
      }
    }, [] );
  },

  componentDidUpdate() {
    this._onChange();
  },

  _onChange() {
    this.benchesToAdd().forEach(this.createMarkerFromBench);
    this.markersToRemove().forEach(this.removeMarker);
  },

  _handleClick(coords) {
    hashHistory.push({
      pathname: "benches/new",
      query: coords
    });
  },

  registerListeners() {
    const that = this;
    google.maps.event.addListener(this.map, 'idle', () => {
      const mapBounds = that.map.getBounds();
      const northEast = _getCoordsObj(mapBounds.getNorthEast());
      const southWest = _getCoordsObj(mapBounds.getSouthWest());
      //actually issue the request
      const bounds = { northEast, southWest };
      FilterActions.updateBounds(bounds);
    });
    google.maps.event.addListener(this.map, 'click', event => {
      const coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      that._handleClick(coords);
    });
  },

  createMarkerFromBench(bench) {
    const pos = new google.maps.LatLng(bench.lat, bench.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      benchId: bench.id
    });
    marker.addListener('click', () => {
      hashHistory.push("benches/" + bench.id );
    });
    this.markers.push(marker);
  },

  removeMarker(marker) {
    const idx = this.markers.indexOf( marker );
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  },

  render() {
    return ( <div className="map" ref="map">Map</div>);
  }
});

module.exports = MapContainer;
