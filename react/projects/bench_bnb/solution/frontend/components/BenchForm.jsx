const React = require('react');
const LinkedStateMixin = require('react-addons-linked-state-mixin');
const BenchActions = require('../actions/bench_actions');
const hashHistory = require('react-router');

const BenchForm = React.createClass({
  mixins: [LinkedStateMixin],
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
  render() {
    const lat = this._coords().lat, lng = this._coords().lng;
    return (
        <div>
          <h3>Create A Bench!</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Description</label>
            <input type="text" valueLink={this.linkState('description')}/>
            <br/>
            <label>Number of Seats</label>
            <input min='0' type="number" valueLink={this.linkState('seating')}/>
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
