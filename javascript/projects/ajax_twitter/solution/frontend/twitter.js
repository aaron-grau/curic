var FollowToggle = require('./follow_toggle');
var InfiniteTweets = require('./infinite_tweets');
var TweetCompose = require('./tweet_compose');
var UsersSearch = require('./users_search');

$(function () {
  $("div.infinite-tweets").each(function(i, tweet) {
    new InfiniteTweets(tweet);
  });

  $("form.tweet-compose").each(function(i, tweetForm) {
    new TweetCompose(tweetForm);
  });

  $("nav.users-search").each(function(i, usersSearch) {
    new UsersSearch(usersSearch);
  });

  $("button.follow-toggle").each(function(i, button) {
    new FollowToggle(button, {});
  });
});
