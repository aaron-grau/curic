import React from 'react';
import ReactRouter from 'react-router';
import Review from './Review';
import SessionStore from '../stores/session_store';
import FavoriteActions from '../actions/favorite_actions';

var Bench = React.createClass({
  getInitialState: function() {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this._userChanged);
  },

  _userChanged: function() {
    this.setState({current_user: SessionStore.currentUser() });
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  toggleFavorite: function() {
    var data = {bench_id: this.props.bench.id};

    if(this._isLiked() === "Like") {
      FavoriteActions.createFavorite(data);
    } else {
      FavoriteActions.deleteFavorite(data);
    }
  },

  _isLiked: function() {
    var likeText = "Like";
    var currentUser = this.state.currentUser;

    if(currentUser) {
      var currentUserFavs = currentUser.favorite_benches;

      if (currentUserFavs.indexOf(this.props.bench.id) !== -1) {
        likeText = "Unlike";
      }
    }

    return likeText;
  },

  render: function () {
    var reviews = this.props.bench.reviews || [];
    var Link = ReactRouter.Link;
    return (
      <div>
        <ul>
          <img height="200px" src={this.props.bench.picture_url}/>
          <li>Rating: {this.props.bench.average_rating || "No reviews yet"}</li>
          <li>Description: {this.props.bench.description}</li>
          <li>Seats: {this.props.bench.seating}</li>
          <li>Latitude: {this.props.bench.lat}</li>
          <li>Longitude: {this.props.bench.lng}</li>
        </ul>
        <button onClick={this.toggleFavorite}>{this._isLiked()}</button>
        <br/>
        <div className="reviews">
          <h3>Reviews</h3>
          {reviews.map(function (review) {
           return <Review key={review.id} {...review} />;
         })}
        </div>
      </div>
    );
  }
});

module.exports = Bench;
