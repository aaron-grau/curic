export default class MarkerManager {
  constructor(map, handleClick){
    this.map = map;
    this.handleClick = handleClick;
    this.markers = [];
    //permanently bind instance methods
    this._createMarkerFromBench = this._createMarkerFromBench.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
  }

  updateMarkers(benches){
    this.benches = benches;
    this._benchesToAdd().forEach(this._createMarkerFromBench);
    this._markersToRemove().forEach(this._removeMarker);
  }

  _benchesToAdd(){
    const currentBenchIds = this.markers.map( marker => marker.benchId );
    const newBenches = this.benches;
    const newBenchIds = Object.keys(newBenches);

    return newBenchIds.reduce( (collection, benchId) => {
      if (!currentBenchIds.includes(benchId)) {
        return ( collection.concat( [newBenches[benchId]] ));
      }
    }, [] );
  }

  _markersToRemove(){
    return this.markers.filter( marker => {
      return !this.benches.hasOwnProperty(marker.benchId);
    });
  }

  _createMarkerFromBench(bench) {
    const pos = new google.maps.LatLng(bench.lat, bench.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      benchId: bench.id
    });
    marker.addListener('click', () => this.handleClick(bench));
    this.markers.push(marker);
  }

  _removeMarker(marker) {
    const idx = this.markers.indexOf( marker );
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  }
}
