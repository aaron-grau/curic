import React from 'react';
import ReactDOM from 'react-dom';

// import FilterActions from '../actions/filter_actions';
import { withRouter } from 'react-router';

const _getCoordsObj = function(latLng) {
  return ({
    lat: latLng.lat(),
    lng: latLng.lng()
  });
};

let _mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, //San Francisco
  zoom: 13
};

class BenchMap extends React.Component{
  constructor(props){
    super(props);
    //Permanently bind instance methods
    this._createMarkerFromBench = this._createMarkerFromBench.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
  }

  componentDidMount() {
    const map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, _mapOptions);
    this.markers = [];
    if(this.props.singleBench){
      this.props.requestBench(this.props.benchId);
    } else {
      this._registerListeners();
      this._updateMarkers();
    }
  }

  componentDidUpdate(){
    this._updateMarkers();
  }

  _registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const mapBounds = this.map.getBounds();
      const northEast = _getCoordsObj(mapBounds.getNorthEast());
      const southWest = _getCoordsObj(mapBounds.getSouthWest());
      const bounds = { northEast, southWest };
      this.props.updateFilter('bounds', bounds);
    });
    google.maps.event.addListener(this.map, 'click', event => {
      const coords = _getCoordsObj(event.latLng);
      this._handleClick(coords);
    });
  }

  _updateMarkers(){
    this._benchesToAdd().forEach(this._createMarkerFromBench);
    this._markersToRemove().forEach(this._removeMarker);
  }

  _benchesToAdd(){
    const currentBenchIds = this.markers.map( marker => marker.benchId );
    const newBenches = this.props.benches;
    const newBenchIds = Object.keys(newBenches);

    return newBenchIds.reduce( (collection, benchId) => {
      if (!currentBenchIds.includes(benchId)) {
        return ( collection.concat( [newBenches[benchId]] ));
      }
    }, [] );
  }

  _markersToRemove(){
    return this.markers.filter( marker => {
      return !this.props.benches.hasOwnProperty(marker.benchId);
    });
  }

  _createMarkerFromBench(bench) {
    const pos = new google.maps.LatLng(bench.lat, bench.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      benchId: bench.id
    });
    marker.addListener('click', () => {
      this.props.router.push("benches/" + bench.id );
    });
    this.markers.push(marker);
  }

  _removeMarker(marker) {
    const idx = this.markers.indexOf( marker );
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  }

  _handleClick(coords) {
    this.props.router.push({
      pathname: "benches/new",
      query: coords
    });
  }

  render() {
    return <div className="map" ref="map">Map</div> ;
  }
}

export default withRouter(BenchMap);
