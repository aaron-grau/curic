"use strict";

const React = require('react');
const BenchActions = require('../actions/bench_actions');
const hashHistory = require('react-router').hashHistory;

const BenchForm = React.createClass({
  getInitialState() {
    return {
      description: "",
      picture_url: "",
      seating: 2
    };
  },
  handleSubmit(event) {
    event.preventDefault();
    const bench = Object.assign({}, this.state, this._coords());
    BenchActions.createBench(bench);
    this.navigateToSearch();
  },
  navigateToSearch() {
    hashHistory.push("/");
  },
  handleCancel(event) {
    event.preventDefault();
    this.navigateToSearch();
  },
  _coords() {
    return this.props.location.query;
  },
  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  render() {
    const lat = this._coords().lat, lng = this._coords().lng;
    return (
        <div className="new-bench-container">
          <div className="new-bench-form">
            <h3 className="new-bench-title">Create A Bench!</h3>
            <form onSubmit={this.handleSubmit}>
              <label className="bench-field">Description</label>
              <input type="text" value={this.state.description}
                onChange={this.update("description")} className="bench-field"/>

              <label className="bench-field">Image URL</label>
              <input type="text" value={this.state.imageURL}
                onChange={this.update("picture_url")} className="bench-field"/>

              <label className="bench-field">Number of Seats</label>
              <input min='0' type="number" value={this.state.seating}
                onChange={this.update("seating")} className="bench-field"/>

              <label className="bench-field">Latitude</label>
              <input type="text" disabled value={lat} className="bench-field"/>

              <label className="bench-field">Longitude</label>
              <input type="text" disabled value={lng} className="bench-field"/>

              <div className="button-holder">
                <input type="submit" value="Create Bench" className="new-bench-button"/>
              </div>
            </form>
            <div className="button-holder">
              <button className="new-bench-button" onClick={this.handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = BenchForm;
