var _ = require('underscore');

var InfiniteTweets = function (el) {
  this.$el = $(el);
  this.lastCreatedAt = null;

  this.$el.on("click", ".fetch-more", this.fetchTweets.bind(this));
  this.$el.on("insert-tweet", this.insertTweet.bind(this));
};

InfiniteTweets.prototype.fetchTweets = function (event) {
  event.preventDefault();

  var infiniteTweets = this;

  var options = {
    url: "/feed",
    dataType: "json",
    success: function (data) {
      infiniteTweets.insertTweets(data);

      if (data.length < 20) {
        infiniteTweets.$el.find(".fetch-more")
                          .replaceWith("<b>No more tweets!</b>");
      }

      if (data.length > 0) {
        infiniteTweets.lastCreatedAt = data[data.length - 1].created_at;
      }
    }
  };

  if (this.lastCreatedAt) {
    options.data = {
      max_created_at: this.lastCreatedAt
    };
  }

  $.ajax(options);
};

InfiniteTweets.prototype.insertTweet = function (event, data) {
  var tmpl = _.template(this.$el.find("script").html());
  this.$el.find("ul.tweets").prepend(tmpl({
    tweets: [data]
  }));

  if (!this.lastCreatedAt) {
    this.lastCreatedAt = data.created_at;
  }
};

InfiniteTweets.prototype.insertTweets = function (data) {
  var tmpl = _.template(this.$el.find("script").html());
  this.$el.find("ul.tweets").append(tmpl({
    tweets: data
  }));
};

module.exports = InfiniteTweets;
