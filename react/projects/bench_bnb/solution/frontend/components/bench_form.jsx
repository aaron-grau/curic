"use strict";

const React = require('react');
const BenchActions = require('../actions/bench_actions');
const hashHistory = require('react-router').hashHistory;

const BenchForm = React.createClass({
  getInitialState() {
    return {
      description: "",
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
        <div>
          <h3>Create A Bench!</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Description</label>
            <input type="text" value={this.state.description}
              onChange={this.update("description")}/>
            <br/>
            <label>Number of Seats</label>
            <input min='0' type="number" value={this.state.seating}
              onChange={this.update("seating")}/>
            <br/>
            <label>Latitude</label>
            <input type="text" disabled value={lat}/>
            <br/>
            <label>Longitude</label>
            <input type="text" disabled value={lng}/>
            <br/>
            <input type="submit" value="create bench"/>
          </form>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
    );
  }
});

module.exports = BenchForm;
