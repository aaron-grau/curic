var React = require('react');
var ReactRouter = require('react-router');
var Review = require('./Review');
var UserStore = require('../stores/user_store');
var FavoriteActions = require('../actions/favorite_actions');

var Bench = React.createClass({
  getInitialState: function() {
    return { currentUser: UserStore.currentUser() };
  },

  componentDidMount: function() {
    this.userListener = UserStore.addListener(this._userChanged);
  },

  _userChanged: function() {
    this.setState({current_user: UserStore.currentUser() });
  },

  componentWillUnmount: function () {
    this.userListener.remove();
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

      if(currentUserFavs.indexOf(this.props.bench.id) !== -1) {
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
