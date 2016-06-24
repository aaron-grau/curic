"use strict";

const React = require('react');
const Link = require('react-router').Link;
const Review = require('./review');
const SessionStore = require('../stores/session_store');
const FavoriteActions = require('../actions/favorite_actions');

var Bench = React.createClass({
  getInitialState() {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this._userChanged);
  },

  _userChanged() {
    this.setState({current_user: SessionStore.currentUser() });
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  toggleFavorite() {
    const data = {bench_id: this.props.bench.id};

    if(this._isLiked() === "Like") {
      FavoriteActions.createFavorite(data);
    } else {
      FavoriteActions.deleteFavorite(data);
    }
  },

  _isLiked() {
    let likeText = "Like";
    const currentUser = this.state.currentUser;

    if(SessionStore.isUserLoggedIn()) {
      const currentUserFavs = currentUser.favorite_benches;

      if (currentUserFavs.indexOf(this.props.bench.id) !== -1) {
        likeText = "Unlike";
      }
    }

    return likeText;
  },

  render() {
    const reviews = this.props.bench.reviews || [];

    let reviewText = "no reviews yet";
    if(reviews.length > 0) {
      reviewText = reviews.map( (review) => {
        return <Review key={review.id} {...review} />;
      });
    }

    return (
      <div>
        <ul className="bench-list">
          <img className="index-image" src={this.props.bench.picture_url}/>
          <li>Rating: {this.props.bench.average_rating || "No reviews yet"}</li>
          <li>Description: {this.props.bench.description}</li>
          <li>Seats: {this.props.bench.seating}</li>
          <li>Latitude: {this.props.bench.lat}</li>
          <li>Longitude: {this.props.bench.lng}</li>
        </ul>
        <button onClick={this.toggleFavorite} className="like-button">
          {this._isLiked()}
        </button>
        <br/>
        <div className="reviews">
          <h3>Reviews</h3>
          { reviewText }
        </div>
      </div>
    );
  }
});

module.exports = Bench;
