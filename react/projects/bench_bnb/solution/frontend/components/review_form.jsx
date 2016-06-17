"use strict";

const React = require('react');
const hashHistory = require('react-router').hashHistory;
const BenchActions = require('../actions/bench_actions');

const ReviewForm = React.createClass({
  getInitialState() {
    return { rating: 5, body: "" };
  },

  navigateToBenchShow() {
    const benchUrl = "/benches/" + this.props.params.benchId;
    hashHistory.push(benchUrl);
  },

  handleCancel(event) {
    event.preventDefault();
    this.navigateToBenchShow();
  },

  handleSubmit(event) {
    event.preventDefault();
    const review = Object.assign(
      {},
      this.state,
      { bench_id: this.props.params.benchId }
    );
    BenchActions.createReview(review);
    this.navigateToBenchShow();
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

  render() {
    return (
      <div className="review-form">
        <form onSubmit={this.handleSubmit}>
          <label>Rating</label>
          <br/>
          <input type="number" 
            value={this.state.rating}
            onChange={this.update("rating")}/>
          <br/>

          <label>Comment</label>
          <br/>
          <textarea
            cols='30'
            rows='10'
            value={this.state.body}
            onChange={this.update("body")}></textarea>
          <br/>
          <input type="submit"/>
        </form>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
    );
 }
});

module.exports = ReviewForm;
